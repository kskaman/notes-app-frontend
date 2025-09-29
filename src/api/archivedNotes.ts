import archivedNotes from "../data/archived-notes.json";
import { parseToken } from "../utils/tokens";
import { setArchivedNotes } from "./store/reducers/archivedNotesReducer";
import store from "./store/store";

export const setInitialArchivedNotes = (token: string) => {
  const userId = parseToken(token);

  const userNotes = archivedNotes.filter((note) => note.userId === userId);
  return store.dispatch(setArchivedNotes(userNotes ?? []));
};
