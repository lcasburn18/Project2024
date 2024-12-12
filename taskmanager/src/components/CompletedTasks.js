import { useState, useEffect } from 'react';
import axios from 'axios';

const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    // Fetch completed tasks from the server
    axios.get('http://localhost:4000/api/completed-tasks')
      .then(res => setCompletedTasks(res.data.tasks))
      .catch(err => console.error('Error fetching completed tasks:', err));
  }, []);

  const handleMarkAsIncomplete = (taskId) => {
    axios.put(`http://localhost:4000/api/task/${taskId}/incomplete`)
      .then(() => {
        // After marking as incomplete, refetch the completed tasks
        setCompletedTasks(completedTasks.filter(task => task._id !== taskId));
      })
      .catch(err => console.error('Error marking task as incomplete:', err));
  };

  const handleDeleteTask = (taskId) => {
    axios.delete(`http://localhost:4000/api/task/${taskId}`)
      .then(() => {
        // After deleting, refetch the completed tasks
        setCompletedTasks(completedTasks.filter(task => task._id !== taskId));
      })
      .catch(err => console.error('Error deleting task:', err));
  };

  return (
    <div>
      <h2>Completed Tasks</h2>
      <ul>
        {completedTasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Completed on: {new Date(task.completedAt).toLocaleString()}</p>
            <button onClick={() => handleMarkAsIncomplete(task._id)}>Mark as Incomplete</button>
            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompletedTasks;
