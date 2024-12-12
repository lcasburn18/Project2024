import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Fetch the task data for the given ID
    axios.get(`http://localhost:4000/api/task/${id}`)
      .then((res) => {
        console.log("Task Data:", res.data);
        setTitle(res.data.title);
        setCompleted(res.data.completed);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = { title, completed };
    console.log("Updated Task:", updatedTask);

    axios.put(`http://localhost:4000/api/task/${id}`, updatedTask)
      .then((res) => {
        console.log("Task Updated:", res.data);
        navigate('/'); // Navigate back to the task list
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h3>Edit Task</h3>
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
        <div className="form-group">
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            dateFormat="yyyy-MM-dd"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-success">Update Task</button>
      </form>
    </div>
  );
};

export default Edit;
