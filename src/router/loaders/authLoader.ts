import { redirect } from "react-router";
import users from "../../data/users.json";
import { parseToken } from "../../utils/tokens";

import { setInitialCollections } from "../../api/collections";
import { setInitialNotes } from "../../api/notes";
import { setInitialArchivedCollections } from "../../api/archivedCollections";
import { setInitialArchivedNotes } from "../../api/archivedNotes";

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
}
