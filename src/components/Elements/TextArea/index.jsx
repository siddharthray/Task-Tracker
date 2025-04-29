import React, { useEffect, useRef } from "react";
import styles from "./TextArea.module.css";

export default function TextArea({
  value,
  onChange,
  placeholder,
  className = "",
  wrapperClassName = "",
  labelClassName = "",
  errorClassName = "",
  helperTextClassName = "",
  name,
  id,
  rows = 4,
  maxRows = 8, // Default max rows
  cols,
  maxLength,
  minLength,
  required = false,
  disabled = false,
  readOnly = false,
  autoFocus = false,
  label,
  error,
  helperText,
  onBlur,
  onFocus,
  onKeyDown,
  onKeyUp,
  resize = "vertical", // none, vertical, horizontal, both
  ...restProps
}) {
  const textareaId = id || name;
  const textareaRef = useRef(null);

  // Auto-resize functionality
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Store the current scroll position
    const scrollTop = textarea.scrollTop;

    // Reset height to get the actual content height
    textarea.style.height = "auto";

    // Get the scroll height (content height)
    const scrollHeight = textarea.scrollHeight;

    // Calculate the height based on line height
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight) || 20;
    const maxHeight = maxRows * lineHeight;

    // Set the new height, capped at maxHeight
    textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;

    // If we capped the height, ensure we have scrolling enabled
    if (scrollHeight > maxHeight) {
      textarea.style.overflowY = "auto";
    } else {
      textarea.style.overflowY = "hidden";
    }

    // Restore scroll position
    textarea.scrollTop = scrollTop;
  }, [value, maxRows]);

  return (
    <div className={`${styles.textareaWrapper} ${wrapperClassName}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className={`${styles.textareaLabel} ${labelClassName}`}
        >
          {label}
        </label>
      )}

      <textarea
        ref={textareaRef}
        id={textareaId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        maxLength={maxLength}
        minLength={minLength}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        autoFocus={autoFocus}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        className={`${styles.textarea} ${error ? styles.textareaError : ""} ${
          styles[`resize-${resize}`]
        } ${className}`}
        style={{ minHeight: `${rows * 1.5}em` }} // Set minimum height based on rows
        {...restProps}
      />

      {error && (
        <div className={`${styles.textareaErrorMessage} ${errorClassName}`}>
          {error}
        </div>
      )}

      {helperText && (
        <div className={`${styles.textareaHelperText} ${helperTextClassName}`}>
          {helperText}
        </div>
      )}
    </div>
  );
}
