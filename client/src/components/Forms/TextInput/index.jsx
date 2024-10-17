import { TextInput } from "@mantine/core";
import React from "react";
import PropTypes from "prop-types";

const TextField = ({
  name,
  placeholder,
  register,
  required = false,
  errors = {},
  validate,
  ...rest
}) => {
  return (
    <TextInput
      name={name}
      placeholder={`${placeholder}${required ? "*" : ""}`}
      {...register(name, {
        validate,
      })}
      radius="xl"
      size="md"
      error={errors?.[name]?.message}
      {...rest}
    />
  );
};

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  required: PropTypes.bool,
  errors: PropTypes.object,
  validate: PropTypes.object,
};

export default TextField;
