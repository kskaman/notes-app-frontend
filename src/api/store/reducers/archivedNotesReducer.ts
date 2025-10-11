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
    renameArchivedNotes: (
      state,
      action: PayloadAction<{ id: string; newTitle: string }>
    ) => {
      return state.map((n) =>
        n.id === action.payload.id
          ? { ...n, title: action.payload.newTitle }
          : n
      );
    },
    deleteArchivedNote: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter((n) => n.id !== action.payload.id);
    },
  },
});

export const { setArchivedNotes, resetArchivedNotes, addNote } =
  notesSlice.actions;
export default notesSlice.reducer;
