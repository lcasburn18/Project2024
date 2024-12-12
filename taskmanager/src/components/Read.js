import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TaskList from './TaskList';
import '../styles/read.css';

const Read = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query for filtering tasks
  const [completionDate, setCompletionDate] = useState(''); // State to hold the selected completion date
  const [selectedTaskId, setSelectedTaskId] = useState(null); // State to track selected task for completion
  const navigate = useNavigate();

  // Function to reload tasks from the backend
  const reloadTasks = () => {
    axios
      .get('http://localhost:4000/api/tasks')
      .then((res) => setTasks(res.data.tasks)) // Set tasks in state after fetching
      .catch((err) => console.error(err)); // Handle errors during fetch
  };

  // Handle marking a task as completed
  const handleCompleteTask = async (taskId) => {
    if (completionDate) { // Ensure a completion date is selected
      try {
        await axios.put(`http://localhost:4000/api/task/${taskId}`, {
          completed: true, // Mark task as completed
          completedAt: completionDate, // Set the completion date
        });
        reloadTasks(); // Reload tasks to reflect the change
        setCompletionDate(''); // Reset the completion date input
        setSelectedTaskId(null); // Clear the selected task
      } catch (error) {
        console.error('Error marking task as completed:', error);
      }
    }
  };

  // Filter tasks based on the search query (case-insensitive)
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) // Match task title with search query
  );

  useEffect(() => {
    reloadTasks(); // Fetch tasks when the page is loaded
  }, []); // Empty dependency array to run only on mount

  return (
    <div className="read-container">
      <h2 className="page-title">Task List</h2>

      {/* Search Bar for filtering tasks */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery} // Controlled input for search
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query on change
          className="search-input"
        />
      </div>

      {/* TaskList component to display tasks */}
      <TaskList
        tasks={filteredTasks.filter((task) => !task.completed)} // Filter and show only pending tasks
        handleCompleteTask={handleCompleteTask} // Pass the function to handle task completion
        setSelectedTaskId={setSelectedTaskId} // Pass function to set selected task for completion
        handleDeleteTask={() => {}} // No delete function needed in this page
      />

      {/* If a task is selected for completion, show the date picker */}
      {selectedTaskId && (
        <div className="complete-task-date">
          <label>Select completion date:</label>
          <input
            type="date"
            value={completionDate} // Controlled input for completion date
            onChange={(e) => setCompletionDate(e.target.value)} // Update completion date on change
          />
          <button
            className="btn-complete-task"
            onClick={() => handleCompleteTask(selectedTaskId)} // Mark task as completed on button click
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
