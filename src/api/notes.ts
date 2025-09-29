import notes from "../data/notes.json";
import { parseToken } from "../utils/tokens";
import { setNotes } from "./store/reducers/notesReducer";
import store from "./store/store";

export const setInitialNotes = (token: string) => {
  const userId = parseToken(token);

  const userNotes = notes.filter((note) => note.userId === userId);
  return store.dispatch(setNotes(userNotes ?? []));
};
