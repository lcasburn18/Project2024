import axios from 'axios';
import { Link } from 'react-router-dom';

const TaskItem = ({ task, reloadTasks }) => {
  // Function to handle task deletion
  const handleDelete = () => {
    axios.delete(`http://localhost:4000/api/task/${task._id}`)
      .then(() => reloadTasks())
      .catch((err) => console.error(err));
  };

  // Function to toggle the completion status of a task
  const toggleCompletion = () => {
    axios.put(`http://localhost:4000/api/task/${task._id}`, { 
      ...task, // Spread existing task data
      completed: !task.completed // Toggle the completion status
    })
      .then(() => reloadTasks())
      .catch((err) => console.error(err));
  };

  return (
    <div>
      {/* Display task title and its completion status */}
      <p>{task.title} - {task.completed ? 'Completed' : 'Pending'}</p>
      
      {/* Button to toggle task completion */}
      <button onClick={toggleCompletion}>Toggle Complete</button>
      
      {/* Link to navigate to the edit page for the specific task */}
      <Link to={`/edit/${task._id}`}>Edit</Link>
      
      {/* Button to delete the task */}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TaskItem;
