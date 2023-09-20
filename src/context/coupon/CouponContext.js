import { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';

export const CouponContext = createContext();

export const useCoupon = () => {
  return useContext(CouponContext);
};

export const CouponProvider = ({ children }) => {
  const [coupons, setCoupons] = useState([]);

  const apiEndpoint = 'http://localhost:5000';

  const getAllCoupons = async () => {
    try {
      const response = await axios.get(`${apiEndpoint}/getcoupons`);
      setCoupons(response.data.coupons);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCoupons();
  }, []);

  return (
    <CouponContext.Provider value={{ coupons, getAllCoupons }}>
      {children}
    </CouponContext.Provider>
  );
};
