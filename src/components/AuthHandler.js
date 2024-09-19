// src/components/AuthHandler.js
import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { auth } from '../firebase';

const AuthHandler = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Or a spinner/loading indicator
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthHandler;
