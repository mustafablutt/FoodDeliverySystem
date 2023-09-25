import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/Auth/AuthContext';

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
    minWidth: 180,

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
      height: 35,
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

export default function StyledProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user, logout } = useAuth();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        startIcon={
          <PersonOutlineOutlinedIcon
            sx={{ fontSize: 'large', fontWeight: 'bold' }}
          />
        }
        sx={{
          color: 'white',
          backgroundColor: '#f44336',
          '&:hover': {
            backgroundColor: 'red',
          },
          textTransform: 'none',
          fontWeight: 'bold',
        }}
      >
        {user ? 'Profilim' : 'Giriş yap'}
      </Button>

      {user ? (
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <Typography variant="span" gutterBottom sx={{ fontWeight: 'bold' }}>
            <div style={{ padding: '4px 16px', fontWeight: 'bold' }}>
              {user?.firstName} {user?.lastName} <br />
            </div>
          </Typography>
          <Divider sx={{ my: 0.5 }} />
          <Link
            to="/coupons"
            style={{
              cursor: 'pointer',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <MenuItem onClick={handleClose} disableRipple>
              <DiscountOutlinedIcon />
              İndirim Kuponlarım
            </MenuItem>
          </Link>
          <Link
            to="/orders"
            style={{
              cursor: 'pointer',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <MenuItem onClick={handleClose} disableRipple>
              <ShoppingCartIcon />
              Geçmiş Siparişlerim
            </MenuItem>
          </Link>

          <MenuItem
            onClick={() => {
              handleClose();
              logout();
            }}
            disableRipple
          >
            <LogoutOutlinedIcon />
            Çıkış yap
          </MenuItem>
        </StyledMenu>
      ) : (
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <Link
            to="/login-register"
            style={{
              cursor: 'pointer',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{
                mt: 2,
                ml: 4.8,
                backgroundColor: '#f44336',

                '&:hover': {
                  backgroundColor: 'red',
                },
              }}
            >
              Giriş Yap
            </Button>
          </Link>
          <br />

          <Link
            to="/login-register?form=register"
            style={{
              cursor: 'pointer',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Button
              onClick={handleClose}
              variant="outlined"
              color="warning"
              sx={{
                mt: 2,
                ml: 4.8,
                mb: 2,
                width: 104,
              }}
            >
              Üye Ol
            </Button>
          </Link>
        </StyledMenu>
      )}
    </div>
  );
}
