import { Controller, useForm } from "react-hook-form";
import SettingsSubLayout from "./settings-sub-layout";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { requestUpdatePassword } from "../../../api/userSettings";
import { useState } from "react";
import { Button, PasswordTextInput } from "../../../ui";

const schema = yup.object({
  currentPassword: yup.string().required("Old password is required"),
  newPassword: yup.string().required("New password is required"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your new password"),
});
const ChangePasswordPage = () => {
  const [response, setResponse] = useState<{
    status: "success" | "error";
    message: string;
  } | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<{
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }>({
    resolver: yupResolver(schema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (data: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }) => {
    const res = await requestUpdatePassword(
      data.currentPassword,
      data.newPassword
    );
    setResponse(res);
  };

  return (
    <SettingsSubLayout heading="Change Password">
      <div className="h-8 flex items-center">
        {response && (
          <p
            className={`text-sm ${
              response.status === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {response.message}
          </p>
        )}
      </div>
      <form
        className="w-full lg:max-w-[572px] flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="currentPassword"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <PasswordTextInput
              label="Old Password"
              value={field.value}
              onChange={field.onChange}
              disabled={isSubmitting}
              error={error}
            />
          )}
        />
        <Controller
          name="newPassword"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <PasswordTextInput
              label="New Password"
              value={field.value}
              onChange={field.onChange}
              disabled={isSubmitting}
              error={error}
            />
          )}
        />
        <Controller
          name="confirmNewPassword"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <PasswordTextInput
              label="Confirm New Password"
              value={field.value}
              onChange={field.onChange}
              disabled={isSubmitting}
              error={error}
            />
          )}
        />

        <div className="w-full flex justify-end mt-4">
          <Button
            variant="primary"
            disabled={isSubmitting}
            width="132px"
            height="41px"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </SettingsSubLayout>
  );
};

export default ChangePasswordPage;
