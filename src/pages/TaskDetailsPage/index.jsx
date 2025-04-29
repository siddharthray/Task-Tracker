// pages/TaskDetailsPage.jsx
import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import TaskDetails from "../../features/todo/TaskDetails";

export default function TaskDetailsPage({ allTasks, onSave }) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // 1) try to get the passed-in task:
  const passedTask = location.state?.task;

  // 2) fallback: look it up from your tasks store/prop:
  const task = passedTask || allTasks.find((t) => t.id === id);
  const [updatedTask, setUpdatedTask] = useState(task);

  if (!task) {
    return (
      <div>
        <p>Task not found.</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const handleChange = (e) => {
    e.preventDefault();
    const updatedTask = {
      ...task,
      text: e.target.value,
      updatedAt: new Date(),
    };
    // console.log("Updated task:", updatedTask);
    setUpdatedTask(updatedTask);
    // persist changes, then…

    // update task.text in component state or your store
  };

  const handleSave = (updatedTask) => {
    // save the updated task to your store or API
    console.log("Saving task:", updatedTask);
    onSave(updatedTask.id, updatedTask.text, updatedTask.updatedAt);
    navigate(-1);
  };

  return (
    <TaskDetails task={updatedTask} onChange={handleChange} onSave={handleSave}>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <p>Make sure to review the task details before proceeding.</p>
    </TaskDetails>
  );
}
