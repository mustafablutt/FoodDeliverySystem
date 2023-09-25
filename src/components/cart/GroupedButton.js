import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import { useFoodCart } from '../../context/Cart/CartContext';

const GroupedButton = ({ id }) => {
  const { cart, getCart, removeItemByQuantity, addToCart } = useFoodCart();

  const findFood = cart?.items.find((item) => item.food._id === id);

  const [count, setCount] = useState(findFood?.quantity || 1);

  useEffect(() => {
    if (findFood) {
      setCount(findFood.quantity);
    }
  }, [findFood]);

  const IncNum = async () => {
    if (findFood) {
      await addToCart(id);
      await getCart();
    }
  };

  const DecNum = async () => {
    if (count > 1) {
      setCount(count - 1);
      await removeItemByQuantity(findFood._id);
      getCart();
    } else {
      setCount(1);
      alert('min limit reached');
    }
  };

  return (
    <ButtonGroup size="small" aria-label="small outlined button group">
      <Button onClick={DecNum}>-</Button>
      <Button sx={{ pointerEvents: 'none', color: 'inherit' }}>{count}</Button>
      <Button onClick={IncNum} sx={{ minWidth: '32px' }}>
        +
      </Button>
    </ButtonGroup>
  );
};

export default GroupedButton;
