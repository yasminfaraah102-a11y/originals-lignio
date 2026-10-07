# Originals by Lignio: putting thelignio.com live

Everything here is free except the domain. It takes about 1 hour the first time.

What you get:
- Your website at **thelignio.com**
- An admin panel at **thelignio.com/admin** to add blends, prices, photos and text from your phone or laptop
- Every order saved in a dashboard and emailed to you, as well as sent to WhatsApp
- Free HTTPS (the padlock)

---

## 1. Buy the domain (10 min)

1. You already bought **thelignio.com** on Hostinger. Skip to step 2.

## 2. Put the files on GitHub (10 min)

GitHub stores the site files. The admin panel saves your edits here.

1. Make a free account at github.com.
2. Click **+ → New repository**. Name it `originals-lignio`. Private is fine. Click **Create**.
3. Click **uploading an existing file**. Drag in everything inside this folder (index.html, the `admin`, `content` and `images` folders, this file). Click **Commit changes**.
4. (Already done: the admin settings already use your GitHub username.)

## 3. Host it on Netlify (5 min)

1. Go to netlify.com and **Sign up with GitHub**.
2. **Add new site → Import an existing project → GitHub →** pick `originals-lignio`.
3. Leave the build command empty and the publish directory empty. Click **Deploy**.
4. In a minute you get a link like `something.netlify.app`. Your site is live there.

## 4. Save orders (5 min)

1. In Netlify, open your site → **Forms → Enable form detection**.
2. Go to **Deploys → Trigger deploy → Deploy site** once.
3. **Forms → Form notifications → Add notification → Email**. Choose the `order` form and enter your email.

Now every order a customer sends also appears under **Forms → order**, with name, phone, address and items.

## 5. Turn on the admin panel (10 min)

1. On GitHub: your photo → **Settings → Developer settings → OAuth Apps → New OAuth App**.
   - Application name: `Lignio admin`
   - Homepage URL: `https://thelignio.com`
   - Authorization callback URL: `https://api.netlify.com/auth/done`
2. Click **Register**, then **Generate a new client secret**. Keep this page open.
3. In Netlify: **Site configuration → Access & security → OAuth → Install provider → GitHub**. Paste the Client ID and Client secret. Save.
4. Open `your-site.netlify.app/admin` and log in with GitHub.

## 6. Connect thelignio.com (10 min, then wait)

1. In Netlify: **Domain management → Add a domain → thelignio.com**. Choose **Netlify DNS**.
2. Netlify shows 4 nameservers (like `dns1.p01.nsone.net`).
3. In GoDaddy (or wherever you bought it): **My domains → thelignio.com → DNS → Nameservers → Change → Enter my own**. Paste the 4 nameservers and save.
4. Wait 1 to 24 hours. Netlify turns on HTTPS by itself.

## 7. Email (optional, 15 min)

Make **hello@thelignio.com** for free with the Zoho Mail free plan. Zoho shows the DNS records to add. Add them in Netlify under **Domain management → thelignio.com → DNS settings**.

---

## Editing the site later

Open **thelignio.com/admin** and log in.

- **Blends (products) → All blends**: add a new flavour, change prices, upload photos, mark a blend for the home page, or hide it when out of stock.
- **Pages and text → Home, story and contact**: change the headline, story, Assam and Kerala text, phone, WhatsApp number and email.
- **Assam and Kerala photos**: upload a real Kaziranga or Munnar photo in "Assam photo" or "Kerala photo". Leave it empty to keep the illustration.

Click **Publish**. The site updates in about 1 minute.

Free photos you can use on a business site: search "Kaziranga rhino", "Assam tea garden", "Munnar tea" or "Kerala spices" on **unsplash.com** or **pexels.com**. Your own photos are even better.

Photo tips: use JPG under 500 KB. Product photos look best upright (4:5). Assam and Kerala photos look best wide (16:9).

## Taking online payments later

When you're ready, open a **Razorpay** account with Lignio Private Limited's details (CIN, PAN, current account). Razorpay gives you a Payment Button code for UPI and cards. Send it to me and I'll add it to the order page.
