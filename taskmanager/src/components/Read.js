import TaskList from './TaskList';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Importing useNavigate hook
import axios from 'axios';
import '../styles/read.css'; // Import your CSS for styling

const Read = () => {
  const [tasks, setTasks] = useState([]);
  const [completionDate, setCompletionDate] = useState('');  // State to hold the selected completion date
  const [selectedTaskId, setSelectedTaskId] = useState(null);  // Store the taskId of the task being marked as completed
  const navigate = useNavigate();  // Hook to navigate between pages

  const reloadTasks = () => {
    axios.get('http://localhost:4000/api/tasks')
      .then((res) => setTasks(res.data.tasks))
      .catch((err) => console.error(err));
  };

  const handleCompleteTask = async (taskId) => {
    if (completionDate) {
      try {
        const updatedTask = await axios.put(`http://localhost:4000/api/task/${taskId}`, {
          completed: true,
          completedAt: completionDate,  // Send the selected date
        });
        reloadTasks();
        setCompletionDate('');
        setSelectedTaskId(null);
      } catch (error) {
        console.error("Error marking task as completed:", error);
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`http://localhost:4000/api/task/${taskId}`);
        reloadTasks(); // Reload tasks after deletion
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  useEffect(() => {
    reloadTasks();
  }, []);

  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <div className="read-container">
      <h2 className="page-title">Task List</h2>
      {/* Render only pending tasks */}
      <TaskList 
        tasks={pendingTasks}
        handleCompleteTask={handleCompleteTask}
        setSelectedTaskId={setSelectedTaskId}
        handleDeleteTask={handleDeleteTask}  // Pass the delete handler
      />
      {/* If a task is selected for completion, show the date picker */}
      {selectedTaskId && (
        <div className="complete-task-date">
          <label>Select completion date:</label>
          <input
            type="date"
            value={completionDate}
            onChange={(e) => setCompletionDate(e.target.value)}
          />
          <button className="btn-complete-task" onClick={() => handleCompleteTask(selectedTaskId)}>
            Mark as Completed
          </button>
        </div>
      )}
      <div className="btn-container">
        <button className="btn-go-completed" onClick={() => navigate('/completed-tasks')}>
          Go to Completed Tasks
        </button>
      </div>
    </div>
  );
};

export default Read;
