import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/completedTasks.css';

const CompletedTasks = () => {
  // State to store the list of completed tasks
  const [completedTasks, setCompletedTasks] = useState([]);

  // Function to fetch all tasks and filter completed ones
  const reloadTasks = () => {
    axios.get('http://localhost:4000/api/tasks')  // Fetch all tasks from the server
      .then((res) => {
        // Filter tasks to only include those that are marked as completed
        const completed = res.data.tasks.filter(task => task.completed);
        setCompletedTasks(completed); 
      })
      .catch((err) => console.error(err));
  };

  // Function to handle task deletion with confirmation
  const handleDeleteTask = async (taskId) => {
    // Confirm with the user before deleting the task
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        // Send a DELETE request to remove the task from the server
        await axios.delete(`http://localhost:4000/api/task/${taskId}`);
        // Reload the list of tasks after deletion
        reloadTasks();
      } catch (error) {
        console.error("Error deleting task:", error);  // Log any errors that occur during deletion
      }
    }
  };

  // useEffect hook to fetch completed tasks when the component mounts
  useEffect(() => {
    reloadTasks();
  }, []);  // Empty dependency array ensures this runs only once when the component is mounted

  return (
    <div className="completed-tasks-container">
      <h2 className="page-title">Completed Tasks</h2>
      {/* If there are no completed tasks, display a message */}
      {completedTasks.length === 0 ? (
        <p className="no-tasks-message">No completed tasks available.</p>
      ) : (
        // Display the list of completed tasks
        <ul className="completed-tasks-list">
          {completedTasks.map(task => (
            <li key={task._id} className="completed-task-item">
              <div className="task-info">
                <span className="task-title">{task.title}</span>
                {/* Display the completion date of the task */}
                <span className="task-completed-date">
                  Completed on: {new Date(task.completedAt).toLocaleDateString()}
                </span>
              </div>
              {/* Button to delete the task, triggers the handleDeleteTask function */}
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
