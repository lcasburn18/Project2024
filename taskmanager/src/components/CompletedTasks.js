import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';  // Use the relative path from App.js to App.css

const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    // Fetch the completed tasks from the server
    axios.get('http://localhost:4000/api/completed-tasks')
      .then((res) => {
        setCompletedTasks(res.data.tasks);
      })
      .catch((err) => console.error('Error fetching completed tasks:', err));
  }, []);

  const handleMarkIncomplete = (taskId) => {
    axios.put(`http://localhost:4000/api/task/${taskId}`, { completed: false })
      .then((res) => {
        setCompletedTasks(completedTasks.filter(task => task._id !== taskId));
      })
      .catch((err) => console.error('Error marking task as incomplete:', err));
  };

  const handleDelete = (taskId) => {
    axios.delete(`http://localhost:4000/api/task/${taskId}`)
      .then(() => {
        setCompletedTasks(completedTasks.filter(task => task._id !== taskId));
      })
      .catch((err) => console.error('Error deleting task:', err));
  };

  return (
    <div className="completed-tasks-container">
      <h2>Completed Tasks</h2>
      <div className="task-cards">
        {completedTasks.map((task) => (
          <div key={task._id} className="task-card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p><strong>Completed On:</strong> {new Date(task.completedAt).toLocaleDateString()}</p>
            <div className="task-actions">
              <button onClick={() => handleMarkIncomplete(task._id)}>Mark as Incomplete</button>
              <button onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompletedTasks;
