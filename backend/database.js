require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI;

const mongoDB = async (req, res) => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    const foodItemsCollection = mongoose.connection.collection('Food-Items');
    const foodCategoryCollection = mongoose.connection.collection('Food-Category');

    const foodItemsData = await foodItemsCollection.find({}).toArray();
    const foodCategoryData = await foodCategoryCollection.find({}).toArray();

    global.foodThings = foodItemsData;
    global.foodCategory = foodCategoryData;

    

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = mongoDB;
