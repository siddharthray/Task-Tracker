import { useState, useEffect, useCallback } from "react";
import { Navigate, Route, Routes } from "react-router";
import Tasks from "../pages/Task";
import OpenTasksPage from "../pages/OpenTasksList";
import CompletedTasksPage from "../pages/CompletedTasksList";
import TaskDetailsPage from "../pages/TaskDetailsPage";

export default function TodoApp() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });
  const [editingTask, setEditingTask] = useState(null);

  const openTasks = tasks ? tasks.filter((t) => !t?.completed) : [];
  const doneTasks = tasks ? tasks.filter((t) => t?.completed) : [];

  // Persist on every change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add new
  const handleAddTask = useCallback((newTask) => {
    setTasks((prev) => [...prev, newTask]);
  }, []);

  // Delete
  const handleDelete = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Toggle complete ↔ reopen (with timestamps)
  const handleToggle = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: !t.completed,
              completedAt: !t.completed ? new Date().toISOString() : null,
              reopenedAt: t.completed ? new Date().toISOString() : null,
            }
          : t
      )
    );
  }, []);

  // Start editing: load the task into the form
  const handleEditStart = useCallback((task) => {
    setEditingTask(task);
  }, []);

  // Save edited text, then clear edit mode
  const handleSaveEdit = useCallback((id, newText, updatedAt) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, text: newText, updatedAt: updatedAt } : t
      )
    );
    setEditingTask(null);
  }, []);

  return (
    <Routes>
      {/* Redirect root → /tasks */}
      <Route path="/" element={<Navigate to="/tasks" replace />} />
      {/* List view */}
      <Route
        path="tasks"
        element={
          <Tasks
            onAddTask={handleAddTask}
            editingTask={editingTask}
            onSaveEdit={handleSaveEdit}
            openTasks={openTasks}
            doneTasks={doneTasks}
            onDelete={handleDelete}
            onToggle={handleToggle}
            onEdit={handleEditStart}
            title="Task Tracker"
            description="Keep track of your tasks: add new ones, mark them done, or reopen."
          />
        }
      />
      <Route
        path="/task/:id"
        element={<TaskDetailsPage allTasks={tasks} onSave={handleSaveEdit} />}
      />

      {/* Detail view with nested edit form */}
      {/* <Route
          path="tasks/:id"
          element={
            <TaskDetailPage
              task={tasks}
              onDelete={handleDelete}
              onToggle={handleToggle}
              onEdit={handleEditStart}
            />
          }
        > */}
      {/* nested route for editing */}
      {/* <Route
            path="edit"
            element={
              <TaskEditForm
                editingTask={editingTask}
                onAddTask={handleAddTask}
                onSaveEdit={handleSaveEdit}
              />
            }
          />
        </Route> */}

      {/* Fallback */}
      <Route
        path="/openTasks"
        element={
          <OpenTasksPage
            openTasks={openTasks}
            onDelete={handleDelete}
            onToggle={handleToggle}
            onEdit={handleEditStart}
          />
        }
      />
      <Route
        path="/completedTasks"
        element={
          <CompletedTasksPage
            doneTasks={doneTasks}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        }
      />
      <Route path="*" element={<h2>404: Not Found</h2>} />
    </Routes>
  );
}
