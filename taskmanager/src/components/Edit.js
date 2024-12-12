import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/edit.css"; // Import the CSS file for consistent styling

const Edit = () => {
  // Use the URL parameter `id` to fetch the task to edit
  const { id } = useParams();
  const navigate = useNavigate();

  // State hooks to store the task's title, description, and due date
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date()); // Initialize dueDate with the current date

  // Fetch the task data from the server when the component mounts
  useEffect(() => {
    axios.get(`http://localhost:4000/api/task/${id}`)
      .then((res) => {
        // Set the form fields with the data fetched from the API
        setTitle(res.data.title);
        setDescription(res.data.description);
        setDueDate(new Date(res.data.dueDate)); // Initialize the dueDate state from API response
      })
      .catch((err) => console.error(err));
  }, [id]); // Dependency array ensures effect runs when `id` changes

  // Handle the form submission and update the task in the database
  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct the updated task object
    const updatedTask = {
      title,
      description,
      dueDate: dueDate.toISOString(),
    };

    // Send a PUT request to update the task on the server
    axios.put(`http://localhost:4000/api/task/${id}`, updatedTask)
      .then((response) => {
        navigate('/read');
      })
      .catch((err) => console.error("Error:", err));

  };

  return (
    <div className="edit-container">
      {/* Page title */}
      <h2>Edit Task</h2>
      {/* Edit form */}
      <form onSubmit={handleSubmit}>
        {/* Title input field */}
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Update title state on input change
            className="input-field"
          />
        </div>
        {/* Description input field */}
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Update description state on input change
            className="textarea-field"
          />
        </div>
        {/* Due date picker */}
        <div className="form-group">
          <label>Due Date:</label>
          <DatePicker
            selected={dueDate} // Set the current due date in the date picker
            onChange={(date) => setDueDate(date)} // Update dueDate state when the user selects a new date
            dateFormat="yyyy-MM-dd" // Format the date as "YYYY-MM-DD"
            className="date-picker"
          />
        </div>
        {/* Submit button */}
        <button type="submit" className="btn-submit">Update Task</button>
      </form>
    </div>
  );
};

export default Edit;
