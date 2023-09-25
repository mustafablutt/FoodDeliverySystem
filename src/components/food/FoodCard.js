import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import { useEffect, useState } from 'react';
import { Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useFoodCart } from '../../context/Cart/CartContext';
import { useFood } from '../../context/Food/FoodContext';

import formatCurrency from 'format-currency';

export default function BasicCard(props) {
  const navigate = useNavigate();
  const { getFoodById } = useFood();

  const [foodStats, setFoodStats] = useState(null);

  const handleCardClick = async () => {
    await getFoodById(props.id);
    navigate(`/food/${props.id}`);
  };

  const { addToCart } = useFoodCart();
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [severity, setSeverity] = useState('');

  let opts = { format: '%v %s', symbol: 'TL' };

  useEffect(() => {
    const handleItemAdded = (e) => {
      if (e.detail === props.id) {
        setOpenAlert(true);
        setSeverity('success');
        setAlertMessage(`${props.name} sepetinize eklendi!`);
      }
    };

    const handleAddFailedNoAuth = () => {
      setOpenAlert(true);
      setAlertMessage(
        'Lütfen sepete ürün eklemek için giriş yapınız. Login Ekranına yönlendiriliyorsunuz.'
      );
      setSeverity('error');
      setTimeout(() => navigate('/login-register'), 2000);
    };

    window.addEventListener('itemAddedToCart', handleItemAdded);
    window.addEventListener('itemAddFailedNoAuth', handleAddFailedNoAuth);

    return () => {
      window.removeEventListener('itemAddedToCart', handleItemAdded);
      window.removeEventListener('itemAddFailedNoAuth', handleAddFailedNoAuth);
    };
  }, [props.id, navigate]);

  const handleCloseAlert = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const handleAddToCart = () => {
    addToCart(props.id, 1);
  };

  return (
    <Card sx={{ width: 350, mt: 3, ml: { xs: 0, md: 10 } }}>
      <div>
        <Typography level="title-lg">{props.name}</Typography>
        <Typography level="body-sm">{props.description}</Typography>
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img
          src={props.imageUrl}
          loading="lazy"
          alt=""
          onClick={handleCardClick}
        />
      </AspectRatio>
      <CardContent orientation="horizontal">
        <div>
          <Typography fontSize="lg" fontWeight="lg">
            {formatCurrency(`${props.price}`, opts)}
          </Typography>
          <div style={{ display: 'flex' }}>
            <Rating
              name="half-rating-read"
              size="small"
              value={props.avgRating || 0}
              precision={0.1}
              readOnly
            />
            <p>{`(${props.commentCount || 0} Yorum)`}</p>
          </div>
        </div>
        <Button
          variant="solid"
          size="md"
          color="primary"
          onClick={handleAddToCart}
          aria-label="Explore Bahamas Islands"
          sx={{
            ml: 'auto',
            alignSelf: 'center',
            fontWeight: 600,
            backgroundColor: '#FF4C01',
            '&:hover': {
              backgroundColor: 'red',
            },
          }}
        >
          Sepete Ekle
        </Button>

        <Snackbar
          open={openAlert}
          autoHideDuration={2000}
          onClose={handleCloseAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity={severity}
            sx={{ width: '100%' }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
}
