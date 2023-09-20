import { Typography } from '@mui/material';
import { Divider } from '@mui/material';
import CouponCard from '../components/coupon/couponCard';
import { useCoupon } from '../context/coupon/CouponContext';

const CouponScreen = () => {
  const { coupons } = useCoupon();
  console.log('coupons', coupons);
  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ mt: 1, ml: 6.5 }}>
        Kupon Listesi
      </Typography>
      <Divider sx={{ mt: 2, mb: 5, ml: 6.5, mr: 10 }} />

      {coupons.map((coupon) => (
        <CouponCard key={coupon._id} coupon={coupon} />
      ))}
    </>
  );
};
export default CouponScreen;
