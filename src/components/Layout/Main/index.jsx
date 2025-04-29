import React from "react";
import styles from "./MainContent.module.css";

export default function MainContent({
  children,
  className = "",
  padding = "normal", // none, small, normal, large
  fullWidth = false,
  ...restProps
}) {
  return (
    <main
      className={`
        ${styles["main-content"]}
        ${styles[`padding-${padding}`]}
        ${fullWidth ? styles.fullWidth : ""}
        ${className}
      `}
      {...restProps}
    >
      {children}
    </main>
  );
}
