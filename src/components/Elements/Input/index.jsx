export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  wrapperClassName = "",
  labelClassName = "",
  errorClassName = "",
  helperTextClassName = "",
  required = false,
  name,
  id,
  disabled = false,
  readOnly = false,
  autoFocus = false,
  min,
  max,
  step,
  pattern,
  maxLength,
  minLength,
  autoComplete = "off",
  checked,
  multiple,
  accept,
  onBlur,
  onFocus,
  onKeyDown,
  onKeyUp,
  size,
  label,
  error,
  helperText,
  ...restProps
}) {
  const inputId = id || name;

  return (
    <div className={`input-wrapper ${wrapperClassName}`}>
      {label && (
        <label htmlFor={inputId} className={`input-label ${labelClassName}`}>
          {label}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input ${error ? "input-error" : ""} ${className}`}
        required={required}
        name={name}
        id={inputId}
        disabled={disabled}
        readOnly={readOnly}
        autoFocus={autoFocus}
        min={min}
        max={max}
        step={step}
        pattern={pattern}
        maxLength={maxLength}
        minLength={minLength}
        autoComplete={autoComplete}
        checked={checked}
        multiple={multiple}
        accept={accept}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        size={size}
        {...restProps}
      />

      {error && (
        <div className={`input-error-message ${errorClassName}`}>{error}</div>
      )}

      {helperText && (
        <div className={`input-helper-text ${helperTextClassName}`}>
          {helperText}
        </div>
      )}
    </div>
  );
}
