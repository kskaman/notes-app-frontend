import { Controller, useForm } from "react-hook-form";
import SettingsSubLayout from "./sub-page";
import PasswordTextInput from "../../../ui/PasswordTextInput";
import Button from "../../../ui/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import store from "../../../store/store";

const schema = yup.object({
  currentPassword: yup.string().required("Old password is required"),
  newPassword: yup.string().required("New password is required"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your new password"),
});
const ChangePasswordPage = () => {
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

  const onSubmit = (data: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }) => {
    store.dispatch({
      type: "user/updatePassword",
      payload: {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
    });
  };

  return (
    <SettingsSubLayout heading="Change Password">
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
