import { createSlice } from "@reduxjs/toolkit";
import notes from "../../../data/notes.json";
import { parseToken } from "../../../utils/tokens";

const getInitialNotesState = () => {
  const accessToken = localStorage.getItem("accessToken");
  const userId = parseToken(accessToken!);

  const userNotes = notes.filter((note) => note.userId === userId);
  return userNotes ?? [];
};

const notesSlice = createSlice({
  name: "notes",
  initialState: getInitialNotesState(),
  reducers: {},
});

export default notesSlice.reducer;
