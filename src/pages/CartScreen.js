import { Grid, Typography } from '@mui/material';
import { Divider } from '@mui/material';
import CartScreenDetail from '../components/cart/CartScreenDetail';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useFoodCart } from '../context/CartContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CartSummary from '../components/cart/CartSummary';

const CartScreen = () => {
  const { cart, getTotalPrice, getTotalItemCount, applyCoupon, couponInfo } =
    useFoodCart();
  const [couponCode, setCouponCode] = useState('');
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setCouponCode(e.target.value);
  };

  useEffect(() => {
    const totalPrice = getTotalPrice();
    console.log('totalPrice', totalPrice);
  }, [cart, getTotalPrice]);

  const handleApplyCoupon = () => {
    if (couponInfo && couponInfo.isCouponApplied) {
      alert('Zaten bir kupon kullandınız.');

      return;
    }
    applyCoupon(couponCode, getTotalPrice());
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {cart?.items.length !== 0 && (
        <>
          <Typography variant="h6" gutterBottom sx={{ mt: 1, ml: 6.5 }}>
            Sepetim ({getTotalItemCount()} ürün)
          </Typography>
          <Divider sx={{ mt: 2, mb: 5, ml: 6.5, mr: 10 }} />
          <Grid container spacing={60} sx={{ ml: -40, mr: 10 }}>
            <Grid item xs={6} sm={6}>
              <CartScreenDetail />
            </Grid>
            <Grid item xs={6} sm={6}>
              <CartSummary />

              <br />
              <br />
              <div style={{ marginRight: 500 }}>
                <Button
                  variant="outlined"
                  onClick={handleClickOpen}
                  sx={{ minWidth: '275px' }}
                >
                  İNDİRİM Kuponu Ekle
                </Button>

                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Kupon Kullan</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      İndirim kuponlarım'dan sana özel tanımlı kuponları
                      görebilirsin.
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Kupon Kodun"
                      type="text"
                      fullWidth
                      variant="standard"
                      value={couponCode}
                      onChange={handleChange}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Kapat</Button>
                    <Button onClick={handleApplyCoupon}>Uygula</Button>
                  </DialogActions>
                </Dialog>
                <br />
                <br />

                <Button
                  variant="contained"
                  sx={{
                    minWidth: '275px',
                    backgroundColor: '#FF4C01',
                    '&:hover': {
                      backgroundColor: 'red',
                    },
                  }}
                >
                  Sepetİ Onayla{' '}
                </Button>
              </div>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default CartScreen;
