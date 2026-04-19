const mongoose = require("mongoose");
const UploadedFile = require("./models/file");
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017/qr-code";

const connect = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

connect();
