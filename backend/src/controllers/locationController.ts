import { Request, Response } from 'express';
import axios from 'axios';

export const geocodeAddress = async (req: Request, res: Response) => {
  const { lat, lng } = req.body;
  if (!lat || !lng) {
    return res.status(400).json({ error: 'lat/lng required' });
  }

  try {
    const apiKey = process.env.OLA_MAPS_API_KEY;
    const url = `https://api.olamaps.io/places/v1/reverse-geocode?latlng=${lat},${lng}&api_key=${apiKey}`;
    const response = await axios.get(url);

    let district = 'Unknown';

    if (response.data && response.data.results && response.data.results.length > 0) {
      const result = response.data.results[0];

      // ✅ Step 1: Try extracting from address_components
      if (result.address_components && Array.isArray(result.address_components)) {
        const districtComp = result.address_components.find(
          (comp: any) =>
            comp.types.includes('district') ||
            comp.types.includes('city') ||
            comp.types.includes('locality')
        );
        if (districtComp) {
          district = districtComp.long_name || districtComp.short_name;
        }
      }

      // ✅ Step 2: Fallback → parse formatted_address
      if (district === 'Unknown' && result.formatted_address) {
        const parts = result.formatted_address.split(',');
        // Example: "... , Bhopal, Madhya Pradesh, India"
        const cityCandidate = parts.find(
          (p: string) => p.trim().toLowerCase() === 'bhopal'
        );
        if (cityCandidate) {
          district = cityCandidate.trim();
        }
      }
    }

    res.json({ district });
  } catch (error) {
    console.error('[geocodeAddress] Error:', error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
};
