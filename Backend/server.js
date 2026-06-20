const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/taskmanager")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Schema
const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,

  status: {
    type: String,
    default: "pending",
  },

  // ✅ NEW FIELD (IMPORTANT)
  priority: {
    type: String,
    default: "Low",
  },
});

const Task = mongoose.model("Task", TaskSchema);

// ================= ROUTES =================

// GET all tasks
app.get("/api/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// ADD task
app.post("/api/tasks", async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority || "Low",
  });

  await task.save();
  res.json(task);
});

// UPDATE (complete task)
app.put("/api/tasks/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { status: "completed" },
    { new: true }
  );
  res.json(task);
});

// DELETE task
app.delete("/api/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});