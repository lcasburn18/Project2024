import axios from "axios";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import CSS for the date picker
import { useNavigate } from 'react-router-dom';
import '../styles/create.css';  // Import your new CSS file

const Create = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(new Date()); // Default to today's date
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const task = {
            title,
            description,
            dueDate: dueDate.toISOString(), // Serialize date correctly
        };
    
        try {
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
                <div className="form-group">
                    <label>Task Title: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Task Description: </label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Due Date: </label>
                    <DatePicker
                        selected={dueDate}
                        onChange={(date) => setDueDate(date)}
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                    />
                </div>
                <div className="form-group mt-3">
                    <input type="submit" value="Add Task" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
};

export default Create;
