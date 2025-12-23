SkillSwap — Vite + React frontend

Setup:
1. cd client
2. npm install
3. npm run dev

Notes:
- Update the API base URL in `src/api/axiosConfig.js` if your backend runs elsewhere.
- Tailwind is configured and used for quick styling.

## Deploy to Vercel ✅

- Connect the `client` folder to a Vercel project (set the project root to `client`).
- Set Environment Variable `VITE_API_URL` to your backend API URL (for example `https://your-backend-url.com/api`).
- Vercel will run `npm run build` and use the `dist` folder as output (configured via `vercel.json`).
- After deployment the built app will use `import.meta.env.VITE_API_URL` at build time.

> Tip: Use the Vercel dashboard to configure `VITE_API_URL` under Project Settings → Environment Variables.
