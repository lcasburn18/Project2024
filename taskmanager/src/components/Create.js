import { useState } from "react";
import axios from "axios";

const Create = () => {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = { title, completed };
    console.log("New Task:", task);

    axios.post('http://localhost:4000/api/tasks', task)
      .then((res) => {
        console.log("Task Created:", res.data);
        setTitle(''); // Reset the input fields
        setCompleted(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h3>Create New Task</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Task Title:</label>
          <input 
            type="text" 
            className="form-control" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Completed:</label>
          <input 
            type="checkbox" 
            checked={completed} 
            onChange={(e) => setCompleted(e.target.checked)} 
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Task</button>
      </form>
    </div>
  );
};

export default Create;
