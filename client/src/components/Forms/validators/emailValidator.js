const emailValidator = (fieldValue) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !emailRegex.test(fieldValue) ? "Invalid email address" : null;
};

export default emailValidator;
