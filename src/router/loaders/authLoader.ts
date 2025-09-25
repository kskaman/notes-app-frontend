import { redirect } from "react-router";
import users from "../../data/users.json";
import { parseToken } from "../../utils/tokens";

export async function authLoader() {
  const token = localStorage.getItem("accessToken");
  if (!token) throw redirect("/auth/login");

  const userId = parseToken(token);
  if (userId == null) {
    localStorage.removeItem("accessToken");
    throw redirect("/auth/login");
  }

  const user = users.find((u) => u.id === userId);

  if (!user) {
    localStorage.removeItem("accessToken");
    throw redirect("/auth/login");
  }

  return { token }; // becomes loader data with id "auth"
}
