import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';  // Reuse TaskItem for completed tasks

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

  return (
    <div>
      <h2>Completed Tasks</h2>
      {tasks.length === 0 ? (
        <p>No completed tasks yet!</p>
      ) : (
        tasks.map(task => (
          <TaskItem key={task._id} task={task} />
        ))
      )}
    </div>
  );
};

export default CompletedTasks;