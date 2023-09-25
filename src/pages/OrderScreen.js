import React, { useState, useEffect } from 'react';
import { useOrder } from '../context/Order/OrderContext';
import OrderCard from '../components/order/OrderCard';
import {
  Typography,
  Divider,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';

const OrderScreen = () => {
  const { orders } = useOrder();
  const user = orders[0]?.user;

  // Eğer siparişler varsa, başlangıçta son siparişi seçili yap
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(
    orders.length > 0 ? orders.length - 1 : null
  );

  const handleSelectChange = (event) => {
    setSelectedOrderIndex(parseInt(event.target.value));
  };

  useEffect(() => {
    // Siparişler güncellendiğinde, son siparişi seçili yap
    if (orders.length > 0) {
      setSelectedOrderIndex(orders.length - 1);
    }
  }, [orders]);

  return (
    <div>
      <Typography variant="h6" gutterBottom sx={{ mt: 1 }}>
        {user?.firstName} {user?.lastName} Geçmiş Siparişleriniz
      </Typography>
      <Divider sx={{ mt: 2, mb: 5, ml: 6.5, mr: 10 }} />
      <FormControl sx={{ m: 1, minWidth: 300 }} size="large">
        <Select
          value={selectedOrderIndex !== null ? selectedOrderIndex : ''}
          onChange={handleSelectChange}
          displayEmpty
          variant="outlined"
          sx={{ width: 240 }}
          color="error"
        >
          <MenuItem value="" disabled>
            Siparişleriniz...
          </MenuItem>
          {orders.map((order, index) => (
            <MenuItem value={index} key={index}>
              Sipariş No: {order._id} - {order.finalAmount} TL
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedOrderIndex !== null && (
        <OrderCard order={orders[selectedOrderIndex]} />
      )}
    </div>
  );
};

export default OrderScreen;
