import { toast } from "react-toastify";

// Reusable function for form validation
export const validateForm = (requiredFields, formValues, fieldLabels) => {
  // Check for empty required fields in the form
  const emptyFields = requiredFields.filter((field) => !formValues[field]);

  // Display a toast message for empty fields in the form
  if (emptyFields.length > 0) {
    const errorFields = emptyFields.map((field) => fieldLabels[field]);
    toast.error(`Please fill in all required fields: ${errorFields.join(",")}`);
    return false; // Validation failed
  }

  return true; // Validation passed
};
