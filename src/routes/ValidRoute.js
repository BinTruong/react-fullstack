import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const ValidRoute = ({ component: Component }) => {
  const { token } = useSelector((state) => state.auth);
  const isPageValid = !!token;
  if (isPageValid) {
    return <Navigate to="/home" />;
  }
  return <Component />;
};
export default ValidRoute;
ValidRoute.propTypes = {
  component: PropTypes.any
};
