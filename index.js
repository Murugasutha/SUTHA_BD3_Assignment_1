const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

// Endpoint 1. Add a Task to the Task List

function addTask(tasks, taskId, text, priority) {
  let newTask = { taskId: taskId, text: text, priority: priority };
  tasks.push(newTask);
  return tasks;
}

app.get('/tasks/add', (req, res) => {
  let taskId = parseFloat(req.query.taskId);
  let text = req.query.text;
  let priority = parseFloat(req.query.priority);
  let result = addTask(tasks, taskId, text, priority);
  res.json({ tasks: tasks });
});

// Endpoint 2. Read All Tasks in the Task List

app.get('/tasks', (req, res) => {
  res.json({ tasks: tasks });
});

// Endpoint 3. Sort Tasks by Priority

function sortTaskByPriority(task1, task2) {
  return task1.priority - task2.priority;
}

app.get('/tasks/sort-by-priority', (req, res) => {
  let tasksCopy = tasks.slice();
  let result = tasksCopy.sort(sortTaskByPriority);
  res.json({ tasks: result });
});

// Endpoint 4. Edit Task Priority

function editTaskPriority(tasks, taskId, priority) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
    }
  }
  return tasks;
}

app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseFloat(req.query.taskId);
  let priority = parseFloat(req.query.priority);
  let result = editTaskPriority(tasks, taskId, priority);
  tasks = result;
  res.json({ tasks: tasks });
});

// Endpoint 5. Edit/Update Task Text

function editTaskText(tasks, taskId, text) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].text = text;
    }
  }
  return tasks;
}

app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseFloat(req.query.taskId);
  let text = req.query.text;
  let result = editTaskText(tasks, taskId, text);
  tasks = result;
  res.json({ tasks: tasks });
});

// Endpoint 6. Delete a Task from the Task List

function deleteTask(tasks, taskId) {
  return tasks.taskId !== taskId;
}

app.get('/tasks/delete', (req, res) => {
  let taskId = parseFloat(req.query.taskId);
  let result = tasks.filter((task) => deleteTask(task, taskId));
  tasks = result;
  res.json({ tasks: tasks });
});

// 7. Filter Tasks by Priority

function filterTaskByPriority(task, priority) {
  return task.priority === priority;
}

app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseFloat(req.query.priority);
  let result = tasks.filter((task) => filterTaskByPriority(task, priority));
  res.json({ tasks: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
