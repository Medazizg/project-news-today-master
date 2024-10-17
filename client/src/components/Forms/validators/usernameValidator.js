const usernameValidator = (fieldValue) => {
  const emailRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{4,})/;
  return !emailRegex.test(fieldValue)
    ? "username must at least contains a lowercase caracter, an uppercase caracter and a number, and length must be equal or greater than 4"
    : null;
};

export default usernameValidator;
