import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const apiEndpoint = 'http://localhost:5000';

  const register = async (userData) => {
    try {
      const response = await axios.post(`${apiEndpoint}/register`, userData);

      if (response.data && response.data.succeeded) {
        return response.data;
      }
    } catch (error) {
      console.log('Register Error:', error.response.data);
      return error.response.data;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post(`${apiEndpoint}/login`, credentials);
      if (response.data && response.data.token) {
        setToken(response.data.token);
        setUser(response.data.user);
        setIsAuthenticated(true);

        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;
      }
    } catch (error) {
      return error.response.data;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login-register');

    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('authToken');
    const userFromStorage = localStorage.getItem('user');

    if (tokenFromStorage) {
      setToken(tokenFromStorage);
      setUser(JSON.parse(userFromStorage));

      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
