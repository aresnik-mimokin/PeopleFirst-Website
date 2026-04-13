# PeopleFirst Agency — Marketing Website

Single-page marketing website for **PeopleFirst Agency**, built to deploy directly on Netlify. No frameworks, no build step.

**Live:** [wearepeoplefirst.com](https://wearepeoplefirst.com) *(update once deployed)*

---

## Stack

- Vanilla HTML + CSS + JavaScript — zero dependencies
- Google Fonts: [Syne](https://fonts.google.com/specimen/Syne) + [DM Sans](https://fonts.google.com/specimen/DM+Sans)
- Netlify Forms (contact form, no backend needed)
- Google Analytics 4 (placeholder — swap in your Measurement ID)

---

## File Structure

```
/
├── index.html          ← full page structure, all 10 sections
├── style.css           ← dark theme, glassmorphism, responsive
├── script.js           ← scroll animations, nav, smooth scroll
└── public/
    └── images/
        └── carla.jpg   ← founder photo (add manually)
```

---

## Sections

| # | Section | Description |
|---|---------|-------------|
| 1 | Nav | Logo + Book a Call CTA |
| 2 | Hero | Headline, subtitle, two CTAs, grain texture |
| 3 | Problem | 3 pain-point cards |
| 4 | Services | AI & Data · Engineering · Platform & Backend |
| 5 | About | Carla Costantini bio + photo |
| 6 | Process | 3-step executive search timeline |
| 7 | Clients | Hotel Engine, dLocal, Joy, Stay AI, Cargo PartnersX, Deepcell, Amma |
| 8 | Pricing | 10% fee · $0 upfront · 30-day guarantee · 12-month view |
| 9 | Contact | Netlify form + email, LinkedIn, phone |
| 10 | Footer | Logo, nav links, copyright |

---

## Deploy to Netlify

### Option A — Drag & Drop
1. Download or clone this repo
2. Add `public/images/carla.jpg` (founder photo)
3. Go to [app.netlify.com](https://app.netlify.com) → drag the project folder

### Option B — Connect GitHub repo
1. Push this repo to GitHub
2. In Netlify: **Add new site → Import from Git**
3. Select the repo — no build command needed, publish directory is `/`

### After deploy
- Go to **Site settings → Forms** to enable Netlify Forms (contact form auto-detected)
- Replace `GA_MEASUREMENT_ID` in `index.html` with your real GA4 ID
- Update the Calendly link in the nav (`href="https://calendly.com"`)

---

## Local Preview

No build step needed — just open the file:

```bash
# Option 1: open directly
open index.html

# Option 2: local server (avoids CORS on fonts)
npx serve .
# or
python3 -m http.server 8080
```

---

## Customization

| What | Where |
|------|-------|
| Colors / fonts | `style.css` — `:root` variables at top |
| Calendly link | `index.html` — nav `Book a Call` href |
| GA4 ID | `index.html` — two places in `<head>` |
| Founder photo | `public/images/carla.jpg` |
| Contact email | `index.html` — contact section |

---

## Contact

**Carla Costantini** — [carla@wearepeoplefirst.com](mailto:carla@wearepeoplefirst.com)  
[linkedin.com/in/carlacostantini](https://www.linkedin.com/in/carlacostantini/)

---

© 2026 PeopleFirst Agency
