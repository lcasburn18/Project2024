import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState([]); // State to hold task list

  // Fetch tasks on component mount
  useEffect(() => {
    axios
      .get("/api/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]); // Append new task to state
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find((task) => task._id === taskId);
      const updatedTask = await axios.put(`/api/tasks/${taskId}`, {
        completed: !task.completed,
      });
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === taskId ? updatedTask.data : t))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} - {task.completed ? "Completed" : "Pending"}
            <button onClick={() => handleToggleComplete(task._id)}>
              {task.completed ? "Mark as Pending" : "Mark as Completed"}
            </button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
