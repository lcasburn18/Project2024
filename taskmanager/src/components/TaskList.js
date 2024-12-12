import React from 'react';
import '../styles/TaskList.css'; // Import the CSS file for TaskList styling

const TaskList = ({ tasks, handleCompleteTask, setSelectedTaskId }) => {
  return (
    <div className="task-list-container">
      <h3 className="task-list-title">Pending Tasks</h3>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            <div className="task-info">
              <span className="task-title">{task.title}</span>
              <span className="task-due-date">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
            {/* Only show the 'Complete' button for tasks that are not completed */}
            {!task.completed && (
              <button
                className="btn-complete"
                onClick={() => setSelectedTaskId(task._id)}
              >
                Mark as Completed
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
