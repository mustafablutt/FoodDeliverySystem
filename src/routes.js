import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import ShowCard from './pages/FoodListScreen';
import AuthScreen from './pages/AuthScreen';
import CartScreen from './pages/CartScreen';
import { useFood } from './context/Food/FoodContext';
import FoodCardDetail from './pages/FoodCardDetail';
import CouponScreen from './pages/CouponScreen';
import OrderScreen from './pages/OrderScreen';

export const RouteList = () => {
  const { selectedFood } = useFood();

  return (
    <Routes>
      <Route path="/" element={<ShowCard />} />
      <Route path="/login-register" element={<AuthScreen />} />
      <Route path="/cart-detail" element={<CartScreen />} />
      <Route
        path="/food/:id"
        element={<FoodCardDetail food={selectedFood} />}
      />
      <Route path="/coupons" element={<CouponScreen />} />
      <Route path="/orders" element={<OrderScreen />} />
    </Routes>
  );
};
