const requiredValidator = (fieldValue) => {
  return !fieldValue ? "Required" : null;
};

export default requiredValidator;
