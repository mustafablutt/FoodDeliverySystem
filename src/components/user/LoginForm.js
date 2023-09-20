import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useAuth } from '../../context/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
const defaultTheme = createTheme();

export default function LoginForm() {
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const { login } = useAuth();

  const handleChange = (event) => {
    setInputs((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const credentials = {
      email: inputs.email,
      password: inputs.password,
    };

    const response = await login(credentials);

    if (response && response.token) {
      setAlertSeverity('success');
      setSnackbarMessage('Giriş başarılı! Ana Sayfaya yönlendiriliyorsunuz.');
      setOpenSnackbar(true);

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else if (response && response.error) {
      setAlertSeverity('error');
      setSnackbarMessage(response.error);
      setOpenSnackbar(true);
    } else {
      setAlertSeverity('error');
      setSnackbarMessage('Bilinmeyen bir hata oluştu.');
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
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={inputs.password}
              onChange={handleChange}
              color="warning"
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
              Giriş Yap
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
