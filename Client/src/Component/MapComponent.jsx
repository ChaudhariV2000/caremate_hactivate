import React, { useRef, useEffect, useState } from 'react';

const MapComponent = () => {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapLoadError, setMapLoadError] = useState(null);

  useEffect(() => {
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDCKbhS2pPvk5Er_xB-9VGl-9KWvL_wSDs&libraries=places`;
    googleMapScript.async = true;
    googleMapScript.defer = true;
    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener('load', () => {
      setMapLoaded(true);
    });

    googleMapScript.addEventListener('error', (error) => {
      setMapLoadError('Failed to load Google Maps API');
      console.error('Google Maps API failed to load', error);
    });

    return () => {
      window.document.body.removeChild(googleMapScript);
    };
  }, []);

  useEffect(() => {
    if (mapLoaded && mapRef.current) {
      const center = { lat: 28.6139, lng: 77.2090 }; // Mumbai's coordinates
      const map = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: 15,
      });

      // Add a marker at the center
      new window.google.maps.Marker({
        position: center,
        map: map,
      });

      map.addListener('click', (event) => {
        console.log('Clicked coordinates:', event.latLng.toJSON());
      });
    }
  }, [mapLoaded]);

  if (mapLoadError) {
    return <div className="w-full h-64 bg-red-200 rounded-lg flex items-center justify-center text-red-500">{mapLoadError}</div>;
  }

  return (
    <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
      {!mapLoaded && <div>Loading map...</div>}
      <div ref={mapRef} className="w-full h-full"></div>
    </div>
  );
};

export default MapComponent;