import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Collection } from "../../../types/collection";

const archivedCollectionsSlice = createSlice({
  name: "archivedCollections",
  initialState: [] as Collection[],
  reducers: {
    setArchivedCollections: (_state, action: PayloadAction<Collection[]>) => {
      return action.payload;
    },
    resetArchivedCollections: () => {
      return [];
    },
    deleteArchivedCollection: (state, action: PayloadAction<string>) => {
      return state.filter((collection) => collection.id !== action.payload);
    },
  },
});

export const {
  setArchivedCollections,
  resetArchivedCollections,
  deleteArchivedCollection,
} = archivedCollectionsSlice.actions;
export default archivedCollectionsSlice.reducer;
