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
      {tasks.length > 0 ? (
        <TaskList tasks={tasks} reloadTasks={reloadTasks} />
      ) : (
        <p>No tasks found. Add a new task to get started.</p>
      )}
    </div>
  );
};

export default Read;
