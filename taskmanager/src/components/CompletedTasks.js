import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompletedTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch all tasks and filter the completed ones
    axios.get('http://localhost:4000/api/tasks')
      .then((res) => {
        const completedTasks = res.data.tasks.filter(task => task.completed);
        setTasks(completedTasks);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (taskId) => {
    // Delete the task by ID
    axios.delete(`http://localhost:4000/api/task/${taskId}`)
      .then(() => {
        // Remove the deleted task from the state
        setTasks(tasks.filter(task => task._id !== taskId));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Completed Tasks</h2>
      {tasks.length === 0 ? (
        <p>No completed tasks yet!</p>
      ) : (
        tasks.map(task => (
          <div key={task._id} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
            <p>{task.title}</p>
            {task.completedAt && <p>Completed on: {new Date(task.completedAt).toLocaleString()}</p>}
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default CompletedTasks;
