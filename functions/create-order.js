const json = (code, data) => ({ statusCode: code, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
const slug = v => v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });
  const KEY_ID = process.env.RAZORPAY_KEY_ID, KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
  if (!KEY_ID || !KEY_SECRET) return json(503, { error: "Online payment is not switched on yet. Please send your order on WhatsApp." });
  let body;
  try { body = JSON.parse(event.body || "{}"); } catch { return json(400, { error: "Bad request" }); }
  const items = body.items || {}, pin = String(body.pin || "").trim();
  if (!/^\d{6}$/.test(pin)) return json(400, { error: "Enter a 6-digit PIN code." });
  const base = process.env.URL || `https://${event.headers.host}`;
  let prods, site;
  try {
    [prods, site] = await Promise.all([
      fetch(base + "/products.json").then(r => r.json()),
      fetch(base + "/site.json").then(r => r.json()),
    ]);
  } catch { return json(502, { error: "Could not load prices. Please try again." }); }
  let sub = 0; const lines = [];
  for (const [id, qty] of Object.entries(items)) {
    const q = Math.floor(Number(qty));
    if (!(q > 0 && q <= 50)) continue;
    const p = (prods.products || []).find(x => !x.hidden && slug(x.name) === id);
    if (!p) continue;
    if (!p.price) return json(400, { error: `${p.name} is priced on request. Please send this order on WhatsApp.` });
    sub += p.price * q; lines.push(`${p.name} x ${q}`);
  }
  if (!sub) return json(400, { error: "Your bag is empty." });
  const free = +(site.free_delivery_above ?? 899);
  const p2 = pin.slice(0, 2), p3 = pin.slice(0, 3);
  let fee = ["67", "68", "69", "78"].includes(p2) ? +(site.ship_kerala_assam ?? 50)
          : (p2 === "79" || p3 === "737") ? +(site.ship_north_east ?? 100)
          : +(site.ship_rest_india ?? 80);
  if (sub >= free) fee = 0;
  const total = sub + fee;
  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Basic " + Buffer.from(KEY_ID + ":" + KEY_SECRET).toString("base64") },
    body: JSON.stringify({ amount: total * 100, currency: "INR", receipt: "OBL-" + Date.now(), notes: { items: lines.join(", ").slice(0, 250), pin } }),
  });
  const order = await res.json().catch(() => ({}));
  if (!res.ok) return json(502, { error: "Could not start the payment. Please try again or send your order on WhatsApp." });
  return json(200, { order_id: order.id, amount: order.amount, currency: order.currency, key: KEY_ID, sub, fee, total });
};
