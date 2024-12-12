import axios from "axios";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import '../styles/create.css';

const Create = () => {
    // State hooks to manage form inputs for title, description, and due date
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(new Date()); // Default the due date to today's date
    const navigate = useNavigate();

    // Function to handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent the default form submission behavior

        // Construct the task object to send to the server
        const task = {
            title,
            description,
            dueDate: dueDate.toISOString(), // Serialize the date to a proper ISO string format for the backend
        };

        try {
            // Send a POST request to create a new task
            await axios.post('http://localhost:4000/api/tasks', task);
            navigate('/read');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="create-container">
            <h3>Create a New Task</h3>
            <form onSubmit={handleSubmit}>
                {/* Form group for task title */}
                <div className="form-group">
                    <label>Task Title: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} // Update the title state on input change
                    />
                </div>
                
                {/* Form group for task description */}
                <div className="form-group">
                    <label>Task Description: </label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} // Update the description state on input change
                    />
                </div>

                {/* Form group for selecting the task due date */}
                <div className="form-group">
                    <label>Due Date: </label>
                    <DatePicker
                        selected={dueDate}  // Set the current due date in the date picker
                        onChange={(date) => setDueDate(date)}  // Update the due date state when the user selects a date
                        dateFormat="yyyy-MM-dd"  // Format the date as "YYYY-MM-DD"
                        className="form-control"
                    />
                </div>

                {/* Submit button to add the new task */}
                <div className="form-group mt-3">
                    <input type="submit" value="Add Task" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
};

export default Create;
