import * as React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useFoodCart } from '../../context/Cart/CartContext';

export default function CartSummary() {
  const { couponInfo, getTotalPrice } = useFoodCart();

  return (
    <Card sx={{ maxWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Sipariş Özeti
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Sipariş Toplamı: {getTotalPrice()} TL
        </Typography>
        {couponInfo && couponInfo.data && couponInfo.data.succeded ? (
          <>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Kullanılan Kupon: {couponInfo.data?.coupon?.code || 'Bilinmiyor'}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              İndirim Miktarı: {couponInfo.data?.discountAmount || 0} TL
            </Typography>
            <Divider sx={{ my: 0.5 }} />
            <Typography
              sx={{ mb: 0, mt: 2, textAlign: 'center', fontWeight: 'bold' }}
              color="text.primary"
            >
              {couponInfo.data?.finalPrice || 0} TL
            </Typography>
          </>
        ) : (
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Kupon uygulanmadı.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
