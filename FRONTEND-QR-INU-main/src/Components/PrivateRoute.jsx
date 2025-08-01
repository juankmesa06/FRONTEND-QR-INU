// src/Components/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // Verifica que exista un user válido con token
  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
