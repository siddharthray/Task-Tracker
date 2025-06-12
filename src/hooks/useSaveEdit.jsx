import { useCallback } from "react";
import { updateTask } from "../services/taskService";

export function useSaveEdit(setTasks, setEditingTask) {
  return useCallback(
    async (id, newText) => {
      try {
        const updated = await updateTask(id, { text: newText });
        setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
        setEditingTask(null);
      } catch (err) {
        console.error("Edit failed:", err);
      }
    },
    [setTasks, setEditingTask]
  );
}
