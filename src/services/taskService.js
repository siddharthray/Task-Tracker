// src/services/taskService.js
//this is being repead code, fix it
const tasks = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];

// Fetch all tasks
export function fetchTasks() {
  return Promise.resolve(tasks);
}

export function fetchTaskById(id) {
  return Promise.resolve(tasks.find((task) => task.id === id) || null);
}

// Create a new task
export function createTask(text) {
  const newTask = {
    id: Date.now(),
    text,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  return Promise.resolve(newTask);
}

// Delete a task
export function deleteTask(id) {
  return Promise.resolve(
    tasks.splice(
      tasks.findIndex((task) => task.id === id),
      1
    )
  );
}

// Update a task
export function updateTask(id, updates) {
  return new Promise((resolve, reject) => {
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return reject(new Error("Task not found"));
    }
    const updatedTask = { ...tasks[index], ...updates };
    tasks[index] = updatedTask;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    resolve(updatedTask);
  });
}
