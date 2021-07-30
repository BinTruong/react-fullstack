import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, roles }) => {
  const { role } = useSelector((state) => state.auth);
  const isPermission = roles.includes(role);
  if (!isPermission) {
    return <Navigate to="/404" />;
  }
  return <Component />;
};
export default PrivateRoute;
PrivateRoute.propTypes = {
  component: PropTypes.any,
  roles: PropTypes.array
};
