const mongoose = require("mongoose");
const Task = require("../models/models");
const request = require("supertest");
const app = require("../app");

beforeAll(async () => {
  await mongoose.disconnect();
  await mongoose.connect("mongodb://localhost:27017/todolistTest", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  await Task.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("GET /api/tasks", () => {
  it("should fetch all tasks", async () => {
    const task = new Task({ todo: "Test Task", isComplete: false });
    await task.save();

    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
    expect(res.body[0].todo).toEqual("Test Task");
  });
});

describe("POST /api/tasks", () => {
  it("should create a new task", async () => {
    const newTask = { todo: "New Task", isComplete: false };
    const res = await request(app).post("/api/tasks").send(newTask);
    expect(res.statusCode).toEqual(200);
    expect(res.body.todo).toEqual(newTask.todo);
    expect(res.body.isComplete).toEqual(newTask.isComplete);
  });
});

describe("PUT /api/tasks/:id", () => {
  it("should update an existing task", async () => {
    let task = new Task({ todo: "Old Task", isComplete: false });
    task = await task.save();
    const updatedTask = { todo: "Updated Task", isComplete: true };
    const res = await request(app)
      .put(`/api/tasks/${task._id}`)
      .send(updatedTask);
    expect(res.statusCode).toEqual(200);
    expect(res.body.todo).toEqual(updatedTask.todo);
    expect(res.body.isComplete).toEqual(updatedTask.isComplete);
  });
});

describe("DELETE /api/tasks/:id", () => {
  it("should delete an existing task", async () => {
    let task = new Task({ todo: "Task to be deleted", isComplete: false });
    task = await task.save();
    const res = await request(app).delete(`/api/tasks/${task._id}`);
    expect(res.statusCode).toEqual(200);
    // Verify the task is deleted
    const fetchRes = await request(app).get("/api/tasks");
    expect(fetchRes.body.length).toEqual(0);
  });
});

describe("POST /api/tasks/reorder", () => {
  it("should bulk update tasks order", async () => {
    let task1 = new Task({ todo: "Task 1", isComplete: false, order: 0 });
    let task2 = new Task({ todo: "Task 2", isComplete: false, order: 1 });
    task1 = await task1.save();
    task2 = await task2.save();

    const updates = [
      { _id: task1._id, order: 1 },
      { _id: task2._id, order: 0 },
    ];

    const res = await request(app).post("/api/tasks/reorder").send(updates);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Tasks updated successfully");

    const updatedTask1 = await Task.findById(task1._id);
    const updatedTask2 = await Task.findById(task2._id);
    expect(updatedTask1.order).toEqual(1);
    expect(updatedTask2.order).toEqual(0);
  });
});
