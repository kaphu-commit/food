import React, { useState } from 'react';

const GeoLocation = () => {
  const [location, setLocation] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      <h2>Current Location</h2>
      <button onClick={getLocation}>Get Location</button>
      {location && (
        <p>Latitude: {location.latitude}, Longitude: {location.longitude}</p>
      )}
    </div>
  );
};

export default GeoLocation;
