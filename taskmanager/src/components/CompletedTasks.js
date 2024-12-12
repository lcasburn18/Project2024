import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/completedTasks.css'; // Import your CSS for styling

const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  const reloadTasks = () => {
    axios.get('http://localhost:4000/api/tasks')
      .then((res) => {
        const completed = res.data.tasks.filter(task => task.completed);
        setCompletedTasks(completed);
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteTask = async (taskId) => {
    // Confirm the deletion action with the user
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        // Send a DELETE request to remove the task
        await axios.delete(`http://localhost:4000/api/task/${taskId}`);
        // Reload tasks after deletion
        reloadTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  useEffect(() => {
    reloadTasks();
  }, []);

  return (
    <div className="completed-tasks-container">
      <h2 className="page-title">Completed Tasks</h2>
      {completedTasks.length === 0 ? (
        <p className="no-tasks-message">No completed tasks available.</p>
      ) : (
        <ul className="completed-tasks-list">
          {completedTasks.map(task => (
            <li key={task._id} className="completed-task-item">
              <div className="task-info">
                <span className="task-title">{task.title}</span>
                <span className="task-completed-date">
                  Completed on: {new Date(task.completedAt).toLocaleDateString()}
                </span>
              </div>
              <button
                className="btn-delete"
                onClick={() => handleDeleteTask(task._id)}  // Delete button with confirmation
              >
                Delete Task
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompletedTasks;
