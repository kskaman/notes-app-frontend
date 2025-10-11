import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Note } from "../../../types/note";

const notesSlice = createSlice({
  name: "notes",
  initialState: [] as Note[],
  reducers: {
    setNotes: (_state, action: PayloadAction<Note[]>) => {
      return action.payload;
    },
    resetNotes: () => {
      return [];
    },
    addNote: (state, action: PayloadAction<Note>) => {
      state.push(action.payload);
    },
    renameNote: (
      state,
      action: PayloadAction<{ id: string; newTitle: string }>
    ) => {
      return state.map((n) =>
        n.id === action.payload.id
          ? { ...n, title: action.payload.newTitle }
          : n
      );
    },
    deleteNote: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter((n) => n.id !== action.payload.id);
    },
  },
});

export const { setNotes, resetNotes, addNote } = notesSlice.actions;
export default notesSlice.reducer;
