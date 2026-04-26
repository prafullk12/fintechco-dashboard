# FintechCo Payment Operations Dashboard

A real-time payment operations dashboard built with Node.js and Express, designed for monitoring transaction volume, fraud rates, regional performance, and risk alerts across payment channels.

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-4.4-FF6384?logo=chartdotjs&logoColor=white)
![License](https://img.shields.io/badge/license-ISC-blue)

## Features

- **KPI Cards** — Total Volume, Transaction Count, Fraud Rate, API Uptime
- **Payment Volume Chart** — 12-month bar chart with Digital vs Traditional split; tab switcher for Volume / Transactions / Revenue
- **Payment Method Donut** — ACH, Cards, Wire, Crypto breakdown
- **Recent Transactions Feed** — Live table with method badges and credit/debit colour coding
- **Regional Volume** — CSS bar chart with YoY growth across 5 US regions
- **Risk Alerts Panel** — Severity-ranked alerts (Critical → Low) with category tagging
- **Live Clock** — Real-time timestamp in the header

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 18+ |
| Server | Express 5 |
| Charts | Chart.js 4.4 (CDN) |
| Styling | Vanilla CSS (CSS Grid, custom properties) |
| Data | Static JSON (swap for a live DB) |
| Deploy | Google Cloud Run |

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Installation

```bash
git clone https://github.com/prafullk12/fintechco-dashboard.git
cd fintechco-dashboard
npm install
```

### Run locally

```bash
npm start
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

## Project Structure

```
fintechco-dashboard/
├── public/
│   └── index.html          # Single-page dashboard (HTML + CSS + JS)
├── src/
│   └── server.js           # Express server + API routes
├── data/
│   ├── metrics.json        # KPIs, charts, alerts data
│   ├── transactions.json   # 312 sample transactions (2024)
│   ├── accounts.json       # Sample account data
│   ├── portfolio.json      # Sample investment portfolio
│   └── user.json           # Sample user profile
├── CLAUDE.md               # AI assistant context for this repo
├── package.json
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Serves the dashboard |
| `GET` | `/api/metrics` | Returns KPIs, charts, alerts, and transactions |
| `GET` | `/api/transactions` | Paginated transaction list with filters |

### `/api/transactions` Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | number | Page number (default: `1`) |
| `limit` | number | Results per page (default: `20`) |
| `category` | string | Filter by category (e.g. `Food`, `Income`) |
| `type` | string | `credit` or `debit` |
| `account` | string | `checking`, `savings`, `investment`, `credit_card` |

**Example:**
```bash
curl "http://localhost:8080/api/transactions?type=credit&limit=5"
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `8080` | Port the server listens on |

## Deployment to Google Cloud Run

### 1. Authenticate

```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```

### 2. Build and push the image

```bash
gcloud builds submit --tag us-central1-docker.pkg.dev/YOUR_PROJECT_ID/services/dashboard
```

### 3. Deploy

```bash
gcloud run deploy fintechco-dashboard \
  --image us-central1-docker.pkg.dev/YOUR_PROJECT_ID/services/dashboard \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated
```

## Customising the Data

All dashboard data lives in `data/metrics.json`. To point at a real database, replace the `fs.readFileSync` calls in `src/server.js` with your database queries — the API response shape stays the same.

To regenerate the 312 sample transactions:

```bash
node data/generate_transactions.js
```

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

## License

ISC © FintechCo
