import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompletedTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch all tasks and filter the completed ones
    axios.get('http://localhost:4000/api/tasks')
      .then((res) => {
        console.log("Fetched tasks:", res.data.tasks); // Inspect the tasks response
        const completedTasks = res.data.tasks.filter(task => task.completed);
        setTasks(completedTasks);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Completed Tasks</h2>
      {tasks.length === 0 ? (
        <p>No completed tasks yet!</p>
      ) : (
        tasks.map(task => (
          <div key={task._id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p><strong>Status:</strong> Completed</p>
            <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
            
            {task.completedAt && (
              <p>
                <strong>Completed on:</strong> {new Date(task.completedAt).toLocaleDateString()}
              </p>
            )}

            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/api/task/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task._id !== id));
      })
      .catch((err) => console.error('Error deleting task:', err));
  };
};

export default CompletedTasks;
