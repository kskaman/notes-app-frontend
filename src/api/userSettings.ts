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

export const getColorTheme = (): "light" | "dark" => {
  const user = store.getState().user;
  if (
    "colorTheme" in user &&
    (user.colorTheme === "light" || user.colorTheme === "dark")
  ) {
    return user.colorTheme;
  }
  return "light"; // default value
};

export const getFontTheme = (): "sans-serif" | "serif" | "monospace" => {
  const user = store.getState().user;
  if (
    "fontTheme" in user &&
    (user.fontTheme === "sans-serif" ||
      user.fontTheme === "serif" ||
      user.fontTheme === "monospace")
  ) {
    return user.fontTheme;
  }
  return "sans-serif"; // default value
};

export const changeColorTheme = (colorTheme: "light" | "dark") => {
  const root = document.documentElement;

  // toggle the .dark class
  if (colorTheme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");

  // optional: hint to browsers for form controls/scrollbars
  root.style.colorScheme = colorTheme;
};

export const requestUpdateColorTheme = (colorTheme: "light" | "dark") => {
  changeColorTheme(colorTheme);
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
