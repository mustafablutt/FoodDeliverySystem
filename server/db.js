import mongoose from 'mongoose';

const connectDB = async () => {
  mongoose
    .connect(process.env.DB_URL, {
      dbName: 'food-delivery',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('MongoDB connected');
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectDB;
