import React from "react";
import { NavLink } from "react-router";
import navStyles from "./NavBar.module.css";

export default function NavBar({ onMenuClick }) {
  return (
    <nav className={navStyles.navbar}>
      <div className={navStyles.navbarStart}>
        <button className={navStyles.menuButton} onClick={onMenuClick}>
          <span className={navStyles.hamburger}></span>
        </button>
        <div className={navStyles.logo}>Task Tracker</div>
      </div>

      <ul className={navStyles.navbarLink}>
        <li>
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              isActive ? navStyles.activeLink : navStyles.navbarLink
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/openTasks"
            className={({ isActive }) =>
              isActive ? navStyles.activeLink : navStyles.navbarLink
            }
          >
            Open Task
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/completedTasks"
            className={({ isActive }) =>
              isActive ? navStyles.activeLink : navStyles.navbarLink
            }
          >
            Completed Task
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
