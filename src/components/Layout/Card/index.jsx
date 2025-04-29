import React from "react";
import styles from "./Card.module.css";

export default function Card({
  children,
  className = "",
  title,
  subtitle,
  footer,
  headerClassName = "",
  bodyClassName = "",
  footerClassName = "",
  elevation = 1, // 0-5
  bordered = true,
  ...restProps
}) {
  return (
    <div
      className={`${styles.card} ${styles[`elevation-${elevation}`]} ${
        bordered ? styles.bordered : ""
      } ${className}`}
      {...restProps}
    >
      {(title || subtitle) && (
        <div className={`${styles.cardHeader} ${headerClassName}`}>
          {title && <h3 className={styles.cardTitle}>{title}</h3>}
          {subtitle && <div className={styles.cardSubtitle}>{subtitle}</div>}
        </div>
      )}

      <div className={`${styles.cardBody} ${bodyClassName}`}>{children}</div>

      {footer && (
        <div className={`${styles.cardFooter} ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  );
}
