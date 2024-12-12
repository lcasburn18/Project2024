// Import necessary dependencies
const express = require('express');
const app = express();
const port = 4000;

// Enable Cross-Origin Resource Sharing (CORS)
const cors = require('cors');
app.use(cors());

// Middleware to handle CORS headers explicitly
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next(); // Proceed to the next middleware
});

// Middleware to parse incoming request bodies
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB using mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0.q66of.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define the schema for tasks in the database
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date },
});

// Create a model based on the task schema
const taskModel = mongoose.model('Task', taskSchema);

// Route to fetch all tasks (both completed and pending)
app.get('/api/tasks', async (req, res) => {
  const tasks = await taskModel.find({});
  res.status(200).json({ tasks });  // Respond with the tasks in JSON format
});

// Route to fetch only completed tasks
app.get('/api/completed-tasks', async (req, res) => {
  try {
    const tasks = await taskModel.find({ completed: true });  // Fetch tasks where "completed" is true
    res.status(200).json({ tasks });  // Respond with the completed tasks
  } catch (err) {
    res.status(500).json({ error: 'Error fetching completed tasks' });
  }
});

// Route to get a specific task by ID
app.get('/api/task/:id', async (req, res) => {
  const task = await taskModel.findById(req.params.id);
  res.json(task);  // Respond with the found task
});

// Route to delete a specific task by ID
app.delete('/api/task/:id', async (req, res) => {
  const task = await taskModel.findByIdAndDelete(req.params.id);
  res.send(task);  // Respond with the deleted task
});

// Route to update a task (e.g., mark as completed or incomplete)
app.put('/api/task/:id', async (req, res) => {
  const { completed } = req.body;
  const completedAt = completed ? new Date() : null;  // If completed, set the current date as the completed date

  // Update the task with the new "completed" status and the completion date
  const task = await taskModel.findByIdAndUpdate(
    req.params.id,
    { completed, completedAt },
    { new: true }
  );
  res.send(task);  // Send back the updated task
});

// Route to mark a task as incomplete (reset the completed status and date)
app.put('/api/task/:id/incomplete', async (req, res) => {
  const task = await taskModel.findByIdAndUpdate(
    req.params.id,  // The task ID to update
    { completed: false, completedAt: null },  // Reset the task to incomplete
    { new: true }
  );
  res.send(task);  // Respond with the updated task
});

// Route to add a new task
app.post('/api/tasks', async (req, res) => {
  const { title, description, dueDate, completed } = req.body;

  // Check if required fields are provided
  if (!title || !description || !dueDate) {
    return res.status(400).json({ error: 'Title, description, and dueDate are required.' });
  }

  // Create a new task using the provided data
  const newTask = new taskModel({
    title,
    description,
    dueDate,
    completed: completed || false,  // Default "completed" to false if not provided
  });

  try {
    await newTask.save();  // Save the new task to the database
    res.status(201).json({ message: "Task Added!", Task: newTask });  // Respond with success message
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: 'Failed to create task.' });
  }
});

// Start the Express server on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Export the task model for use elsewhere in the application
module.exports = taskModel;
