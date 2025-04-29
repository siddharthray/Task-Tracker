// components/Layout/Divider/Divider.jsx
import React from "react";
import styles from "./Divider.module.css";

export default function Divider({
  className = "",
  vertical = false,
  text = "",
  type = "solid", // solid, dashed, dotted
  spacing = "medium", // small, medium, large
  color = "default", // default, light, dark
  ...restProps
}) {
  return (
    <div
      className={`
        ${styles.divider}
        ${vertical ? styles.vertical : styles.horizontal}
        ${styles[`type-${type}`]}
        ${styles[`spacing-${spacing}`]}
        ${styles[`color-${color}`]}
        ${className}
      `}
      {...restProps}
    >
      {text && <span className={styles.dividerText}>{text}</span>}
    </div>
  );
}
