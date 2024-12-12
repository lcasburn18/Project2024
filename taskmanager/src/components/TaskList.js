import React from 'react';
import '../styles/TaskList.css';

const TaskList = ({ tasks, handleCompleteTask, setSelectedTaskId, handleDeleteTask }) => {
  return (
    <div className="task-list-container">
      <h3 className="task-list-title">Pending Tasks</h3>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            <div className="task-info">
              <span className="task-title">{task.title}</span>
              <span className="task-due-date">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
              {/* Display Task Description */}
              <p className="task-description">{task.description}</p> {/* Add description */}
            </div>
            <div className="task-actions">
              {!task.completed && (
                <button
                  className="btn-complete"
                  onClick={() => setSelectedTaskId(task._id)}
                >
                  Mark as Completed
                </button>
              )}
              <button
                className="btn-delete"
                onClick={() => handleDeleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
