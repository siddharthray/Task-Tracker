import { useState, useEffect, useCallback } from "react";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetchTasks().then(setTasks).catch(console.error);
  }, []);

  const addTask = useCallback(
    (task) =>
      createTask(task)
        .then((newT) => setTasks((ts) => [...ts, newT]))
        .catch(console.error),
    []
  );

  const removeTask = useCallback(
    (id) =>
      deleteTask(id)
        .then(() => setTasks((ts) => ts.filter((t) => t.id !== id)))
        .catch(console.error),
    []
  );

  const toggleTask = useCallback(
    (id) => {
      const t = tasks.find((x) => x.id === id);
      if (!t) return;
      return updateTask(id, { completed: !t.completed })
        .then((u) =>
          setTasks((tasks) => tasks.map((x) => (x.id === id ? u : x)))
        )
        .catch(console.error);
    },
    [tasks]
  );

  const saveEdit = useCallback(
    (id, text) =>
      updateTask(id, { text, updatedAt: new Date().toISOString() })
        .then((u) =>
          setTasks((tasks) => tasks.map((x) => (x.id === id ? u : x)))
        )
        .catch(console.error),
    []
  );

  return {
    tasks,
    openTasks: tasks.filter((t) => !t.completed),
    doneTasks: tasks.filter((t) => t.completed),
    addTask,
    removeTask,
    toggleTask,
    saveEdit,
  };
}
