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
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@_])[A-Za-z\d#@_]{8,20}$/,
        "8–20 chars, upper, lower, digit & #@_"
      ),
  })
  .required();

const Signup = () => {
  // const [successMessage, setSuccessMessage] = useState<string | null>(null);
  // const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="h-8">
        {/* {(successMessage || errorMessage) && (
          <div className="w-full max-w-[396px] mx-auto">
            {successMessage && (
              <p className="text-preset-5 text-(--success-color) text-center">
                {successMessage}
              </p>
            )}
            {errorMessage && (
              <p className="text-preset-5 text-(--warning-color) text-center">
                {errorMessage}
              </p>
            )}
          </div>
        )} */}
        <p className="text-preset-5 text-(--warning-color) text-center">
          {`"Sign Up" functionality is disabled for frontend demo. 
          Please go to Login page and use one of the test accounts.`}
        </p>
      </div>

      <AuthFormWrapper
        heading="Create Your Account"
        subHeading="Sign up to start organizing your notes and boost productivity"
        buttonText={isSubmitting ? "Submitting..." : "Submit"}
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

        {/* Password with “Forgot?” link */}
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <PasswordTextInput
              value={field.value}
              onChange={field.onChange}
              label="Password"
              error={error}
              disabled={true}
            />
          )}
        />
      </AuthFormWrapper>

      {/* Divider */}
      <Divider />

      {/* Social login */}
      <p className="text-preset-5 text-(--subheading-text-1) text-center">
        Or sign up with
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
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="
              cursor-pointer 
              text-preset-5 
              text-(--subheading-option-one-text)
              hover:text-(--link-text-hover-color)
              hover:font-medium
            "
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
