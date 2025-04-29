import styles from "./Button.module.css";

export default function Button({
  children,
  text,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  ...restProps
}) {
  const content = children || text;

  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[variant]} ${styles[size]} ${
        fullWidth ? styles.fullWidth : ""
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...restProps}
    >
      {content}
    </button>
  );
}
