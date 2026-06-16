# PeopleFirst Website — Deployment Guide

## Prerequisites
- Node.js 18+ and npm/pnpm
- A GitHub account (for Keystatic CMS in production)
- A Vercel account (free tier works)
- A Resend account for contact form emails
- Google Analytics 4 property
- Google Search Console access

---

## Step 1 — Local Development

```bash
# Clone the repository
git clone https://github.com/your-org/peoplefirst-website.git
cd peoplefirst-website

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Fill in your .env.local values (see Step 3)

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Keystatic CMS admin panel** is available at [http://localhost:3000/keystatic](http://localhost:3000/keystatic) — use this to edit all site content visually.

---

## Step 2 — Push to GitHub

```bash
git add .
git commit -m "Initial PeopleFirst website"
git remote add origin https://github.com/your-org/peoplefirst-website.git
git push -u origin main
```

---

## Step 3 — Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New Project**
3. Import your GitHub repository
4. Vercel auto-detects Next.js — no framework config needed
5. Click **Deploy** (it will fail until env vars are set — that's OK)

---

## Step 4 — Set Environment Variables in Vercel

In your Vercel project dashboard → **Settings → Environment Variables**, add:

| Variable | Value | Description |
|---|---|---|
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | Your GA4 Measurement ID |
| `RESEND_API_KEY` | `re_xxxxxxxxxxxx` | From resend.com dashboard |
| `NEXT_PUBLIC_SITE_URL` | `https://wearepeoplefirst.com` | Your production domain |
| `KEYSTATIC_GITHUB_CLIENT_ID` | `Iv1.xxxxxxxx` | GitHub OAuth App Client ID |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | `xxxxxxxx` | GitHub OAuth App Client Secret |
| `KEYSTATIC_SECRET` | `random-32-char-string` | Run: `openssl rand -hex 16` |
| `KEYSTATIC_GITHUB_REPO_OWNER` | `your-org` | Your GitHub username/org |
| `KEYSTATIC_GITHUB_REPO_NAME` | `peoplefirst-website` | Your repo name |

### Setting up Resend
1. Sign up at [resend.com](https://resend.com)
2. Add and verify your domain (`wearepeoplefirst.com`)
3. Create an API key under **API Keys**
4. The contact form will send emails from `noreply@wearepeoplefirst.com` to `carla@wearepeoplefirst.com`

### Setting up Keystatic GitHub Mode (for production CMS)
1. Go to GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**
2. Set **Homepage URL**: `https://wearepeoplefirst.com`
3. Set **Authorization callback URL**: `https://wearepeoplefirst.com/api/keystatic/github/oauth/callback`
4. Copy the **Client ID** and generate a **Client Secret**
5. Add both to Vercel env vars

---

## Step 5 — Add Custom Domain

1. In Vercel project → **Settings → Domains**
2. Add `wearepeoplefirst.com` and `www.wearepeoplefirst.com`
3. Follow Vercel's DNS configuration instructions:
   - Add an **A record** pointing to Vercel's IP
   - Add a **CNAME record** for `www`
4. Wait for DNS propagation (usually 5–30 minutes)
5. Vercel automatically provisions SSL certificates

---

## Step 6 — Google Search Console Verification

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Click **Add Property** → URL prefix → enter `https://wearepeoplefirst.com`
3. Choose **HTML file** verification method
4. Download the verification HTML file (e.g., `google1234567890abcdef.html`)
5. Replace `public/google-site-verification.html` with the downloaded file, **renaming it** to match
6. Commit and deploy to Vercel
7. Click **Verify** in Search Console

---

## Step 7 — Submit Sitemap to Search Console

1. After verification, go to **Sitemaps** in Search Console sidebar
2. Enter `sitemap.xml` and click **Submit**
3. The sitemap is automatically generated at `https://wearepeoplefirst.com/sitemap.xml`

---

## Step 8 — Enable Google Analytics 4

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create a new **GA4 Property** for `wearepeoplefirst.com`
3. Under **Data Streams**, add a Web stream
4. Copy the **Measurement ID** (starts with `G-`)
5. Add it as `NEXT_PUBLIC_GA_ID` in Vercel env vars
6. Redeploy — analytics will start collecting data immediately

---

## Step 9 — Using the Keystatic CMS

Once deployed with production env vars:

1. Visit `https://wearepeoplefirst.com/keystatic`
2. Authenticate with GitHub
3. Edit **Site Content** → all sections are fully editable:
   - Hero headline, subheadline, CTA
   - Problem cards copy
   - About/bio text and photo upload
   - Client names list
   - Contact information
   - SEO meta title/description/OG image
4. Save changes → Keystatic commits directly to your GitHub repo
5. Vercel auto-deploys on every push

---

## Ongoing Maintenance

### Adding a client logo
1. Go to `/keystatic` → Site Content → Clients
2. Add the client name to the list
3. Save — deploys automatically

### Updating Carla's photo
1. Prepare image: `400×500px` JPG, optimized (< 200KB)
2. Go to `/keystatic` → Site Content → About → Carla Photo
3. Upload the image
4. In `components/sections/About.tsx`, uncomment the `<Image>` block and remove the placeholder

### Updating the Calendly link
1. Go to `/keystatic` → Site Content → Nav → Book a Call URL
2. Paste your Calendly URL
3. Save

---

## Environment Variables Reference

```env
# Required for Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Required for Contact Form
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx

# Required for production CMS
KEYSTATIC_GITHUB_CLIENT_ID=Iv1.xxxxxxxxxxxxxxxx
KEYSTATIC_GITHUB_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
KEYSTATIC_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
KEYSTATIC_GITHUB_REPO_OWNER=your-github-username-or-org
KEYSTATIC_GITHUB_REPO_NAME=peoplefirst-website

# Optional (defaults to https://wearepeoplefirst.com)
NEXT_PUBLIC_SITE_URL=https://wearepeoplefirst.com
```

---

## Tech Stack Summary

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| CMS | Keystatic (Git-backed) |
| i18n | Custom context (EN/ES) |
| Forms | react-hook-form + Zod |
| Email | Resend |
| Analytics | Google Analytics 4 |
| Fonts | Syne (display) + DM Sans (body) |
| Deployment | Vercel |
