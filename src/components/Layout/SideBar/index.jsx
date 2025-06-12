import React from "react";
import { NavLink } from "react-router";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebarInner}>
      {/* <div className={styles.sidebarHeader}>
        <button className={styles.closeButton} onClick={onClose} type="button">
          &times;
        </button>
      </div> */}

      <div className={styles.sidebarContent}>
        <nav>
          <ul className={styles.sidebarNav}>
            <li>
              <NavLink
                to="/tasks"
                end
                className={({ isActive }) =>
                  isActive ? styles.activeLink : ""
                }
              >
                <span className={styles.icon}>🏠</span>
                <span className={styles.label}>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tasks/openTasks"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : ""
                }
              >
                <span className={styles.icon}>📝</span>
                <span className={styles.label}>Open Tasks</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tasks/completedTasks"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : ""
                }
              >
                <span className={styles.icon}>✅</span>
                <span className={styles.label}>Completed Tasks</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : ""
                }
              >
                <span className={styles.icon}>⚙️</span>
                <span className={styles.label}>Settings</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
