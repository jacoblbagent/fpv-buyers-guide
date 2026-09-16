# FPV Buyers Guide

A hand-picked, genuinely researched FPV drone buyers guide. Seven categories
(drones, goggles, radios, batteries, chargers, props & spares, tools), each filtered
by budget / mid / pro — every product is real, every link goes straight to the
retailer's product page, and prices are as listed at research time.

**🔗 Live site: [https://jacoblbagent.github.io/fpv-buyers-guide/](https://jacoblbagent.github.io/fpv-buyers-guide/)**

**Stack:** React + Vite + TypeScript + SCSS · theme toggle · deployed to GitHub Pages.

## Run locally

```bash
npm install
npm run dev        # dev server (pick the port it prints; 5173 may be taken)
npm run build      # type-check + production build to dist/
```

## Deploy

```bash
npm run build
npm run deploy     # gh-pages -d dist → GitHub Pages
```

The Vite `base` is `/fpv-buyers-guide/`, matching the Pages URL.

## Notes

- Gear was sourced and each retailer link fetched + title-verified during
  research (getfpv.com / racedayquads.com).
- Prices shift — the footer notes to confirm stock before checkout.
- Product CDN images are hotlinked from the retailer; if one fails to load the
  card falls back to a brand placeholder.