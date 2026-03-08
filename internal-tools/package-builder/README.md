# SBMC Package Builder

Internal tool for designing South Bay Milk Club's tiered service packages.

## Deploy to Vercel (2 minutes)

### Option A: Vercel CLI (fastest)
```bash
npm install
npx vercel
```
Follow the prompts — it'll give you a URL like `sbmc-tools.vercel.app`.

### Option B: GitHub → Vercel (auto-deploys)
1. Push this folder to a new GitHub repo
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repo
4. Vercel auto-detects Vite — just click Deploy

### Option C: Drag & drop
1. Run `npm run build`
2. Go to [vercel.com/new](https://vercel.com/new)
3. Drag the `dist/` folder onto the page

## Local development
```bash
npm install
npm run dev
```

## Features
- 39 maternal wellness services across 5 categories
- Drag-and-drop into 3 pricing tiers
- Auto-saves to localStorage (persists between sessions)
- Editable tier names and prices
- À la carte value tracking with savings %
- Export to .txt summary
- Mobile-friendly (tap + menu on small screens)
