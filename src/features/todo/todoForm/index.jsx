import { useState, useEffect } from "react";
import styles from "./TodoForm.module.css";

export default function TodoForm({
  onAddTask,
  editingTask = null,
  onSaveEdit = null,
}) {
  const [inputValue, setInputValue] = useState("");

  // When editingTask changes, prefill the input
  useEffect(() => {
    if (editingTask) {
      setInputValue(editingTask.text);
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    if (editingTask && onSaveEdit) {
      onSaveEdit(editingTask.id, text);
    } else {
      const newTask = {
        id: Date.now(),
        text,
        completed: false,
        createdAt: new Date().toISOString(),
        completedAt: null,
        reopenedAt: null,
      };
      onAddTask(newTask);
    }

    // Reset form & exit edit mode
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles["todo-form-container"]}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter new task"
        className={styles["todo-input"]}
        autoFocus
      />
      <button
        type="submit"
        disabled={!inputValue.trim()}
        className={styles["add-task-button"]}
      >
        {editingTask ? "Save" : "Add Task"}
      </button>
    </form>
  );
}
