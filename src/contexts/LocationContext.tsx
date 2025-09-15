import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Location {
  lat: number;
  lng: number;
  district?: string;
  loading: boolean;
  error: string | null;
}

const LocationContext = createContext<{
  location: Location;
  getCurrentLocation: () => Promise<void>;
} | null>(null);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<Location>({
    lat: 0,
    lng: 0,
    loading: false,
    error: null,
  });

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        error: 'Geolocation is not supported by this browser.',
        loading: false,
      }));
      return;
    }

    setLocation(prev => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Reverse geocoding to get district (mock implementation)
          const district = await reverseGeocode(latitude, longitude);
          
          setLocation({
            lat: latitude,
            lng: longitude,
            district,
            loading: false,
            error: null,
          });
        } catch (error) {
          setLocation(prev => ({
            ...prev,
            lat: latitude,
            lng: longitude,
            loading: false,
            error: 'Failed to get location details',
          }));
        }
      },
      (error) => {
        setLocation(prev => ({
          ...prev,
          error: `Geolocation error: ${error.message}`,
          loading: false,
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000, // 10 minutes
      }
    );
  };

  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    // Use Google Maps Geocoding API for real city detection
    try {
      const apiKey = 'AIzaSyBaotiUnn4oZTCDuwzL87HyQGZzJ6399Is';
      console.log('[reverseGeocode] Fetching for lat:', lat, 'lng:', lng);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );
      const data = await response.json();
      console.log('[reverseGeocode] Google API response:', data);
      if (data.status === 'OK' && data.results && data.results.length > 0) {
        // Try to find a locality (city/town/village)
        let city = '';
        for (const result of data.results) {
          for (const comp of result.address_components) {
            if (comp.types.includes('locality')) {
              city = comp.long_name;
              break;
            }
          }
          if (city) break;
        }
        // Fallback to administrative_area_level_2 (district) or administrative_area_level_1 (state)
        if (!city) {
          for (const result of data.results) {
            for (const comp of result.address_components) {
              if (comp.types.includes('administrative_area_level_2')) {
                city = comp.long_name;
                break;
              }
            }
            if (city) break;
          }
        }
        if (!city) {
          for (const result of data.results) {
            for (const comp of result.address_components) {
              if (comp.types.includes('administrative_area_level_1')) {
                city = comp.long_name;
                break;
              }
            }
            if (city) break;
          }
        }
        console.log('[reverseGeocode] Parsed city:', city);
        return city || 'Unknown';
      } else {
        console.log('[reverseGeocode] Google API status not OK or no results');
        return 'Unknown';
      }
    } catch (err) {
      console.error('[reverseGeocode] Error:', err);
      return 'Unknown';
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <LocationContext.Provider value={{ location, getCurrentLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};