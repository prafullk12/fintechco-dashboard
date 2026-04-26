# FintechCo Dashboard

Node.js + Express payment dashboard for FinTechCo.

## GCP Configuration

- **Project ID:** project-41f2769d-52f0-4dbe-804
- **Region:** us-central1
- **Cloud Run service:** fintechco-dashboard
- **Artifact Registry:** us-central1-docker.pkg.dev/project-41f2769d-52f0-4dbe-804/services/dashboard

## Commands

| Task | Command |
|------|---------|
| Build | `npm run build` |
| Test | `npm test` |
| Deploy | `gcloud run deploy` |

## Rules

- **Never modify `package-lock.json` directly.** It is managed exclusively by npm.

## Project Structure

```
data/       Sample JSON data (transactions, accounts, portfolio, user)
public/     Static frontend assets
src/        Express application source
```

## Deployment

```bash
gcloud run deploy fintechco-dashboard \
  --image us-central1-docker.pkg.dev/project-41f2769d-52f0-4dbe-804/services/dashboard \
  --region us-central1 \
  --project project-41f2769d-52f0-4dbe-804
```
