import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/joy/Typography';

const labels = {
  0.5: '0.5',
  1: '1',
  1.5: '1.5',
  2: '2',
  2.5: '2.5',
  3: '3',
  3.5: '3.5',
  4: '4',
  4.5: '4.5',
  5: '5',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function AddRating({ onRatingChange }) {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  const handleValueChange = (event, newValue) => {
    setValue(newValue);
    onRatingChange(newValue);
  };

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
        marginTop: '20px',
        marginBottom: '-10px',
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={handleValueChange}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}
