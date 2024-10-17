export const confirmPasswordValidator = (value, passwordValue) => {
  if (!value) {
    return "This field is required";
  }

  if (value !== passwordValue) {
    return "Passwords do not match";
  }
};
