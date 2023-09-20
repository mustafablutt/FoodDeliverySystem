import Food from '../models/foodModel.js';

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

const getAllFoods = async (req, res) => {
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
};

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

export { getAllFoods, getFoodById, addFood };
