require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes/routes");
require("./models/db.js");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/api/tasks", router);

app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);
  res
    .status(500)
    .json({ error: "Internal Server Error", details: error.message });
});

module.exports = app; // Export app for testing
