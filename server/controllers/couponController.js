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

const validateCoupon = async (couponCode) => {
  const coupon = await Coupon.findOne({ code: couponCode });

  if (!coupon) return { succeeded: false, message: 'Coupon does not exist' };

  if (!coupon.isActive)
    return { succeeded: false, message: 'Coupon is not active' };

  const now = new Date();
  if (coupon.validUntil && coupon.validUntil < now)
    return { succeeded: false, message: 'Coupon has expired' };

  return { succeeded: true, coupon };
};

export { createCoupon, getCoupons, validateCoupon };
