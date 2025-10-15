import { createSlice } from "@reduxjs/toolkit";
import type { Note } from "../../../types/note";
import { createNoteReducers } from "../../../utils/state";

const noteReducers = createNoteReducers<Note>();

const notesSlice = createSlice({
  name: "notes",
  initialState: [] as Note[],
  reducers: {
    setNotes: noteReducers.set,
    resetNotes: noteReducers.reset,
    addNote: noteReducers.add,
    renameNote: noteReducers.rename,
    deleteNote: noteReducers.deleteByIdObject,
  },
});

export const { setNotes, resetNotes, addNote, renameNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
