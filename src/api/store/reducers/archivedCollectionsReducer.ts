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
    addCollection: (state, action: PayloadAction<Collection>) => {
      state.push(action.payload);
    },
  },
});

export const {
  setArchivedCollections,
  resetArchivedCollections,
  addCollection,
} = archivedCollectionsSlice.actions;
export default archivedCollectionsSlice.reducer;
