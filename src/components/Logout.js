// src/components/Logout.js
import React from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Adjust the path according to your setup

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login or desired route upon successful logout
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Logout
    </button>
  );
};

export default Logout;
