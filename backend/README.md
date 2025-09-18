# Unnati Backend

## Setup

1. Install dependencies:
   ```
   npm install
   ```
2. Create a `.env` file with:
   - `MONGO_URI=your_mongodb_connection_string`
   - `GOOGLE_MAPS_API_KEY=your_google_maps_api_key`
3. Start server:
   ```
   node index.js
   ```

## Endpoints

- `POST /api/location/geocode` — Geocode an address using Google Maps API
