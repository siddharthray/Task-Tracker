import React from "react";
import styleTaskList from "./TaskList.module.css";
import CompletedTasksPage from "../../../pages/CompletedTasksList";
import OpenTasksPage from "../../../pages/OpenTasksList";

type Task = {
  id: string | null;
  text: string;
  createdAt: Date | null;
  reopenedAt: Date | null;
  completed: boolean;
};

export default function TaskList({
  openTasks,
  doneTasks,
  onDelete,
  onToggle,
  onEdit,
}) {
  return (
    <div className={`${styleTaskList.row} ${styleTaskList.thirdRow}`}>
      {/* Open Tasks */}
      <OpenTasksPage
        openTasks={openTasks}
        onDelete={onDelete}
        onToggle={onToggle}
        onEdit={onEdit}
        title={"Open Tasks"}
      />

      {/* Completed Tasks */}
      <CompletedTasksPage
        doneTasks={doneTasks}
        onDelete={onDelete}
        onToggle={onToggle}
        title={"Completed Tasks"}
      />
    </div>
  );
}
