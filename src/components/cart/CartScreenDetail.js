import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import formatCurrency from 'format-currency';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import IconButton from '@mui/material/IconButton';

import { useFoodCart } from '../../context/CartContext';
import GroupedButton from './GroupedButton';

export default function CartScreenDetail() {
  const { cart, removeAllItemFromCart } = useFoodCart();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  let opts = { format: '%v %s', symbol: 'TL' };

  return (
    <>
      {cart?.items.length !== 0 &&
        cart?.items.map((item, index) => (
          <Card
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              marginBottom: '20px',
              boxShadow: '0px 0px 2px 1px rgba(0,0,0,0.1)',
              borderRadius: '8px',
              overflow: 'hidden',
              width: isMobile ? '100%' : 930,
              height: isMobile ? 'auto' : 130,
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: isMobile ? '100%' : 130,
                height: isMobile ? 200 : 130,
              }}
              image={item.food.imageUrl}
              alt="image"
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography
                  component="div"
                  variant="h5"
                  sx={{
                    maxWidth: '250px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',

                    mb: 1,
                  }}
                >
                  {item.food.name}
                </Typography>

                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '250px', // Bu değeri ihtiyaca göre ayarlayabilirsiniz
                  }}
                >
                  {item.food.description.length > 50
                    ? item.food.description.substring(0, 47) + '...'
                    : item.food.description}
                </Typography>
              </CardContent>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                pl: 1,
                pb: isMobile ? 2 : 1,
                justifyContent: 'center',
                paddingLeft: 10,
              }}
            >
              <GroupedButton id={item.food._id} />
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                pl: 1,
                pb: isMobile ? 2 : 1,
                justifyContent: 'center',
                paddingLeft: 10,
              }}
            >
              <Typography
                variant="subtitle1"
                color="primary"
                component="div"
                noWrap
              >
                {formatCurrency(`${item.food.price * item.quantity}`, opts)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                pl: 1,
                pb: isMobile ? 2 : 1,
                justifyContent: 'center',
                paddingLeft: 10,
              }}
            >
              <IconButton edge="end" aria-label="delete">
                <DeleteOutlineOutlinedIcon
                  onClick={async () => {
                    await removeAllItemFromCart(item.food._id);
                  }}
                />
              </IconButton>
            </Box>
          </Card>
        ))}
    </>
  );
}
