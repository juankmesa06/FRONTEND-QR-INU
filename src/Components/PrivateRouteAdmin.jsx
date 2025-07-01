// src/Components/PrivateRouteAdmin.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRouteAdmin = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user || !user.token) {
    return <Navigate to="/login" />;
  }

  const roles = user.user?.roles || [];

  return roles.includes('admin') ? children : <Navigate to="/login" />;
};

export default PrivateRouteAdmin;
