# CertiChain Frontend

React.js + Vite frontend for the **CertiChain — Digital Certificate Verification Portal**.

## Tech Stack
- React.js (Vite)
- Tailwind CSS
- Axios
- React Router v6
- html5-qrcode (QR scanning)
- qrcode.react (QR generation)

## Local Development

```bash
npm install
# Create .env file with:
# VITE_API_BASE_URL=http://localhost:5000/api
npm run dev
```

## Production Deployment (Vercel)

- **Framework**: Vite
- **Root Directory**: `/` (this repository root)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variable**: `VITE_API_BASE_URL=https://certichain-backend-73wy.onrender.com/api`

## Demo Credentials

- **Institution Login**: `admin@abc.edu` / `password123`
- **Demo Certificate ID**: `CERT-2026-000001`
