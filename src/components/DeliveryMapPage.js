// DeliveryMapPage.js
import React from 'react';
import DeliveryMap from './DeliveryMap';

const DeliveryMapPage = () => {
  const deliveryLocation = [24.8170, 93.9368]; // Coordinates for Imphal, Manipur

  return (
    <div>
      <h1>Delivery Location</h1>
      <DeliveryMap location={deliveryLocation} />
    </div>
  );
};

export default DeliveryMapPage;
