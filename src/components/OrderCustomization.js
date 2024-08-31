import React, { useState } from 'react';

const OrderCustomization = () => {
  const [customization, setCustomization] = useState('');

  const handleCustomizationChange = (e) => {
    setCustomization(e.target.value);
  };

  return (
    <div>
      <h2>Customize Your Order</h2>
      <textarea
        value={customization}
        onChange={handleCustomizationChange}
        placeholder="Enter customization details"
      />
      <p>Customizations: {customization}</p>
    </div>
  );
};

export default OrderCustomization;
