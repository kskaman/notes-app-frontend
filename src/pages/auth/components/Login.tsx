import { Link } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import TextInput from "../../../ui/TextInput";
import Button from "../../../ui/Button";
import Divider from "../../../ui/Divider";
import AuthFormWrapper from "./AuthFormWrapper";
import PasswordTextInput from "../../../ui/PasswordTextInput";

import googleIcon from "../../../assets/images/icon-google.svg";

import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { loginRequest } from "../../../api/auth";
import { TEST_USERS } from "../../../constants/testUsers";

interface FormValues {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Must be a valid email"),
    password: yup.string().required("Password is required"),
  })
  .required();

const Login = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { login } = useAuth();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "testUser@example.com",
      password: "securePassword123",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const result = await loginRequest(data.email, data.password);
      if (!result || (result && result.token == null)) {
        setErrorMessage("Invalid email or password.");
        return;
      }
      console.log("Login successful:", result);
      login({ token: result.token! });
    } catch {
      setErrorMessage("Invalid credentials.");
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-center gap-4">
        <div className="h-8">
          {errorMessage && (
            <p className="text-preset-5 text-(--warning-color) text-center">
              {errorMessage}
            </p>
          )}
          {/* {showVerifyLink && (
          <p className="text-preset-5 text-(--text-primary) text-center">
            <Link
              to="/auth/verify-email"
              className="font-bold hover:underline text-(--text-secondary)"
            >
              Click here
            </Link>
            to resend verification
          </p>
        )} */}
        </div>

        <AuthFormWrapper
          heading="Welcome"
          subHeading="Please log in to continue"
          buttonText={isSubmitting ? "Submitting..." : "Submit"}
          onFormSubmit={handleSubmit(onSubmit)}
        >
          {/* Email */}
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextInput
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                label="Email Address"
                placeholder="Enter your email"
                error={error}
              />
            )}
          />

          {/* Password with “Forgot?” link */}
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <PasswordTextInput
                value={field.value}
                onChange={field.onChange}
                label="Password"
                subLabel={
                  <Link
                    to="/auth/forgot-password"
                    className="underline cursor-pointer 
                  text-preset-7 text-(--subheading-text-1)
                  hover:text-(--link-text-hover-color)"
                  >
                    Forgot
                  </Link>
                }
                error={error}
              />
            )}
          />
        </AuthFormWrapper>

        {/* Divider */}
        <Divider />

        {/* Social login */}
        <p className="text-preset-5 text-(--subheading-text-1) text-center">
          Or log in with
        </p>
        <Button
          variant="outlined"
          width="100%"
          onClick={() => {}}
          icon={<img src={googleIcon} alt={"google icon"} width={"20px"} />}
        >
          Google
        </Button>

        {/* Divider */}
        <Divider />

        {/* Sign up link */}
        <p className="text-preset-5 text-(--subheading-text-1) text-center">
          No account yet?{" "}
          <Link
            to="/auth/signup"
            className="
              cursor-pointer 
              text-preset-5 
              text-(--subheading-text-1)
              hover:text-(--link-text-hover-color)
              hover:font-medium
            "
          >
            Sign Up
          </Link>
        </p>

        {/* ─── Test users table ─── */}
      </div>

      <Divider />

      <div className="w-full">
        <p className="font-medium mb-2">Test users:</p>
        <table className="w-full border-none mb-4">
          <tbody>
            {TEST_USERS.map((user: { email: string; password: string }) => (
              <tr key={user.email}>
                <td className="px-2 py-1">{user.email}</td>
                <td className="py-1 flex justify-end">
                  <Button
                    variant="outlined"
                    width="100px"
                    onClick={() => {
                      setValue("email", user.email);
                      setValue("password", user.password);
                    }}
                  >
                    Fill
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Login;
