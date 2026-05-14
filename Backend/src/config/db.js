const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB with URI:', process.env.MONGO_URI);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(process.env.MONGO_URI);

  } catch (error) {
    console.error(`MongoDB Error: ${error.message}`);

    process.exit(1);
  }
};

module.exports = connectDB;