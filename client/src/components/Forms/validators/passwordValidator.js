const passwordValidator = (fieldValue) => {
  if (!fieldValue) {
    return "Password is required";
  }

  if (fieldValue.length < 8) {
    return "Password must be at least 8 characters";
  }

  if (!/(?=.*[A-Z])/.test(fieldValue)) {
    return "Password must contain at least one uppercase letter";
  }

  if (!/(?=.*[a-z])/.test(fieldValue)) {
    return "Password must contain at least one lowercase letter";
  }

  if (!/(?=.*\d)/.test(fieldValue)) {
    return "Password must contain at least one digit";
  }

  return null;
};

export default passwordValidator;
