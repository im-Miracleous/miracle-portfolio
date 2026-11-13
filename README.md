# Miracle Steven Gerrald — Desktop-OS Portfolio

Minimalist, desktop-OS-inspired personal portfolio built with **React (Vite + Tailwind CSS)** and **Node.js (Express)**.

## Project Structure

- `client/` — React + Vite + Tailwind CSS frontend (`client/src/data/portfolioData.js` holds all profile & project content)
- `server/` — Express backend serving `client/dist` in production and `POST /api/contact`
- `package.json` — Root workspace scripts using `concurrently`

## Getting Started

1. Install all dependencies:
   ```bash
   npm run install:all
   ```
2. Run both frontend (Vite on `:5173`) and backend (Express on `:5000`) in development:
   ```bash
   npm run dev
   ```
3. Build and run in production:
   ```bash
   npm run build
   npm start
   ```
