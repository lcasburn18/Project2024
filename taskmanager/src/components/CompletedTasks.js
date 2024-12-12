import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompletedTasks = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the server on initial render
  useEffect(() => {
    axios.get('http://localhost:4000/api/tasks')
      .then(response => {
        setTasks(response.data.tasks);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  // Handle marking a task as completed or incomplete
  const handleComplete = (taskId, completed) => {
    axios.put(`http://localhost:4000/api/task/${taskId}`, { completed })
      .then(response => {
        // Update the task in state with the response (task after update)
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task._id === taskId
              ? { ...task, completed, completedAt: response.data.completedAt }
              : task
          )
        );
      })
      .catch(error => {
        console.error('Error completing task:', error);
      });
  };

  // Handle deleting a task
  const handleDelete = (taskId) => {
    axios.delete(`http://localhost:4000/api/task/${taskId}`)
      .then(() => {
        // Remove the task from the local state after deletion
        setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };

  return (
    <div>
      <h2>Completed Tasks</h2>
      {tasks.filter(task => task.completed).map((task) => (
        <div key={task._id} className="task">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
          
          {/* Display the completed date */}
          {task.completedAt && (
            <p><strong>Completed on:</strong> {new Date(task.completedAt).toLocaleDateString()}</p>
          )}

          {/* Button to mark as incomplete */}
          <button onClick={() => handleComplete(task._id, false)}>Mark as Incomplete</button>

          {/* Button to delete the task */}
          <button onClick={() => handleDelete(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default CompletedTasks;
