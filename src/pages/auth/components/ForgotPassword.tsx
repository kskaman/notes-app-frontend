import { Link } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import TextInput from "../../../ui/TextInput";
import Divider from "../../../ui/Divider";
import AuthFormWrapper from "./AuthFormWrapper";

interface FormValues {
  email: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Must be a valid email"),
  })
  .required();

const ForgotPassword = () => {
  // const [message, setMessage] = useState<string | null>(null);
  // const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { email: "" },
  });

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* {message && (
        <p className="mt-4 text-preset-5 text-green-600 text-center">
          {message}
        </p>
      )}
      {errorMessage && (
        <p className="mt-4 text-preset-5 text-red-600 text-center">
          {errorMessage}
        </p>
      )} */}

      <p className="mt-4 text-preset-5 text-red-600 text-center">
        {`"Forgot Password" functionality is disabled for frontend demo. 
          Please go to Login page and use one of the test accounts.`}
      </p>

      <AuthFormWrapper
        heading="Forgotten your password?"
        subHeading="Enter your email below, and we'll send you a link to reset it."
        buttonText={isSubmitting ? "Sending..." : "Send Reset Link"}
        onFormSubmit={handleSubmit(() => {})}
        submitDisabled={true}
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
              disabled={true}
            />
          )}
        />
      </AuthFormWrapper>

      {/* Divider */}
      <Divider />

      {/* Sign up link */}
      <p className="text-preset-5 text-(--subheading-text-1) text-center">
        Got The Password?{" "}
        <Link
          to="/auth/login"
          className="
              cursor-pointer 
              text-preset-5 
              text-(--subheading-text-1)
              hover:font-medium
              hover:text-(--link-text-hover-color)
            "
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
