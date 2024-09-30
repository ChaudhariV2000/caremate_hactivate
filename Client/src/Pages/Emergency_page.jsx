import React, { useState, useEffect } from 'react';
import EmergencyButton from '../Component/EmergencyButton.jsx';
import MapComponent from '../Component/Emergency.jsx';
import '../App.css';

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [ambulances, setAmbulances] = useState([]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error("User denied the request for Geolocation.");
              alert("Please enable location permissions for this site in your browser settings.");
              break;
            case error.POSITION_UNAVAILABLE:
              console.error("Location information is unavailable.");
              alert("Unable to retrieve your location. Please ensure you have a good signal or try again later.");
              break;
            case error.TIMEOUT:
              console.error("The request to get user location timed out.");
              alert("Request for location timed out. Please try again.");
              break;
            default:
              console.error("An unknown error occurred while retrieving location.");
              alert("An unknown error occurred. Please try again.");
              break;
          }
        },
        {
          timeout: 10000, // 10 seconds timeout
          maximumAge: 0, // Disable cache
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      alert("Geolocation is not supported by your browser. Please use a different browser or device.");
    }
  }, []);
  
  const handleEmergencyCall = async () => {
    // Simulate emergency call
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('Emergency services have been notified!');
  };

  return (
    <div className="App flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <MapComponent 
        destinations={[
          { lat: 19.073836, lng: 72.828772 },
          { lat: 19.060347, lng: 72.829878 },
          { lat: 19.062342, lng: 72.830816 }, 
          { lat: 19.067598, lng: 72.835077 } 
        ]}
      />
      <EmergencyButton onEmergencyCall={handleEmergencyCall} />
    </div>
  );
}

export default App;

// https://maps.googleapis.com/maps/api/js?key=AIzaSyDCKbhS2pPvk5Er_xB-9VGl-9KWvL_wSDs&libraries=places,marker