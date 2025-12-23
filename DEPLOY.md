# Deployment Guide

This file summarizes how to deploy the project: Frontend to Vercel and Backend to Render.

## Frontend (client) — Vercel ✅

1. On GitHub, push your repo and create a Vercel account if you don't have one.
2. In Vercel, create a new project and import your GitHub repo.
   - Set the **Root Directory** to `client`.
   - Build command: `npm run build` (Vite)
   - Output Directory: `dist`
3. Add Environment Variables in Vercel Project Settings:
   - `VITE_API_URL` → e.g. `https://your-backend-url.com/api`
4. Deploy. Vercel will build and publish the static site from the `dist` folder.

Notes:
- `client/vercel.json` and `client/.vercelignore` are included to help Vercel detection and to ignore server files.

## Backend (server) — Render (recommended) ✅

1. On Render, create a new **Web Service** and connect your GitHub repo.
   - Set the **Root Directory** to `server`.
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
2. Add required environment variables on Render:
   - `MONGO_URI` → your production MongoDB connection string
   - `JWT_SECRET` → a strong secret
3. Optionally, edit `render.yaml` at repo root to include repo details for auto-deploy.

Notes:
- The server listens on `process.env.PORT` and the frontend must point `VITE_API_URL` to your server base URL (append `/api` if needed).
- CORS is currently permissive (`cors()`), verify this is secure for production if needed.

## Quick GitHub steps

1. git add . && git commit -m "Prepare for deployment: removed debug logs, add deploy configs"
2. git push origin main
3. On Vercel/Render, connect the repo and trigger the first deploy.

## Security step
- Make sure to add real secrets in each hosting provider's environment variable UI, not in your repository.
- The `.env.example` in `server` has been sanitized; do not commit a real `.env` file.

---
