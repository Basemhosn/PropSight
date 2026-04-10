# Dubai Real Estate Dashboard

A free, open-source dashboard for analysing Dubai property transactions using official **Dubai Land Department (DLD) open data**.

![Dashboard Preview](https://i.imgur.com/placeholder.png)

## Features

- Upload any CSV exported from the DLD open data portal
- KPI cards — total transactions, total AED value, average deal size, active areas
- Bar chart by area — sortable by count, total value, or average price (top 20 areas)
- Transaction type donut — Sales / Mortgages / Gifts breakdown
- Monthly volume trend chart
- Full sortable, paginated area table with avg size, top type
- Filters — by type, usage, registration type, property type, area search
- Demo mode with 8,000 realistic sample transactions
- Works 100% in the browser — no server, no API key, no cost

---

## Getting started locally

### Prerequisites
- Node.js 18+ — download from [nodejs.org](https://nodejs.org)

### Install and run

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm start
```

The app opens at **http://localhost:3000**

---

## Getting your free DLD data

1. Go to [dubailand.gov.ae/en/open-data/real-estate-data](https://dubailand.gov.ae/en/open-data/real-estate-data/)
2. Under **Transactions**, fill in:
   - From Date: `01-01-2025`
   - To Date: today's date
   - Transaction Type: All (or filter as needed)
3. Click **Search**, then **Download as CSV**
4. Drop the CSV into the dashboard upload box

The CSV columns the dashboard expects (all provided by DLD):

| Column | Description |
|--------|-------------|
| Transaction Date | DD-MM-YYYY format |
| Transaction Type | Sale / Mortgage / Gift |
| Area | Dubai area name |
| Amount | Transaction value in AED |
| Property Type | Unit / Land / Building |
| Usage | Residential / Commercial / Other |
| Registration type | Ready / Off Plan |
| Transaction Size (sq.m) | Size of the transaction |

---

## Deploy to Vercel (free, recommended)

### Option A — Vercel CLI (fastest)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from the project folder
vercel
```

Follow the prompts — your app will be live at `https://your-app.vercel.app` in ~60 seconds.

### Option B — GitHub + Vercel (recommended for ongoing use)

1. Push this project to a GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/dubai-re-dashboard.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) → New Project → Import your GitHub repo
3. Vercel auto-detects Create React App — click **Deploy**
4. Every time you push to GitHub, Vercel auto-redeploys

### Option C — Netlify Drop (no CLI needed)

```bash
npm run build
```

Then drag the `build/` folder onto [netlify.com/drop](https://app.netlify.com/drop)

---

## Project structure

```
dubai-re-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── UploadZone.jsx      # CSV upload + how-to guide
│   │   ├── TopNav.jsx          # Sticky navigation bar
│   │   ├── FilterBar.jsx       # All filter controls
│   │   ├── KpiCard.jsx         # Summary metric cards
│   │   ├── AreaBarChart.jsx    # Horizontal bar chart by area
│   │   ├── TypeDonut.jsx       # Transaction type pie chart
│   │   ├── MonthlyTrend.jsx    # Area chart of monthly volume
│   │   └── AreaTable.jsx       # Sortable paginated table
│   ├── utils/
│   │   ├── parseCSV.js         # DLD CSV parser + data aggregators
│   │   ├── format.js           # AED, number, date formatters
│   │   └── sampleData.js       # Demo data generator
│   ├── App.jsx                 # Main app, state, filtering
│   └── index.js
├── package.json
└── README.md
```

---

## Roadmap / possible extensions

- [ ] Map view of Dubai areas (choropleth)
- [ ] Export filtered data back to CSV
- [ ] Compare two time periods side by side
- [ ] Price per sq.m analysis
- [ ] Arabic language support
- [ ] Saved filter presets (localStorage)
- [ ] Multi-file upload (merge multiple DLD exports)

---

## Data source

All data comes from the **Dubai Land Department Official Open Data Portal**:
- Website: [dubailand.gov.ae/en/open-data](https://dubailand.gov.ae/en/open-data/)
- Historical data: [Dubai Pulse](https://www.dubaipulse.gov.ae/organisation/dld)
- License: Dubai Open Data License

---

## Tech stack

- [React 18](https://react.dev)
- [Recharts](https://recharts.org) — charts
- [PapaParse](https://www.papaparse.com) — CSV parsing
- [Lucide React](https://lucide.dev) — icons
- [date-fns](https://date-fns.org) — date utilities
