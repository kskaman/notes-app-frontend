import { redirect } from "react-router";
import users from "../../data/users.json";

import { setInitialCollections } from "../../api/collections";
import { setInitialNotes, setInitialArchivedNotes } from "../../api/notes";
import { setInitialArchivedCollections } from "../../api/collections";

import { getFontTheme } from "../../api/userSettings";
import { parseToken } from "../../utils";

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

  setInitialCollections(token);
  setInitialNotes(token);
  setInitialArchivedCollections(token);
  setInitialArchivedNotes(token);

  const currentTheme = getFontTheme();
  document.documentElement.setAttribute("data-font-theme", currentTheme);
}
