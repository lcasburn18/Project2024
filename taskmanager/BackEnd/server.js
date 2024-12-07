const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Create express app
const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());  // Automatically parse incoming JSON requests

// CORS configuration (optional, based on your front-end needs)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Task Model
const taskSchema = new mongoose.Schema({
    title: String,
    completed: Boolean,
});

const Task = mongoose.model('tasks', taskSchema);

// API Routes

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
});

// Get a single task by ID
app.get('/api/task/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task', error });
  }
});

// Create a new task
app.post('/api/tasks', async (req, res) => {
  const { title, completed } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const newTask = new Task({ title, completed });
    await newTask.save();
    res.status(201).json({ message: 'Task added!', task: newTask });
  } catch (error) {
    res.status(500).json({ message: 'Error adding task', error });
  }
});

// Update a task (mark as completed or update title)
app.put('/api/task/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedTask) {
      res.status(200).json({ message: 'Task updated', task: updatedTask });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
});

// Delete a task
app.delete('/api/task/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (deletedTask) {
      res.status(200).json({ message: 'Task deleted', task: deletedTask });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
});

app.post('/api/tasks', async (req, res) => {
  const { title, completed } = req.body;

  try {
    const newTask = await TaskModel.create({ title, completed });
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
