# SkillSwap - Backend

Node.js + Express + MongoDB API for the SkillSwap Student Skill Sharing App.

## Setup

1. Copy `.env.example` to `.env` and update `MONGO_URI` and `JWT_SECRET`.
2. Install dependencies:

   npm install

3. Run the server in development:

   npm run dev

The server will listen on `process.env.PORT` (default 5000).

## Deploy to Render (recommended) ✅

- Create a new Web Service on Render and connect the GitHub repo.
- Set the root directory to `server`.
- Build Command: `npm install`
- Start Command: `npm start`
- Add environment variables in Render for `MONGO_URI` and `JWT_SECRET`.
- A `render.yaml` file is included at the repository root to help define the service; add your repo details there if you want Render to auto-deploy.

> Note: Ensure CORS is configured (the server currently uses a permissive `cors()`), and that `VITE_API_URL` on the frontend points to your Render service URL.

## API Overview

- Auth: POST `/api/auth/signup`, POST `/api/auth/login`
- Skills: GET `/api/skills`, GET `/api/skills/:id`, POST `/api/skills`, PUT `/api/skills/:id`, DELETE `/api/skills/:id`
- Search: GET `/api/skills/search?query=...`
- Filter: GET `/api/skills/filter?category=...&level=...`
- Sort: GET `/api/skills/sort?by=rating`
- Stats: GET `/api/stats/skills`
- User skills: GET `/api/users/:id/skills`
- Comments: POST `/api/skills/:id/comment`, GET `/api/skills/:id/comments`, DELETE `/api/comments/:id`

All responses use a structured JSON format: `{ success: boolean, data?: any, error?: string }`.
