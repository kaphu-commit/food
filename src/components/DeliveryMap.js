// DeliveryMap.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

const DeliveryMap = ({ location }) => {
  return (
    <MapContainer center={location} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={location}>
        <Popup>Delivery Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default DeliveryMap;
