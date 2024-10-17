import { Box, Button, Title, RingProgress } from "@mantine/core";
import {
  IconMail,
  IconUserCircle,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import TextInput from "../Forms/TextInput";
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  usernameValidator,
} from "../Forms/validators";
import { useMutation } from "react-query";
import api from "../../utils/api";
import { showNotification } from "@mantine/notifications";

function SignupForm({ onSwitchToSignIn }) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const mutation = useMutation(
    async (data) => {
      try {
        const res = await api.post(
          "http://localhost:5000/api/user/register",
          data
        );
        return res.data.data;
      } catch (error) {
        showNotification({
          title: "Auth Error",
          message: error.response.data.message || error.response.data.error,
          color: "red",
        });
        throw new Error(error.response.data.message);
      }
    },
    {
      onSuccess: (profile) => {
        showNotification({
          title: "Auth Success",
          message: "User created successffuly",
          color: "teal",
        });
        onSwitchToSignIn();
      },
    }
  );

  const { isLoading, mutate } = mutation;

  const onSubmit = (data) => {
    mutate(data);
  };

  const isFormValid = Object.keys(errors).length === 0;

  return (
    <Box sx={{ padding: 15 }}>
      <Title order={1} size="50px" color="#00008B">
        Create an account
      </Title>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          size="lg"
          name="username"
          placeholder="Username"
          required={true}
          register={register}
          errors={errors}
          validate={{ requiredValidator, usernameValidator }}
          rightSection={<IconUserCircle color="#A9A9A9" />}
        />
        <br />
        <TextInput
          size="lg"
          name="email"
          placeholder="Email"
          required={true}
          register={register}
          errors={errors}
          validate={{ requiredValidator, emailValidator }}
          rightSection={<IconMail color="#A9A9A9" />}
        />
        <br />
        <TextInput
          size="lg"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          withAsterisk
          radius="xl"
          required={true}
          register={register}
          errors={errors}
          validate={{ requiredValidator, passwordValidator }}
          rightSection={
            <IconEye
              color="#A9A9A9"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          }
        />
        <br />
        <TextInput
          size="lg"
          type={showPassword ? "text" : "password"}
          name="confirm_Password"
          placeholder="Confirm Password"
          withAsterisk
          radius="xl"
          required={true}
          register={register}
          errors={errors}
          validate={{
            requiredValidator,
          }}
          rightSection={
            showPassword ? (
              <IconEyeOff
                color="#A9A9A9"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <IconEye color="#A9A9A9" onClick={() => setShowPassword(true)} />
            )
          }
        />
        <br></br>
        <Button
          fullWidth
          style={{
            height: "50px",
          }}
          type="submit"
          color="red"
          radius="xl"
          disabled={isLoading || !isFormValid || !isValid || !isDirty}
        >
          {isLoading ? (
            <RingProgress
              size={40}
              thickness={5}
              roundCaps
              sections={[
                { value: 40, color: "#FFF8DC" },
                { value: 15, color: "#FFF8DC" },
                { value: 15, color: "#FFF8DC" },
                { value: 15, color: "#FFF8DC" },
              ]}
            />
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
    </Box>
  );
}

export default SignupForm;
