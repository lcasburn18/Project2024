import React from 'react';
import '../styles/TaskList.css';

const TaskList = ({ tasks, handleCompleteTask, setSelectedTaskId, handleDeleteTask }) => {
  return (
    <div className="task-list-container">
      {/* Title for the task list */}
      <h3 className="task-list-title">Pending Tasks</h3>

      <ul className="task-list">
        {/* Iterate over the tasks array and display each task */}
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            <div className="task-info">
              {/* Display task title */}
              <span className="task-title">{task.title}</span>

              {/* Display task due date */}
              <span className="task-due-date">Due: {new Date(task.dueDate).toLocaleDateString()}</span>

              {/* Display task description */}
              <p className="task-description">{task.description}</p> {/* Add description */}
            </div>

            <div className="task-actions">
              {/* Conditionally render "Mark as Completed" button for incomplete tasks */}
              {!task.completed && (
                <button
                  className="btn-complete"
                  onClick={() => setSelectedTaskId(task._id)}  // When clicked, set the task as selected for completion
                >
                  Mark as Completed
                </button>
              )}
              
              {/* "Delete" button for deleting the task */}
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
