import styles from "./Home.module.css";
import TodoApp from "../../features/TodoApp";

export default function Home() {
  return (
    <div className={styles.container}>
      <TodoApp />
    </div>
  );
}
