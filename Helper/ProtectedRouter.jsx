import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Hooks/AuthContext';

const ProtectedRouter = ({ children }) => {
  const { isLogged } = React.useContext(AuthContext);

  if (isLogged) {
    return children;
  }
  
  else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRouter;