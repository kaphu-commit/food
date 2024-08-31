import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { auth } from '../firebase';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  return isAuthenticated ? Component : <Navigate to="/login" />;
};

export default PrivateRoute;
