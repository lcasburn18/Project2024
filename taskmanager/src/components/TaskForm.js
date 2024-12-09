import React, { useState } from "react";
import axios from "../api/axios";

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(""); // State for error messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Task title cannot be empty!");
      return;
    }

    setError(""); // Clear error if valid
    try {
      const response = await axios.post("/api/tasks", { title, completed: false });
      onTaskAdded(response.data); // Notify parent with task data
      setTitle(""); // Reset input
    } catch (error) {
      console.error("Error creating task:", error);
      setError("Failed to add task. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="submit">Add Task</button>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error message */}
    </form>
  );
};

export default TaskForm;
