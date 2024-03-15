// Mongoose connection

const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to mongodb");
  } catch (error) {
    console.log("An error occured while connecting to mongodb");
  }
};

module.exports = connectDb;
