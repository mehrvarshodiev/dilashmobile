# Dilash Mobile

Responsive Russian-language storefront built with React, TypeScript, Vite, Redux Toolkit, Tailwind CSS, Lucide React and React Router.

## Run locally

1. Install Node.js 20+
2. Run `npm install`
3. Copy `.env.example` to `.env.local` and configure Telegram variables (see security note below)
4. Run `npm run dev`
5. Build with `npm run build`

## Telegram order setup

The checkout reads `VITE_TELEGRAM_BOT_TOKEN` and `VITE_TELEGRAM_CHAT_ID`. **Important:** Vite variables prefixed with `VITE_` are included in client-side JavaScript and are visible to every visitor. For production, use a Vercel serverless API route with server-only `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` environment variables rather than exposing a bot token in the browser. Never commit real tokens to GitHub.

Product data is in `src/data/db.json`. Cart contents persist in localStorage. No customer login or registration is used.
