import React from 'react';

const TaskList = ({ tasks, handleCompleteTask, setSelectedTaskId }) => {
  return (
    <div>
      <h3>Pending Tasks</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} - Due: {new Date(task.dueDate).toLocaleDateString()}
            {/* Only show the 'Complete' button for tasks that are not completed */}
            {!task.completed && (
              <button onClick={() => setSelectedTaskId(task._id)}>Mark as Completed</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
