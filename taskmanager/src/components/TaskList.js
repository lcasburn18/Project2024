import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]); // Initialize tasks state

  useEffect(() => {
    // Fetch tasks from the backend
    axios
      .get("/api/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // Return the JSX for the component
  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} - {task.completed ? "Completed" : "Pending"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
