import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';  // Import your CSS for styling if you want custom styles

const HomePage = () => {
    return (
        <div className="home-container">
            <h1>Welcome to Task Manager</h1>
            <p>Your one-stop solution to manage your tasks efficiently!</p>

            <div className="home-actions">
                <Link to="/create" className="home-button">
                    Create New Task
                </Link>
                <Link to="/read" className="home-button">
                    View Tasks
                </Link>
            </div>

            <div className="home-info">
                <h2>Features</h2>
                <ul>
                    <li>Create tasks with due dates</li>
                    <li>Track task completion</li>
                    <li>Delete or update tasks as needed</li>
                </ul>
            </div>
        </div>
    );
};

export default HomePage;
