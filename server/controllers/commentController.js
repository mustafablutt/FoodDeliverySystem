import Comment from '../models/commentModel.js';
import mongoose from 'mongoose';

const addComment = async (req, res) => {
  try {
    const { foodId, text, rating } = req.body;

    const existingComment = await Comment.findOne({
      foodId,
      userId: req.userId,
    });

    if (existingComment) {
      return res.status(400).json({
        succeded: false,
        message: 'Bu yemeğe zaten bir yorum yaptınız.',
      });
    }

    const comment = new Comment({
      foodId,
      userId: req.userId,
      text,
      rating,
    });

    await comment.save();

    res.status(201).json({
      succeded: true,
      comment,
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      message: error.message,
    });
  }
};

const getComments = async (req, res) => {
  try {
    const foodId = req.params.id;
    const comments = await Comment.find({ foodId: foodId })
      .populate('userId', 'firstName lastName')
      .exec();

    if (!comments) {
      return res.status(404).json({
        succeded: false,
        message: 'Yorum bulunamadı.',
      });
    }

    res.status(200).json({
      succeded: true,
      comments,
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      message: error.message,
    });
  }
};

const getFoodStats = async (req, res) => {
  try {
    const foodId = req.params.id;

    const stats = await Comment.aggregate([
      {
        $match: { foodId: new mongoose.Types.ObjectId(foodId) },
      },
      {
        $group: {
          _id: '$foodId',
          avgRating: { $avg: '$rating' },
          commentCount: { $sum: 1 },
        },
      },
    ]);

    if (!stats || stats.length === 0) {
      return res.status(404).json({
        succeded: false,
        message: 'Yemek istatistikleri bulunamadı.',
      });
    }

    res.status(200).json({
      succeded: true,
      stats: stats[0],
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      message: error.message,
    });
  }
};

export { addComment, getComments, getFoodStats };
