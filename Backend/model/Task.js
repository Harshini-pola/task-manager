import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: String,
    default: "Pending"
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Low"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Task = mongoose.model("Task", taskSchema);

export default Task;