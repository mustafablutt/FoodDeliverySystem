import Cart from '../models/cartModel.js';

const getCart = async (req, res) => {
  try {
    const userId = req.userId;
    const cart = await Cart.findOne({ user: userId }).populate('items.food');
    res.status(200).json({
      succeded: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      message: error.message,
    });
  }
};

const addItemToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { foodId, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ food: foodId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (i) => i.food.toString() === foodId
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ food: foodId, quantity });
      }
    }

    await cart.save();
    res.status(201).json({
      succeded: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      message: error.message,
    });
  }
};

const removeByQuantity = async (req, res) => {
  try {
    const userId = req.userId;
    const { foodId } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        succeded: false,
        message: 'Cart not found',
      });
    }

    const itemIndex = cart.items.findIndex((i) => i._id.toString() === foodId);

    if (itemIndex === -1) {
      return res.status(404).json({
        succeded: false,
        message: 'Item not found in cart',
      });
    }

    cart.items[itemIndex].quantity -= 1;

    if (cart.items[itemIndex].quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    }

    await cart.save();
    res.status(200).json({
      succeded: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      message: error.message,
    });
  }
};

const removeItemFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { foodId } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        succeded: false,
        message: 'Cart not found',
      });
    }

    const itemIndex = cart.items.findIndex((i) => i.food.toString() === foodId);

    if (itemIndex === -1) {
      return res.status(404).json({
        succeded: false,
        message: 'Item not found in cart',
      });
    }

    cart.items.splice(itemIndex, 1);

    await cart.save();
    res.status(200).json({
      succeded: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      message: error.message,
    });
  }
};

export { getCart, addItemToCart, removeByQuantity, removeItemFromCart };
