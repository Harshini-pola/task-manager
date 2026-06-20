import { useEffect, useState } from "react";
import { getTasks, deleteTask, completeTask } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();

  // Load tasks
  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Delete
  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  // Complete
  const handleComplete = async (id) => {
    await completeTask(id);
    loadTasks();
  };

  // 🔥 FIXED FILTER LOGIC
  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((task) => {
      if (filter === "all") return true;
      return task.status.toLowerCase() === filter.toLowerCase();
    });

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Manager</h2>
        <button className="active">All Tasks</button>
        <button onClick={() => navigate("/add")}>Add Task</button>
      </div>

      {/* Main */}
      <div className="main">
        <div className="topbar">
          <h1>All Tasks</h1>
          <button className="addBtn" onClick={() => navigate("/add")}>
            + Add New Task
          </button>
        </div>

        {/* 🔍 SEARCH + FILTER */}
        <div className="controls">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Tasks */}
        {filteredTasks.map((task) => (
          <div className="card" key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>

            {/* Status */}
            <span className={task.status === "completed" ? "done" : "pending"}>
              {task.status}
            </span>

            {/* Buttons */}
            <div className="btns">
              <button onClick={() => handleComplete(task._id)}>
                Complete
              </button>

              <button
                className="delete"
                onClick={() => handleDelete(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}