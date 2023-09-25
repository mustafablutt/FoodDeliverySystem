import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from '../Auth/AuthContext';

export const CartContext = createContext();

export const useFoodCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [couponInfo, setCouponInfo] = useState({
    isCouponApplied: false,
    data: null,
  });

  const { user } = useAuth();

  const apiEndpoint = 'http://localhost:5000';

  const token = localStorage.getItem('authToken');

  const getTotalItemCount = () => {
    return cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;
  };

  const getTotalPrice = () => {
    return (
      cart?.items.reduce(
        (acc, item) => acc + item.food.price * item.quantity,
        0
      ) || 0
    );
  };

  const clearCart = () => {
    setCart({ items: [] });
  };

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
        setCart({ items: data.cart.items });
        getCart();
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

  const applyCoupon = async (couponCode, totalPrice) => {
    try {
      const response = await fetch(`${apiEndpoint}/applycoupon`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ couponCode, totalPrice }),
      });

      const data = await response.json();
      if (data.succeded) {
        console.log('Coupon applied:', data);
        alert('Kupon başarıyla uygulandı!');
        setCouponInfo({ isCouponApplied: true, data });
      } else {
        console.log('Coupon not applied:', data);
        alert('Kupon uygulanamadı: ' + data.message);
        setCouponInfo({ isCouponApplied: false, data: null });
      }
    } catch (error) {
      console.log('Error applying coupon:', error);
      alert('Bir hata oluştu.');
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
        getTotalPrice,
        getTotalItemCount,
        clearCart,
        applyCoupon,
        couponInfo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
