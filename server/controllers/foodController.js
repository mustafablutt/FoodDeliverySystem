import Food from '../models/foodModel.js';
import Comment from '../models/commentModel.js';
import mongoose from 'mongoose';

const addFood = async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;
    const food = new Food({
      name,
      description,
      price,
      imageUrl,
    });
    await food.save();
    res.status(201).json({
      succeded: true,
      food,
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      message: error.message,
    });
  }
};

/* const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find({});
    res.status(200).json({
      succeded: true,
      foods,
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      message: error.message,
    });
  }
}; */

const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    res.status(200).json({
      succeded: true,
      food,
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      message: error.message,
    });
  }
};

const getAllFoodsWithStats = async (req, res) => {
  try {
    // Tüm yemekleri al
    const foods = await Food.find({});

    // Yemek ID'lerini bir diziye al
    const foodIds = foods.map((food) => food._id);

    // Her bir yemek için yorum sayısını ve ortalama puanlamasını al
    const stats = await Comment.aggregate([
      {
        $match: {
          foodId: { $in: foodIds.map((id) => new mongoose.Types.ObjectId(id)) },
        },
      },
      {
        $group: {
          _id: '$foodId',
          avgRating: { $avg: '$rating' },
          commentCount: { $sum: 1 },
        },
      },
    ]);

    // İstatistikleri yemeklerle eşleştir
    const foodsWithStats = foods.map((food) => {
      const foodStat =
        stats.find((stat) => stat._id.toString() === food._id.toString()) || {};
      return {
        ...food._doc,
        avgRating: foodStat.avgRating || 0,
        commentCount: foodStat.commentCount || 0,
      };
    });

    res.status(200).json({
      succeded: true,
      foods: foodsWithStats,
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      message: error.message,
    });
  }
};

export { getFoodById, addFood, getAllFoodsWithStats };
