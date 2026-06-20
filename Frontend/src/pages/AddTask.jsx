import { useState } from "react";
import { addTask } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddTask() {
  const [task, setTask] = useState({
    title: "",
    description: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addTask(task);
      navigate("/"); // go back to dashboard
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
    }}>
      <form onSubmit={handleSubmit} style={{
        background: "#f3f4f6",
        padding: "30px",
        borderRadius: "10px",
        width: "300px"
      }}>
        <h2>Add Task</h2>

        <input
          type="text"
          placeholder="Title"
          value={task.title}
          onChange={(e) =>
            setTask({ ...task, title: e.target.value })
          }
          style={{ width: "100%", padding: "8px" }}
          required
        />

        <br /><br />

        <textarea
          placeholder="Description"
          value={task.description}
          onChange={(e) =>
            setTask({ ...task, description: e.target.value })
          }
          style={{ width: "100%", padding: "8px" }}
          required
        />

        <br /><br />

        <button type="submit" style={{
          width: "100%",
          background: "blue",
          color: "white",
          padding: "10px"
        }}>
          Add Task
        </button>
      </form>
    </div>
  );
}