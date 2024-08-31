import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import DeliveryMap from './components/DeliveryMap';
import DiscountCode from './components/DiscountCode';
import GeoLocation from './components/GeoLocation';
import LiveChat from './components/LiveChat';
import LoyaltyRewards from './components/LoyaltyRewards';
import OrderCustomization from './components/OrderCustomization';
import OrderHistory from './components/OrderHistory';
import OrderTracking from './components/OrderTracking';
import PersonalizedRecommendations from './components/PersonalizedRecommendations';
import DynamicPricing from './components/DynamicPricing';
import Login from './components/Login';
import SignUp from './components/SignUp';
import PrivateRoute from './components/PrivateRoute'; // Ensure PrivateRoute is updated

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1>Food Delivery App</h1>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
          <Route path="/checkout" element={<PrivateRoute element={<Checkout />} />} />
          <Route path="/delivery-map" element={<PrivateRoute element={<DeliveryMap location={{ lat: 51.505, lng: -0.09 }} />} />} />
          <Route path="/discount-code" element={<PrivateRoute element={<DiscountCode />} />} />
          <Route path="/geo-location" element={<PrivateRoute element={<GeoLocation />} />} />
          <Route path="/live-chat" element={<PrivateRoute element={<LiveChat />} />} />
          <Route path="/loyalty-rewards" element={<PrivateRoute element={<LoyaltyRewards />} />} />
          <Route path="/order-customization" element={<PrivateRoute element={<OrderCustomization />} />} />
          <Route path="/order-history" element={<PrivateRoute element={<OrderHistory />} />} />
          <Route path="/order-tracking" element={<PrivateRoute element={<OrderTracking orderId="12345" />} />} />
          <Route path="/personalized-recommendations" element={<PrivateRoute element={<PersonalizedRecommendations />} />} />
          <Route path="/dynamic-pricing" element={<PrivateRoute element={<DynamicPricing productId="product1" />} />} />
          <Route path="/" element={<div>Welcome to Food Delivery App</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
