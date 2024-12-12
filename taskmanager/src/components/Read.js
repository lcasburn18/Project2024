import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TaskList from './TaskList'; // Import TaskList component
import '../styles/read.css'; // Import your CSS for styling

const Read = () => {
  const [tasks, setTasks] = useState([]); // State to hold all tasks
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query
  const [completionDate, setCompletionDate] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const navigate = useNavigate();

  // Function to reload tasks after any action like completing or deleting
  const reloadTasks = () => {
    axios
      .get('http://localhost:4000/api/tasks')
      .then((res) => setTasks(res.data.tasks))
      .catch((err) => console.error(err));
  };

  // Handle marking a task as completed
  const handleCompleteTask = async (taskId) => {
    if (completionDate) {
      try {
        await axios.put(`http://localhost:4000/api/task/${taskId}`, {
          completed: true,
          completedAt: completionDate,
        });
        reloadTasks(); // Reload tasks after completing
        setCompletionDate('');
        setSelectedTaskId(null);
      } catch (error) {
        console.error('Error marking task as completed:', error);
      }
    }
  };

  // Filter tasks based on the search query
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    reloadTasks(); // Fetch tasks on page load
  }, []);

  return (
    <div className="read-container">
      <h2 className="page-title">Task List</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* TaskList component */}
      <TaskList
        tasks={filteredTasks.filter((task) => !task.completed)} // Only show pending tasks
        handleCompleteTask={handleCompleteTask}
        setSelectedTaskId={setSelectedTaskId}
        handleDeleteTask={() => {}}
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
          <button
            className="btn-complete-task"
            onClick={() => handleCompleteTask(selectedTaskId)}
          >
            Mark as Completed
          </button>
        </div>
      )}

      {/* Button to navigate to completed tasks page */}
      <div className="btn-container">
        <button className="btn-go-completed" onClick={() => navigate('/completed-tasks')}>
          Go to Completed Tasks
        </button>
      </div>
    </div>
  );
};

export default Read;
