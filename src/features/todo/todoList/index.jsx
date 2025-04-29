import TodoItem from "../todoItem";
import styles from "./todoList.module.css";

// list all the todo Items
export default function TodoList({ items, onDelete, onToggle, onEdit = null }) {
  if (items.length === 0) return <p>No tasks yet.</p>;
  return (
    <ul className={styles.todoList}>
      {items.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
