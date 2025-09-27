import store from "./store/store";

export const requestUpdatePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<{ status: "success" | "error"; message: string }> => {
  try {
    store.dispatch({
      type: "user/updatePassword",
      payload: { currentPassword, newPassword },
    });

    return { status: "success", message: "Password updated successfully" };
  } catch {
    return { status: "error", message: "Failed to update password" };
  }
};

export const requestUpdateColorTheme = (colorTheme: "light" | "dark") => {
  store.dispatch({
    type: "user/updateColorTheme",
    payload: colorTheme,
  });
};

export const requestUpdateFontTheme = (
  fontTheme: "sans-serif" | "serif" | "monospace"
) => {
  store.dispatch({
    type: "user/updateFontTheme",
    payload: fontTheme,
  });
};
