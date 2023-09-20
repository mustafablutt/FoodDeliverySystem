import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TextField } from '@mui/material';
import AddRating from './AddRating';
import { useComment } from '../../context/comment/CommentContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth/AuthContext';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddComment({ food }) {
  const [open, setOpen] = React.useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const { addComment } = useComment();

  const [commentValue, setCommentValue] = React.useState('');
  const [ratingValue, setRatingValue] = React.useState(2);

  const handleRatingChange = (newValue) => {
    setRatingValue(newValue);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleCommentSubmit = async () => {
    if (!user) {
      alert('Yemeği değerlendirmeniz için giriş yapmalısınız.');

      navigate('/login-register');

      return;
    }

    const response = await addComment(food._id, commentValue, ratingValue);

    console.log('response: ', response);

    if (response && response.succeeded) {
      setSnackbarMessage('Yemek Başıryla Değerlendirildi.');
      setAlertSeverity('success');
    } else {
      setAlertSeverity('error');
      setSnackbarMessage(response ? response.message : 'Bir hata oluştu.');
    }
    setOpenSnackbar(true);
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        style={{
          backgroundColor: '#FF4C01',
          '&:hover': {
            backgroundColor: 'red',
          },
        }}
      >
        Yemeği Değerlendir
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ürünü Değerlendir</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Topluluk kurallarına uygun yemeği değerlendirip yorum
            yapabilirsiniz.
          </DialogContentText>

          <AddRating onRatingChange={handleRatingChange} />

          <TextField
            autoFocus
            onChange={(e) => setCommentValue(e.target.value)}
            margin="dense"
            id="name"
            label="Yorum Yap"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Kapat</Button>
          <Button onClick={handleCommentSubmit}>Değerlendir</Button>
        </DialogActions>
      </Dialog>
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
    </div>
  );
}
