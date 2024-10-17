import { Box, Button, Title, RingProgress } from "@mantine/core";
import { IconMail, IconEye, IconEyeOff } from "@tabler/icons-react";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import TextInput from "../Forms/TextInput";
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
} from "../Forms/validators";
import setAuthToken from "../../utils/setAuthToken";
import { showNotification } from "@mantine/notifications";

function Loginform() {
  const navigate = useNavigate();
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
        const res = await axios.post(
          "http://localhost:5000/api/user/login",
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
        setAuthToken(profile, navigate);
      },
    }
  );

  const { isLoading, mutate } = mutation;

  const onSubmit = (data) => {
    mutate(data);
  };

  const isFormValid = Object.keys(errors).length === 0;

  return (
    <Box
      sx={{
        padding: 15,
      }}
    >
      <Title order={1} size="50px" color="#00008B">
        Login
      </Title>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <br />
        <TextInput
          size="lg"
          name="email"
          placeholder="Email"
          required={true}
          register={register}
          errors={errors}
          validate={{
            requiredValidator,
            emailValidator,
          }}
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
        <Button
          fullWidth
          style={{
            height: "50px",
            marginTop: 30,
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
            "Sign In"
          )}
        </Button>
      </form>
    </Box>
  );
}

export default Loginform;
