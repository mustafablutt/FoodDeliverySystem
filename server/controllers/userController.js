import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      succeeded: true,
      user,
    });
  } catch (error) {
    let errorMessage = error.message;

    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      errorMessage = 'Böyle bir kullanıcı zaten var.';
    }

    res.status(400).json({
      succeeded: false,
      message: errorMessage,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    let same = false;

    if (user) {
      same = await bcrypt.compare(password, user.password);
    } else {
      return res.status(401).json({
        succeded: false,
        error: 'Böyle bir kullanıcı bulunamadı. Lütfen kayıt olunuz.',
      });
    }

    if (same) {
      res.status(200).json({
        succeded: true,
        message: 'Giriş başarılı.',
        user,
        token: createToken(user._id),
      });
    } else {
      res.status(401).json({
        succeded: false,
        error: 'Email veya şifre hatalı. Lütfen tekrar deneyiniz.',
      });
    }
  } catch (error) {
    res.status(400).json({
      succeded: false,
      message: error.message,
    });
  }
};

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export { createUser, loginUser };
