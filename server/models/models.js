const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  todo: String,
  isComplete: Boolean,
  order: Number,
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
