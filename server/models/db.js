require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB = process.env.MONGODB_URI;

// MongoDB connection
mongoose
  .connect(MONGODB || "mongodb://localhost:27017/todolist", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
