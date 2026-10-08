// Confirms a payment really came from Razorpay by checking its signature.
const crypto = require("crypto");
const json = (code, data) => ({ statusCode: code, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { ok: false });
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return json(503, { ok: false });
  let b;
  try { b = JSON.parse(event.body || "{}"); } catch { return json(400, { ok: false }); }
  const { razorpay_order_id: o, razorpay_payment_id: p, razorpay_signature: s } = b;
  if (!o || !p || !s) return json(400, { ok: false });
  const expected = crypto.createHmac("sha256", secret).update(o + "|" + p).digest("hex");
  const ok = expected.length === s.length && crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(s));
  return json(ok ? 200 : 400, { ok });
};
