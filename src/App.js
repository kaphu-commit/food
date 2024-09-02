import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min'; 

// Import components
import Login from './components/Login';
import SignUp from './components/SignUp';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import DeliveryMapPage from './components/DeliveryMapPage'; 
import DiscountCode from './components/DiscountCode';
import GeoLocation from './components/GeoLocation';
import LiveChat from './components/LiveChat';
import LoyaltyRewards from './components/LoyaltyRewards';
import OrderCustomization from './components/OrderCustomization';
import OrderHistory from './components/OrderHistory';
import OrderTracking from './components/OrderTracking';
import PersonalizedRecommendations from './components/PersonalizedRecommendations';
import DynamicPricing from './components/DynamicPricing';
import ProductPage from './components/ProductPage'; 
import HomePage from './components/HomePage';
import Logout from './components/Logout'; // Import the Logout component

const App = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
          <div className="container">
            <Link className="navbar-brand" to="/">Food Delivery App</Link>
            <button className="btn btn-primary" onClick={toggleMenu}>
              {menuOpen ? 'Close Menu' : 'Open Menu'}
            </button>
          </div>
        </nav>

        {/* Conditional Menu */}
        {menuOpen && (
          <div className="sidebar-menu">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/product-page">Product Page</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/signup">Sign Up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/cart">Cart</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/checkout">Checkout</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/delivery-map">Delivery Map</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/discount-code">Discount Code</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/geo-location">Geo Location</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/live-chat">Live Chat</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/loyalty-rewards">Loyalty Rewards</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/order-customization">Order Customization</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/order-history">Order History</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/order-tracking/12345">Order Tracking</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/personalized-recommendations">Personalized Recommendations</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/dynamic-pricing/product1">Dynamic Pricing</Link>
              </li>
              {/* Add Logout button */}
              <li className="nav-item">
                <Logout /> {/* Logout button */}
              </li>
            </ul>
          </div>
        )}

        {/* Main Content */}
        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/delivery-map" element={<DeliveryMapPage />} />
            <Route path="/discount-code" element={<DiscountCode />} />
            <Route path="/geo-location" element={<GeoLocation />} />
            <Route path="/live-chat" element={<LiveChat />} />
            <Route path="/loyalty-rewards" element={<LoyaltyRewards />} />
            <Route path="/order-customization" element={<OrderCustomization />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
            <Route path="/personalized-recommendations" element={<PersonalizedRecommendations />} />
            <Route path="/dynamic-pricing/:productId" element={<DynamicPricing />} />
            <Route path="/product-page" element={<ProductPage />} />
            <Route path="*" element={<div className="text-center"><h2>404 - Page Not Found</h2></div>} />
          </Routes>
        </main>
        
        {/* Custom Styles */}
        <style jsx>{`
          .sidebar-menu {
            position: fixed;
            top: 0;
            left: 0;
            width: 250px;
            height: 100%;
            background-color: #f8f9fa; /* Menu background color */
            box-shadow: 2px 0 5px rgba(0,0,0,0.1);
            z-index: 1000;
            padding: 15px;
            overflow-y: auto; /* Enable vertical scrolling */
            transition: transform 0.3s ease;
          }
          
          .sidebar-menu ul {
            list-style: none;
            padding: 0;
          }

          .nav-link {
            color: #333; /* Default link color */
            text-decoration: none;
          }

          .nav-link:hover {
            color: #007bff; /* Link color on hover */
          }

          .sidebar-menu {
            transform: translateX(${menuOpen ? '0' : '-100%'});
          }

          .btn-primary {
            background-color: #007bff; /* Button background color */
            border: none;
          }

          .btn-primary:hover {
            background-color: #0056b3; /* Button background color on hover */
          }
        `}</style>
      </div>
    </Router>
  );
};

export default App;
