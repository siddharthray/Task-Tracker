import { Link, useNavigate } from "react-router";
import styles from "./TodoItem.module.css";

export default function TodoItem({ item, onDelete, onToggle, onEdit }) {
  const navigate = useNavigate();
  const showDetails = () => {
    // push new URL + pass state
    navigate(`/task/${item.id}`, { state: { task: item } });
  };
  return (
    <li className={styles.todoItem}>
      <div className={styles.content}>
        <div className={styles.left}>
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => onToggle(item.id)}
          />
          <span
            className={!item.completed ? styles.todoText : ""}
            onClick={!item.completed ? showDetails : null}
          >
            {item.text}
            <span className={styles.showMore}>Show More</span>
          </span>

          {/* <Link
            to={`/task/${item.id}`}
            state={{ task: item }}
            className={styles.todoText}
          >
            {item.text}
          </Link> */}
        </div>
        <div className={styles.actions}>
          {!item.completed && onEdit && (
            <button
              className={`${styles.button} ${styles.editButton}`}
              onClick={() => onEdit(item)}
            >
              Edit
            </button>
          )}
          <button
            className={`${styles.button} ${styles.deleteButton}`}
            onClick={() => onDelete(item.id)}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Row 2: timestamps below */}
      <div className={styles.timestamps}>
        <div className={styles.timestamp}>
          <span className={styles.timestampLabel}>Created:</span>
          <span className={styles.timestampValue}>
            {new Date(item.createdAt).toLocaleString()}
          </span>
        </div>

        {item.completed && (
          <div className={styles.timestamp}>
            <span className={styles.timestampLabel}>Completed:</span>
            <span className={styles.timestampValue}>
              {new Date(item.completedAt).toLocaleString()}
            </span>
          </div>
        )}

        {!item.completed && item.reopenedAt && (
          <div className={styles.timestamp}>
            <span className={styles.timestampLabel}>Reopened:</span>
            <span className={styles.timestampValue}>
              {new Date(item.reopenedAt).toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </li>
  );
}
