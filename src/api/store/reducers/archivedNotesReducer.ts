import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Note } from "../../../types/note";

const notesSlice = createSlice({
  name: "archivedNotes",
  initialState: [] as Note[],
  reducers: {
    setArchivedNotes: (_state, action: PayloadAction<Note[]>) => {
      return action.payload;
    },
    resetArchivedNotes: () => {
      return [];
    },
    addNote: (state, action: PayloadAction<Note>) => {
      state.push(action.payload);
    },
  },
});

export const { setArchivedNotes, resetArchivedNotes, addNote } =
  notesSlice.actions;
export default notesSlice.reducer;
