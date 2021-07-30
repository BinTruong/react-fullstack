import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component }) => {
  const { token } = useSelector((state) => state.auth);
  const isLogin = !!token;
  if (!isLogin) {
    return <Navigate to="/login" />;
  }
  return <Component />;
};
export default ProtectedRoute;
ProtectedRoute.propTypes = {
  component: PropTypes.any
};
