// pages/OpenTasksPage.tsx
import React from "react";
import CompletedTasksList from "./CompletedTasksPage.module.css";
import TodoList from "../../features/todo/todoList";

export default function CompletedTasksPage({ doneTasks, onDelete, onToggle }) {
  // const doneTasks = tasks.filter((t) => t?.completed);

  return (
    <div
      className={`${CompletedTasksList.completedTaskscolumn} ${CompletedTasksList.completedTasks}`}
    >
      <h2 className={CompletedTasksList.title}>Completed Tasks</h2>
      <TodoList items={doneTasks} onDelete={onDelete} onToggle={onToggle} />
    </div>
  );
}
