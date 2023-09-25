import Order from '../models/orderModel.js';
import Cart from '../models/cartModel.js';

const createOrder = async (req, res) => {
  try {
    const userId = req.userId;

    const cart = await Cart.findOne({ user: userId }).populate('items.food');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        succeded: false,
        message: 'Cart is empty',
      });
    }

    const orderItems = cart.items.map((item) => ({
      foodName: item.food.name,
      quantity: item.quantity,
      price: item.food.price,
    }));

    const newOrder = new Order({
      user: userId,
      items: orderItems,
      finalAmount: req.body.finalAmount,
      couponCode: req.body.couponCode,
    });

    await newOrder.save();

    cart.items = [];
    await cart.save();

    res.status(201).json({
      succeded: true,
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      message: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await Order.find({ user: userId }).populate(
      'user',
      'firstName lastName email'
    );

    res.status(200).json({
      succeded: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      message: error.message,
    });
  }
};

export { createOrder, getAllOrders };
