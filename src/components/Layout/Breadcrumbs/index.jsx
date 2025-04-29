// components/Layout/Breadcrumbs/Breadcrumbs.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";

export default function Breadcrumbs({
  items = [],
  className = "",
  separator = "/",
  home = { label: "Home", path: "/" },
  showHome = true,
  ...restProps
}) {
  const allItems = showHome ? [home, ...items] : items;

  return (
    <nav
      className={`${styles.breadcrumbs} ${className}`}
      aria-label="breadcrumb"
      {...restProps}
    >
      <ol className={styles.breadcrumbsList}>
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;

          return (
            <li
              key={index}
              className={`${styles.breadcrumbsItem} ${
                isLast ? styles.active : ""
              }`}
              aria-current={isLast ? "page" : undefined}
            >
              {isLast ? (
                <span>{item.label}</span>
              ) : (
                <>
                  <Link to={item.path}>{item.label}</Link>
                  <span className={styles.separator}>{separator}</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
