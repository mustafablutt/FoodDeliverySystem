import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './Auth/AuthContext';

export const CartContext = createContext();

export const useFoodCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });

  const { user } = useAuth();

  const apiEndpoint = 'http://localhost:5000';

  const token = localStorage.getItem('authToken');

  const getTotalItemCount = () => {
    return cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;
  };

  const clearCart = () => {
    setCart({ items: [] });
  };

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    try {
      const response = await fetch(`${apiEndpoint}/getcart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.succeded) {
        setCart({ items: data.cart.items });
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const addToCart = async (foodId, quantity = 1) => {
    if (!user) {
      const event = new CustomEvent('itemAddFailedNoAuth');
      window.dispatchEvent(event);
      return;
    }

    try {
      const response = await fetch(`${apiEndpoint}/addtocart`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ foodId, quantity }),
      });

      const data = await response.json();
      if (data.succeded) {
        getCart();
        setCart({ items: data.cart.items });
        const event = new CustomEvent('itemAddedToCart', { detail: foodId });
        window.dispatchEvent(event);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const removeItemByQuantity = async (foodId) => {
    if (!user) {
      const event = new CustomEvent('itemRemoveFailedNoAuth');
      window.dispatchEvent(event);
      return;
    }

    try {
      const response = await fetch(`${apiEndpoint}/removebyquantity`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ foodId }),
      });

      const data = await response.json();

      if (data.succeded) {
        getCart();
        const event = new CustomEvent('itemQuantityReduced', {
          detail: foodId,
        });
        window.dispatchEvent(event);
      }
    } catch (error) {
      console.log('Error reducing item quantity in cart:', error);
    }
  };

  const removeAllItemFromCart = async (foodId) => {
    if (!user) {
      const event = new CustomEvent('itemRemoveFailedNoAuth');
      window.dispatchEvent(event);
      return;
    }

    try {
      const response = await fetch(`${apiEndpoint}/removeitemfromcart`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ foodId }),
      });

      const data = await response.json();
      if (data.succeded) {
        getCart();
        const event = new CustomEvent('itemRemovedFromCart', {
          detail: foodId,
        });
        window.dispatchEvent(event);
      }
    } catch (error) {
      console.log('Error removing item from cart:', error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        getCart,
        addToCart,
        removeItemByQuantity,
        removeAllItemFromCart,

        getTotalItemCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
