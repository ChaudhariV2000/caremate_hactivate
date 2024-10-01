import React, { useState, useEffect, useRef } from 'react';

const MapComponent = ({ destinations }) => {
  const mapRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let map, directionsService;

    const addMarkersAndRoutes = (userLocation) => {
      // Add user marker
      new window.google.maps.Marker({ 
        position: userLocation, 
        map,
        icon: {
          url: 'amb_icon.png',
          scaledSize: new window.google.maps.Size(35, 35),
        },
      });

      // Add destination markers
      destinations.forEach((dest) => {
        new window.google.maps.Marker({
          position: dest,
          map,
          icon: {
            url: 'Carecenter.png',
            scaledSize: new window.google.maps.Size(35, 45),
          },
        });
      });

      // Calculate and display routes
      directionsService = new window.google.maps.DirectionsService();
      const strokeColors = ["#9f2bff", "#f88ba5", "#00ff00", "#ff00ff"];

      destinations.forEach((destination, index) => {
        directionsService.route(
          {
            origin: userLocation,
            destination: destination,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              new window.google.maps.DirectionsRenderer({
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: strokeColors[index % strokeColors.length],
                  strokeOpacity: 0.8,
                  strokeWeight: 4,
                },
                map,
                directions: result,
              });
            } else {
              console.error(`Error fetching directions ${result}`);
            }
          }
        );
      });
    };

    const initializeMap = (userLocation) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDCKbhS2pPvk5Er_xB-9VGl-9KWvL_wSDs&libraries=places,marker`;
      script.async = true;
      script.onload = () => {
        map = new window.google.maps.Map(mapRef.current, {
          center: userLocation,
          zoom: 10,
          fullscreenControl: false,
          keyboardShortcuts: false,
          mapId: "9695f10f2a58b20f"
        });

        // Wait for the map to be fully loaded before adding markers and routes
        window.google.maps.event.addListenerOnce(map, 'idle', () => {
          addMarkersAndRoutes(userLocation);
        });
      };
      document.body.appendChild(script);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          initializeMap(userLocation);
        },
        (err) => {
          setError("Error getting current location: " + err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }

    return () => {
      if (map) {
        window.google.maps.event.clearInstanceListeners(map);
      }
    };
  }, [destinations]);

  if (error) {
    return <div>{error}</div>;
  }

  return <div ref={mapRef} style={{ width: '100%', height: '75vh' }} />;
};

export default MapComponent;