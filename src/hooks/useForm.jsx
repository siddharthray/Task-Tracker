import { useState, useCallback } from "react";

/**
 * Custom hook for form management
 * @param {object} initialValues - Initial form values
 * @param {function} onSubmit - Function to call on successful form submission
 * @param {function} validate - Optional validation function
 * @returns {object} Form state and handlers
 */
export default function useForm(
  initialValues = {},
  onSubmit = () => {},
  validate = () => ({})
) {
  // Form values state
  const [values, setValues] = useState(initialValues);
  // Form errors state
  const [errors, setErrors] = useState({});
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Form touched fields state
  const [touched, setTouched] = useState({});

  // Reset form to initial values
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Handle field change
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;

    // Handle different input types
    const fieldValue = type === "checkbox" ? checked : value;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: fieldValue,
    }));
  }, []);

  // Set field value programmatically
  const setFieldValue = useCallback((name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  // Handle field blur (for validation on blur)
  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target;

      // Mark field as touched
      setTouched((prevTouched) => ({
        ...prevTouched,
        [name]: true,
      }));

      // Validate field on blur
      const validationErrors = validate(values);
      setErrors(validationErrors);
    },
    [validate, values]
  );

  // Mark field as touched programmatically
  const setFieldTouched = useCallback((name, isTouched = true) => {
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: isTouched,
    }));
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(
    (e) => {
      if (e) e.preventDefault();

      // Mark all fields as touched
      const touchedFields = Object.keys(values).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {});
      setTouched(touchedFields);

      // Validate all fields
      const validationErrors = validate(values);
      setErrors(validationErrors);

      // If no errors, submit the form
      if (Object.keys(validationErrors).length === 0) {
        setIsSubmitting(true);

        // Call onSubmit callback with form values
        try {
          onSubmit(values, {
            resetForm,
            setErrors,
            setSubmitting: setIsSubmitting,
          });
        } catch (error) {
          console.error("Form submission error:", error);
          setIsSubmitting(false);
        }
      }
    },
    [values, validate, onSubmit, resetForm]
  );

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    resetForm,
    setErrors,
  };
}
