import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import authMiddleware from './middlewares/authMiddleware.js';
import {
  addComment,
  getComments,
  getFoodStats,
} from './controllers/commentController.js';
import { createUser, loginUser } from './controllers/userController.js';
import {
  addFood,
  getAllFoods,
  getFoodById,
} from './controllers/foodController.js';
import {
  getCart,
  addItemToCart,
  removeByQuantity,
  removeItemFromCart,
} from './controllers/cartController.js';
import cors from 'cors';

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

//user routes
app.post('/register', createUser);
app.post('/login', loginUser);

//food routes
app.post('/addfood', addFood);
app.get('/getallfoods', getAllFoods);
app.get('/getfoodbyid/:id', getFoodById);

//cart routes

app.get('/getcart', authMiddleware, getCart);
app.post('/addtocart', authMiddleware, addItemToCart);
app.post('/removebyquantity', authMiddleware, removeByQuantity);
app.post('/removeitemfromcart', authMiddleware, removeItemFromCart);

//comment routes
app.post('/addcomment', authMiddleware, addComment);
app.get('/getcomments/:id', getComments);
app.get('/getfoodstats/:id', getFoodStats);

const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
