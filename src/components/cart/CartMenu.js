import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Link } from 'react-router-dom';
import formatCurrency from 'format-currency';

import { Typography } from '@mui/material';
import { useFoodCart } from '../../context/CartContext';
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(0.5),
    minWidth: 250,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    padding: '0px 0px',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '0px 0px',
    },
    '& .MuiMenuItem-root': {
      padding: '4px 16px',
      height: 45,
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function CartMenu() {
  const { cart, getCart, removeItemByQuantity, getTotalItemCount } =
    useFoodCart();

  const itemCount = cart?.items?.length || 0;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  let opts = { format: '%v %s', symbol: 'TL' };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <ShoppingCartIcon
        onClick={handleClick}
        sx={{
          color: 'white',

          cursor: 'pointer',
        }}
      />
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Typography variant="span" gutterBottom>
          {cart?.items.length !== 0 ? (
            <div style={{ padding: '6px 16px 20px' }}>
              Sepetim {getTotalItemCount()} Ürün
            </div>
          ) : (
            <div style={{ padding: '8px 16px 16px', textAlign: 'center' }}>
              Sepetinde ürün yok
            </div>
          )}
        </Typography>
        {itemCount !== 0 &&
          cart?.items.map((item, index) => (
            <React.Fragment key={index}>
              <MenuItem onClick={handleClose} disableRipple>
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={async () => {
                        await removeItemByQuantity(item._id);

                        getCart();
                      }}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar src={item.food.imageUrl} />
                  </ListItemAvatar>

                  <ListItemText
                    primary={item.food.name}
                    secondary={`Adet: ${item.quantity}  -  ${formatCurrency(
                      `${item.food.price * item.quantity}`,
                      opts
                    )}`}
                    sx={{ pr: 8 }}
                  />
                </ListItem>
              </MenuItem>
              {index !== cart?.items.length - 1 && <Divider />}
            </React.Fragment>
          ))}

        {cart?.items.length !== 0 && (
          <>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem
              onClick={handleClose}
              disableRipple
              disableTouchRipple
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                '&:hover': { backgroundColor: 'transparent' },
              }}
            >
              <Link to="/cart-detail">
                <div style={{ marginBottom: 6 }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#FF4C01',
                      '&:hover': {
                        backgroundColor: 'red',
                      },
                    }}
                  >
                    Sepete Git
                  </Button>
                </div>
              </Link>
            </MenuItem>
          </>
        )}
      </StyledMenu>
    </div>
  );
}
