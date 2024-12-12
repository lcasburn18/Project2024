import TaskList from './TaskList';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook
import axios from 'axios';
import '../styles/read.css'; // Import your CSS for styling

const Read = () => {
  const [tasks, setTasks] = useState([]);
  const [completionDate, setCompletionDate] = useState(''); // State to hold the selected completion date
  const [selectedTaskId, setSelectedTaskId] = useState(null); // Store the taskId of the task being marked as completed
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const navigate = useNavigate(); // Hook to navigate between pages

  const reloadTasks = () => {
    axios.get('http://localhost:4000/api/tasks')
      .then((res) => setTasks(res.data.tasks))
      .catch((err) => console.error(err));
  };

  const handleCompleteTask = async (taskId) => {
    // If a completion date is selected, proceed with updating the task
    if (completionDate) {
      try {
        // Send a PUT request to mark the task as completed and update the completedAt field
        await axios.put(`http://localhost:4000/api/task/${taskId}`, {
          completed: true,
          completedAt: completionDate, // Send the selected date
        });

        // Reload tasks after update
        reloadTasks();
        setCompletionDate(''); // Clear the completion date input
        setSelectedTaskId(null); // Clear the selected taskId
      } catch (error) {
        console.error("Error marking task as completed:", error);
      }
    }
  };

  useEffect(() => {
    reloadTasks();
  }, []);

  // Filter out pending tasks only after tasks have been fetched
  const pendingTasks = tasks.filter(task => !task.completed);

  // Filter tasks based on the search query
  const filteredTasks = pendingTasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="read-container">
      <h2 className="page-title">Task List</h2>
      
      {/* Search input */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Render filtered tasks */}
      <TaskList tasks={filteredTasks} reloadTasks={reloadTasks}
        handleCompleteTask={handleCompleteTask}
        setSelectedTaskId={setSelectedTaskId} />

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
