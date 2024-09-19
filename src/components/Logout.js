// src/components/Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <button className="btn btn-danger" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
