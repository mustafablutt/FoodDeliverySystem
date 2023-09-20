import Coupon from '../models/couponModel.js';

const createCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(201).json({
      succeeded: true,
      coupon,
    });
  } catch (error) {
    res.status(400).json({
      succeeded: false,
      message: error.message,
    });
  }
};

const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json({
      succeeded: true,
      coupons,
    });
  } catch (error) {
    res.status(500).json({
      succeeded: false,
      message: error.message,
    });
  }
};

export { createCoupon, getCoupons };
