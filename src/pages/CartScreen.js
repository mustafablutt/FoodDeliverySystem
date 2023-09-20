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

const CartScreen = () => {
  const { cart, getCart, removeByQuantity, getTotalItemCount } = useFoodCart();
  const [coupon, setCoupon] = useState('');
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setCoupon(e.target.value);
  };

  /*  const handleApplyCoupon = () => {
    applyCoupon(coupon);
    
  }; */

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
          <Grid container spacing={60} sx={{ ml: -52, mr: 10 }}>
            <Grid item xs={12} sm={6}>
              <CartScreenDetail />
            </Grid>
            <Grid item xs={12} sm={6}>
              <br />
              <br />
              <Button
                variant="outlined"
                onClick={handleClickOpen}
                sx={{ minWidth: '275px' }}
              >
                İNDİRİM Kuponu Ekle
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Kupon Ekle</DialogTitle>
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
                    value={coupon}
                    onChange={handleChange}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Kapat</Button>
                  <Button /* onClick={handleApplyCoupon} */>Uygula</Button>
                </DialogActions>
              </Dialog>
              <br />
              <br />

              <Button variant="contained" sx={{ minWidth: '275px' }}>
                Sepetİ Onayla{' '}
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default CartScreen;
