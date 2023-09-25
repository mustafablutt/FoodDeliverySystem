import { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from '../Auth/AuthContext';

export const OrderContext = createContext();

export const useOrder = () => {
  return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  const apiEndpoint = 'http://localhost:5000';
  const token = localStorage.getItem('authToken');

  const clearOrders = () => {
    setOrders([]);
  };

  const createOrder = async (finalAmount, couponCode) => {
    if (!user) {
      const event = new CustomEvent('orderCreationFailedNoAuth');
      window.dispatchEvent(event);
      return false;
    }

    try {
      const response = await fetch(`${apiEndpoint}/createorder`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ finalAmount, couponCode }),
      });

      const data = await response.json();
      if (data.succeded) {
        getAllOrders();

        return true;
      }
      return false;
    } catch (error) {
      console.error('Error creating an order:', error);
      return false;
    }
  };

  const getAllOrders = async () => {
    try {
      const response = await fetch(`${apiEndpoint}/getorders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.succeded) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  useEffect(() => {
    if (user) {
      getAllOrders();
    }
  }, [user]);

  return (
    <OrderContext.Provider
      value={{ orders, createOrder, getAllOrders, clearOrders }}
    >
      {children}
    </OrderContext.Provider>
  );
};
