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
    try {
      const response = await fetch('http://localhost:5000/api/location/geocode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lat, lng })
      });
      const data = await response.json();

      if (data && data.district && data.district !== 'Unknown') {
        return data.district;
      }
      console.log(data);
      if(data.city == "Indore"){
        return 'Bhopal';
      }
      return data.city;
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
