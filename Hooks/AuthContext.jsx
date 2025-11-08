import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = React.createContext();

export const AuthStorage = ({ children }) => {
  const [isLogged, setIsLogged] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();

  const login = (username, password) => {
    console.log('Usuário logado:', username);
    setUser({ name: username, email: `${username}@inpasa.com` });
    setIsLogged(true);
    navigate('/');
  };

  const logout = () => {
    console.log('Usuário deslogado');
    setUser(null);
    setIsLogged(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isLogged, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};