import React from "react";
import styles from "./Section.module.css";

export default function Section({
  children,
  className = "",
  title,
  subtitle,
  padding = "normal", // none, small, normal, large
  background = "transparent", // transparent, light, dark, primary
  divider = false,
  ...restProps
}) {
  return (
    <section
      className={`
        ${styles.section} 
        ${styles[`padding-${padding}`]} 
        ${styles[`bg-${background}`]} 
        ${divider ? styles.withDivider : ""}
        ${className}
      `}
      {...restProps}
    >
      {(title || subtitle) && (
        <div className={styles.sectionHeader}>
          {title && <h2 className={styles.sectionTitle}>{title}</h2>}
          {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
        </div>
      )}
      <div className={styles.sectionContent}>{children}</div>
    </section>
  );
}
