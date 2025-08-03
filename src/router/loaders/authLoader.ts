import { redirect } from "react-router";

import { parseToken } from "../../utils/tokens";
import { fetchUsers } from "../../api/auth";

export async function authLoader() {
  const token = localStorage.getItem("accessToken");
  if (!token) throw redirect("/auth/login");

  const userId = parseToken(token);
  if (userId == null) {
    localStorage.removeItem("accessToken");
    throw redirect("/auth/login");
  }

  const users = await fetchUsers();
  const user = users.find((u) => Number(u.id) === userId);

  if (!user) {
    localStorage.removeItem("accessToken");
    throw redirect("/auth/login");
  }

  return { token }; // becomes loader data with id "auth"
}
