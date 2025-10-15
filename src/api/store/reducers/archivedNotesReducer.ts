import { createSlice } from "@reduxjs/toolkit";
import type { Note } from "../../../types/note";
import { createNoteReducers } from "../../../utils/state";

const noteReducers = createNoteReducers<Note>();

const archivedNotesSlice = createSlice({
  name: "archivedNotes",
  initialState: [] as Note[],
  reducers: {
    setArchivedNotes: noteReducers.set,
    resetArchivedNotes: noteReducers.reset,
    addArchivedNote: noteReducers.add,
    renameArchivedNote: noteReducers.rename,
    deleteArchivedNote: noteReducers.deleteByIdObject,
  },
});

export const { 
  setArchivedNotes, 
  resetArchivedNotes, 
  addArchivedNote, 
  renameArchivedNote, 
  deleteArchivedNote 
} = archivedNotesSlice.actions;
export default archivedNotesSlice.reducer;
