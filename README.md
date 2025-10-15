# Unnati

Small full-stack starter (Vite + React + TypeScript) with a Node/Express + TypeScript backend.

## Project structure

- `src/` — frontend React app (Vite + TypeScript)
- `backend/` — Node/Express backend in TypeScript

## Environment

Create a `.env` file inside the `backend/` folder with the following variables (example values removed for security):

```
MONGO_URI=your_mongodb_connection_string
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
HF_API_KEY=your_huggingface_api_key
WS_PORT=3001
PORT=3001
OLA_MAPS_API_KEY=your_ola_maps_api_key
```

The repository ignores `.env` files; make sure you do not commit secrets to source control.

The frontend reads `VITE_WS_URL` (see `src/components/Transcriber.tsx`); if you want the frontend to connect to the local backend WS, create a `.env.local` at the project root (or in the frontend root) with:

```
VITE_WS_URL=ws://localhost:3001/ws/transcribe
```

## Run locally (PowerShell)

Install project-level dependencies (frontend):

```powershell
cd 'c:\Users\ishu1\Downloads\New folder\unnati'
npm install
```

Start the frontend dev server:

```powershell
npm run dev
```

Install backend dependencies and start the backend (in a separate terminal):

```powershell
cd 'c:\Users\ishu1\Downloads\New folder\unnati\backend'
npm install
npm run dev
```

Notes
- Backend `dev` runs `ts-node src/index.ts` and expects a `backend/.env` file to be present.
- The frontend uses Vite and hot reloads on changes.

## Verification

- Backend: after starting, you should see `Server running on http://localhost:3001` in the backend terminal.
- Frontend: open `http://localhost:5173` (or the port shown by Vite) and verify the UI loads.

## Troubleshooting

- If the backend cannot connect to MongoDB, double-check `MONGO_URI` and network access to your cluster.
- If the Transcriber component fails to connect, confirm `VITE_WS_URL` points to the backend WS endpoint.

If you'd like, I can also:

- Add `/backend/.env` explicitly to `.gitignore` (if absent).
- Add a small CONTRIBUTING or DEVELOPMENT doc with setup scripts for Windows, macOS, and Linux.