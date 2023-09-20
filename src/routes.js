import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import ShowCard from './components/food/ShowCard';
import AuthScreen from './pages/AuthScreen';
import CartScreen from './pages/CartScreen';
import { useFood } from './context/FoodContext';
import FoodCardDetail from './pages/FoodCardDetail';
import CouponScreen from './pages/CouponScreen';

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
    </Routes>
  );
};
