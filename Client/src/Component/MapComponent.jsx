import React, { useRef, useEffect } from 'react';

const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 28.6139, lng: 77.2090 }, // Mumbai's coordinates
      zoom: 15,
    });

    // Add event listener to handle map clicks
    map.addListener('click', (event) => {
      console.log('Clicked coordinates:', event.latLng.toJSON());
    });
  }, []);

  return (
    <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
      <div ref={mapRef} className="w-full h-full"></div>
    </div>
  );
};

export default MapComponent;