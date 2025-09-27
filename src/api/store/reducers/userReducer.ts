import { createSlice } from "@reduxjs/toolkit";
import users from "../../../data/users.json";
import { parseToken } from "../../../utils/tokens";

const getInitialUserState = () => {
  const accessToken = localStorage.getItem("accessToken");
  const userId = parseToken(accessToken!);
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return { status: 401, error: "Unauthorized" };
  }

  return user;
};

const userSlice = createSlice({
  name: "user",
  initialState: getInitialUserState(),
  reducers: {
    updateColorTheme: (state, action) => {
      if ("colorTheme" in state) {
        state.colorTheme = action.payload;
      }
    },
    updateFontTheme: (state, action) => {
      if ("fontTheme" in state) {
        state.fontTheme = action.payload;
      }
    },
    updatePassword: (state, action) => {
      if ("password" in state) {
        const { currentPassword, newPassword } = action.payload;
        if (state.password === currentPassword) {
          state.password = newPassword;
        } else {
          return { status: 403, error: "Current Password is incorrect" };
        }
      }
    },
  },
});

export const { updateColorTheme, updateFontTheme, updatePassword } =
  userSlice.actions;
export default userSlice.reducer;
