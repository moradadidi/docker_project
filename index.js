const express = require('express');
const app = express();
const PORT = 3000;
// Middleware to parse JSON
app.use(express.json());
// In-memory data storage (tasks with more details)
let tasks = [
{ 
 id: 1, 
 name: 'Task 1', 
 description: 'This is task 1 description', 
 priority: 'medium', 
 dueDate: '2024-10-20', 
 completed: false 
 },
{ 
 id: 2, 
 name: 'Task 2', 
 description: 'This is task 2 description', 
 priority: 'high', 
 dueDate: '2024-11-01', 
 completed: false 
 },
];
// Find all tasks (GET)
app.get('/tasks', (req, res) => {
res.json(tasks);
});
// Find one task (GET by ID)
app.get('/tasks/:id', (req, res) => {
const task = tasks.find(t => t.id === parseInt(req.params.id));
if (!task) return res.status(404).send('Task not found');
res.json(task);
});
// Add new task (POST)
app.post('/tasks', (req, res) => {
const newTask = {
 id: tasks.length + 1,
 name: req.body.name,
 description: req.body.description || 'No description provided',
 priority: req.body.priority || 'low',
 dueDate: req.body.dueDate || null,
 completed: false,
};
tasks.push(newTask);
res.status(201).json(newTask);
});
// Update a task (PATCH)
app.patch('/tasks/:id', (req, res) => {
const task = tasks.find(t => t.id === parseInt(req.params.id));
if (!task) return res.status(404).send('Task not found');
task.name = req.body.name || task.name;
task.description = req.body.description || task.description;
task.priority = req.body.priority || task.priority;
task.dueDate = req.body.dueDate || task.dueDate;
task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
res.json(task);
});
// Delete a task (DELETE)
app.delete('/tasks/:id', (req, res) => {
tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
res.status(204).send();
});
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});

const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://mongo:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'docker_database';

async function connectDB() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected successfully to MongoDB');
    const db = client.db(dbName);

    // Use the database for queries
    return db;
  } catch (err) {
    console.error(err);
  }
}

connectDB();
