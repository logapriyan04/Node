const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

exports.dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (err) {
    console.log("Database error", err);
  }
};