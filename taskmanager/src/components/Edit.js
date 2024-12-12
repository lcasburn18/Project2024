import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date()); // Add state for due date

  useEffect(() => {
    axios.get(`http://localhost:4000/api/task/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
        setDueDate(new Date(res.data.dueDate)); // Initialize dueDate from API
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = { title, description, dueDate };

    axios.put(`http://localhost:4000/api/task/${id}`, updatedTask)
      .then(() => navigate('/read'))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Due Date:</label>
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default Edit;
