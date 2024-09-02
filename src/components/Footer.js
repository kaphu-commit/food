// components/Footer.js
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5 className="text-center text-md-start mb-4 mb-md-0">Contact Us</h5>
            <p><strong>Email:</strong> <a href="mailto:info@example.com" className="text-white text-decoration-none">kap@.com</a></p>
            <p><strong>Phone:</strong> <a href="tel:+1234567890" className="text-white text-decoration-none">+1-234-567-890</a></p>
          </div>
          <div className="col-md-6">
            <h5 className="text-center text-md-end mb-4 mb-md-0">Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-md-end">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <FaFacebookF size={30} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <FaTwitter size={30} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <FaInstagram size={30} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
