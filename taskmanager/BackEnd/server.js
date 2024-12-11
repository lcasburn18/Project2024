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
mongoose.connect('mongodb+srv://admin:admin@your_cluster.mongodb.net/task_manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const taskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});

const taskModel = new mongoose.model('Task', taskSchema);

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
  const task = await taskModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(task);
});

app.post('/api/tasks', async (req, res) => {
  const { title, completed } = req.body;
  const newTask = new taskModel({ title, completed });
  await newTask.save();
  res.status(201).json({ message: "Task Added!", Task: newTask });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
