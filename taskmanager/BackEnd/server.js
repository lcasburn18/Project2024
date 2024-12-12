const express = require('express');
const app = express();
const port = 4000;

const cors = require('cors');
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0.q66of.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date },
});

const taskModel = mongoose.model('Task', taskSchema);

app.get('/api/tasks', async (req, res) => {
  const tasks = await taskModel.find({});
  res.status(200).json({ tasks });
});

app.get('/api/task/:id', async (req, res) => {
  const task = await taskModel.findById(req.params.id);
  res.json(task);
});

app.delete('/api/task/:id', async (req, res) => {
  const task = await taskModel.findByIdAndDelete(req.params.id);
  res.send(task);
});

app.put('/api/task/:id', async (req, res) => {
  const { completed } = req.body;  // Get the "completed" status from the request body
  const completedAt = completed ? new Date() : null;  // Set completedAt if task is marked as completed
  
  const task = await taskModel.findByIdAndUpdate(
    req.params.id,
    { ...req.body, completedAt }, // Spread the incoming request body and include completedAt
    { new: true }  // Return the updated task
  );
  res.send(task);  // Send back the updated task
});

app.post('/api/tasks', async (req, res) => {
  const { title, description, dueDate, completed } = req.body;

  if (!title || !description || !dueDate) {
    return res.status(400).json({ error: 'Title, description, and dueDate are required.' });
  }

  const newTask = new taskModel({
    title,
    description,
    dueDate,
    completed
  });

  try {
    await newTask.save();
    res.status(201).json({ message: "Task Added!", Task: newTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create task.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = taskModel;
