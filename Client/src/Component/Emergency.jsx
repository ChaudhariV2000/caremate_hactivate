import React, { useState, useEffect, useRef } from 'react';

const MapComponent = ({ destinations }) => {
  const mapRef = useRef(null);
  const [googleMap, setGoogleMap] = useState(null);
  const [directions, setDirections] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get user's current position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (err) => {
          setError("Error getting current location: " + err.message);
        }

        
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDCKbhS2pPvk5Er_xB-9VGl-9KWvL_wSDs&libraries=places,marker`;
      script.async = true;
      script.onload = initializeMap;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [userLocation]);

  const initializeMap = () => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: userLocation,
      zoom: 10,
      fullscreenControl:false,
      keyboardShortcuts:false,
      mapId:"9695f10f2a58b20f"
    });
    setGoogleMap(map);

    // Add markers
    new window.google.maps.Marker({ 
      position: userLocation, 
      map,
      /*icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 7,
        fillColor: "#4285F4",
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: "#FFFFFF",
      }*/
      icon: {
        url: 'amb_icon.png',
        scaledSize: new window.google.maps.Size(35, 35),
      },
    });
    destinations.forEach((dest) => {
      new window.google.maps.Marker({
        position: dest,
        map,
        icon: {
          url: 'Ambulance.png',
          scaledSize: new window.google.maps.Size(35, 35),
        },
      });
    });

    // Calculate and display routes
    const directionsService = new window.google.maps.DirectionsService();
    const strokeColorMap = {
      0: "#9f2bff",
      1: "#f88ba5",
      2: "#00ff00",
      3: "#ff00ff",
      // Add more colors as needed
  };
    destinations.forEach((destination, index) => {
      directionsService.route(
        {
          origin: userLocation,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            const newRenderer = new window.google.maps.DirectionsRenderer({
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: strokeColorMap[index],
                strokeOpacity: 0.8,
                strokeWeight: 4,
              },
            });
            newRenderer.setMap(map);
            newRenderer.setDirections(result);
            setDirections(prev => [...prev, newRenderer]);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    });
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!userLocation) {
    return <div>Loading...</div>;
  }

  return (
    <div ref={mapRef} style={{ width: '100%', height: '75vh' }} />
  );
};

export default MapComponent;