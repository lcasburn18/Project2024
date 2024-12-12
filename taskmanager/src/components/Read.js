import TaskList from './TaskList';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Importing useNavigate hook
import axios from 'axios';

const Read = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();  // Hook to navigate between pages

  const reloadTasks = () => {
    axios.get('http://localhost:4000/api/tasks')
      .then((res) => setTasks(res.data.tasks))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    reloadTasks();
  }, []);

  // Filter out pending tasks only after tasks have been fetched
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <div>
      <h2>Task List</h2>
      {/* Render pending tasks */}
      <TaskList tasks={pendingTasks} reloadTasks={reloadTasks} />

      {/* Button to navigate to completed tasks page */}
      <div>
        <button onClick={() => navigate('/completed-tasks')}>Go to Completed Tasks</button>
      </div>
    </div>
  );
};

export default Read;
