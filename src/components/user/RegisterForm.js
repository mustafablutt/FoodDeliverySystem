import * as React from 'react';
import { useState } from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../../context/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
const defaultTheme = createTheme();

export default function RegisterForm() {
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setInputs((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      email: inputs.email,
      password: inputs.password,
      firstName: inputs.firstName,
      lastName: inputs.lastName,
    };

    const response = await register(userData);

    if (response && response.succeeded) {
      setAlertSeverity('success');
      setSnackbarMessage('Kayıt Başarılı, Lütfen Giriş Yapınız.');
      setOpenSnackbar(true);
    } else if (response && response.message) {
      setAlertSeverity('error');
      setSnackbarMessage(response.message);
      setOpenSnackbar(true);
    } else {
      setAlertSeverity('error');
      setSnackbarMessage('Lütfen bütün input alanlarını doldurun.');
      setOpenSnackbar(true);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              name="firstName"
              fullWidth
              margin="normal"
              type="text"
              id="outlined-basic"
              label="İsim"
              variant="outlined"
              value={inputs.firstName}
              onChange={handleChange}
              color="warning"
            />
            <TextField
              name="lastName"
              fullWidth
              margin="normal"
              type="text"
              id="outlined-basic"
              label="Soy İsim"
              variant="outlined"
              value={inputs.lastName}
              onChange={handleChange}
              color="warning"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={inputs.email}
              onChange={handleChange}
              color="warning"
            />
            <TextField
              margin="normal"
              color="warning"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={inputs.password}
              onChange={handleChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#f44336',
                '&:hover': {
                  backgroundColor: 'red',
                },
              }}
            >
              Üye Ol
            </Button>
          </Box>
        </Box>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={alertSeverity}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
