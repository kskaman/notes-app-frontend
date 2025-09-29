import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Collection } from "../../../types/collection";

const collectionsSlice = createSlice({
  name: "collections",
  initialState: [] as Collection[],
  reducers: {
    setCollections: (_state, action: PayloadAction<Collection[]>) => {
      return action.payload;
    },
    resetCollections: () => {
      return [];
    },
    addCollection: (state, action: PayloadAction<Collection>) => {
      state.push(action.payload);
    },
  },
});

export const { setCollections, resetCollections, addCollection } =
  collectionsSlice.actions;
export default collectionsSlice.reducer;
