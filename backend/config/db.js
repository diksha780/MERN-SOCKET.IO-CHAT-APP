const mongoose = require("mongoose"); //import mongoose
// create a function to connect to our database

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected:${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error:${error.message}`.red.bold);
    process.exit();
  }
};

// empoxt connectDB function
module.exports = connectDB;

// import connectDB in server.js
