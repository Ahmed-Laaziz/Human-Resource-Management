const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const URI = "mongodb+srv://ahmed:ahmed123@cluster0.i5myq.mongodb.net/?retryWrites=true&w=majority";
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB...');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    // You might want to handle errors here accordingly
  }
};

module.exports = connectDB;
