require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB = process.env.MONGODB_URI || "mongodb://localhost:27017/todolist";

// MongoDB connection
mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));
