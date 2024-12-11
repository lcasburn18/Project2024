import axios from 'axios';
import { Link } from 'react-router-dom';

const TaskItem = ({ task, reloadTasks }) => {
  const handleDelete = () => {
    axios.delete(`http://localhost:4000/api/task/${task._id}`)
      .then(() => reloadTasks())
      .catch((err) => console.error(err));
  };

  const toggleCompletion = () => {
    axios.put(`http://localhost:4000/api/task/${task._id}`, { ...task, completed: !task.completed })
      .then(() => reloadTasks())
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <p>{task.title} - {task.completed ? 'Completed' : 'Pending'}</p>
      <button onClick={toggleCompletion}>Toggle Complete</button>
      <Link to={`/edit/${task._id}`}>Edit</Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TaskItem;
