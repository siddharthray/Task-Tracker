// pages/OpenTasksPage.tsx
import TodoList from "../../features/todo/todoList";
import openTasksList from "./OpenTasksPage.module.css";
import { useTasks } from "../../hooks/useTasks";

export default function OpenTasksPage({ title = "Open Tasks" }) {
  // const openTasks = tasks.filter((t) => !t?.completed);
  const { openTasks, removeTask, toggleTask, saveEdit } = useTasks();

  return (
    <div
      className={`${openTasksList.openTasksColumn} ${openTasksList.openTasks}`}
    >
      <h2 className={openTasksList.title}>{title}</h2>
      <TodoList
        items={openTasks}
        onDelete={removeTask}
        onToggle={toggleTask}
        onEdit={saveEdit}
      />
    </div>
  );
}
