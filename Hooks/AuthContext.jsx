import React from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosPublic, axiosPrivate } from '../src/api/axios';

export const AuthContext = React.createContext();

export const AuthStorage = ({ children }) => {
  const [isLogged, setIsLogged] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsLogged(true);
      } catch (error) {
        console.error('Erro ao parsear user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (matricula, password) => {
    try {
      const response = await axiosPublic.post('/Login', {
        Matricula: parseInt(matricula),
        Password: password
      });

      const data = response.data;
      
      localStorage.setItem('token', data.Token);
      localStorage.setItem('user', JSON.stringify({
        p_nome: data.P_nome,
        sobrenome: data.Sobrenome,
        matricula: matricula
      }));

      setUser({
        p_nome: data.P_nome,
        sobrenome: data.Sobrenome,
        matricula: matricula
      });
      setIsLogged(true);
      
      console.log('Usuário logado:', data.P_nome);
      navigate('/');

    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  };

  const logout = () => {
    console.log('Usuário deslogado');
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    setUser(null);
    setIsLogged(false);
    
    navigate('/');
  };

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const authFetch = async (url, options = {}) => {
    // Usar axiosPrivate que já adiciona o token automaticamente
    return axiosPrivate(url, options);
  };

  return (
    <AuthContext.Provider value={{ 
      isLogged, 
      user, 
      login, 
      logout, 
      getToken,
      authFetch,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  )
  };

export default AuthStorage;