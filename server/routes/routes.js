const express = require("express");
const Task = require("../models/models");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const docs = await Task.find();
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.post("/", async (req, res) => {
  const task = new Task(req.body);

  try {
    const doc = await task.save();
    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.put("/:id", async (req, res) => {
  console.log(`Updating task with ID: ${req.params.id}`);
  try {
    const doc = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const doc = await Task.findByIdAndDelete(req.params.id);
    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.post("/bulk-update", async (req, res) => {
  const updates = req.body;
  const operations = updates.map((update) => ({
    updateOne: {
      filter: { _id: update._id },
      update: { $set: { order: update.order } },
    },
  }));

  try {
    const result = await Task.bulkWrite(operations);
    res.json({ message: "Tasks updated successfully", result });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

module.exports = router;
