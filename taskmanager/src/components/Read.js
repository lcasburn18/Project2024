import TaskList from './TaskList';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Read = () => {
  const [tasks, setTasks] = useState([]);

  const reloadTasks = () => {
    axios.get('http://localhost:4000/api/tasks')
      .then((res) => setTasks(res.data.tasks))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    reloadTasks();
  }, []);

  return (
    <div>
      <h2>Task List</h2>
      <TaskList tasks={tasks} reloadTasks={reloadTasks} />
    </div>
  );
};

export default Read;
