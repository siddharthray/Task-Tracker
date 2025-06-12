// pages/CompletedPage.tsx
import CompletedTasksList from "./CompletedTasksPage.module.css";
import TodoList from "../../features/todo/todoList";
import { useTasks } from "../../hooks/useTasks";

export default function CompletedTasksPage({ title }) {
  // const doneTasks = tasks.filter((t) => t?.completed);
  const { doneTasks, removeTask, toggleTask, saveEdit } = useTasks();

  return (
    <div
      className={`${CompletedTasksList.completedTaskscolumn} ${CompletedTasksList.completedTasks}`}
    >
      <h2 className={CompletedTasksList.title}>{title}</h2>
      <TodoList
        items={doneTasks}
        onDelete={removeTask}
        onToggle={toggleTask}
        onEdit={saveEdit}
      />
    </div>
  );
}
