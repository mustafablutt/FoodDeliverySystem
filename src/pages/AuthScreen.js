import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoginForm from '../components/user/LoginForm';
import RegisterForm from '../components/user/RegisterForm';
import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const AuthScreen = () => {
  const location = useLocation();
  const isRegisterForm =
    new URLSearchParams(location.search).get('form') === 'register';
  const [isLoginForm, setIsLoginForm] = useState(!isRegisterForm);

  const handleFormChange = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <Box
      display="flex"
      flexDirection={'row'}
      maxWidth={800}
      alignItems={'center'}
      justifyContent={'center'}
      margin={'auto'}
      marginTop={14}
      borderRadius={4}
      boxShadow={'2px 2px 10px #ccc'}
      sx={{ ':hover': { boxShadow: '3px 3px 11px #ccc' } }}
    >
      <Box
        display="flex"
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        padding={3}
        sx={{ width: '50%' }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginBottom: '10px',
          }}
        >
          <div
            style={{ width: '30%', height: '2px', backgroundColor: '#D9882D' }}
          ></div>
          <Typography
            variant="h6"
            style={{
              padding: '0 10px',
              fontWeight: 'bold',
              color: '#D9882D',
              textAlign: 'center',
            }}
          >
            {isLoginForm ? 'Giriş Yap' : 'Üye Ol'}
          </Typography>
          <div
            style={{ width: '30%', height: '2px', backgroundColor: '#D9882D' }}
          ></div>
        </div>
        {isLoginForm ? <LoginForm /> : <RegisterForm />}
        <Button
          sx={{ marginTop: 3, borderRadius: 1 }}
          color="warning"
          onClick={handleFormChange}
          fullWidth
        >
          {isLoginForm
            ? 'Bİr hesabın yok mu? Üye Ol'
            : 'Zaten bir hesabın var mı?'}
        </Button>
      </Box>
      <Box
        display="flex"
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        width="50%"
        height="100%"
        borderRadius="50%"
        overflow="hidden"
        marginTop={3}
        mr={5}
      >
        <img
          src="https://r.resimlink.com/06xWdv.jpg"
          alt="random"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
    </Box>
  );
};

export default AuthScreen;
