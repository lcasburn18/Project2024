import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TaskPage from "./pages/TaskPage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/task/:id" element={<TaskPage />} />
        </Routes>
      </div>
    </Router>
  );
}
