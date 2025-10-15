import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Collection } from "../../../types/collection";
import { createCollectionReducers } from "../../../utils/state";

const collectionReducers = createCollectionReducers<Collection>();

const collectionsSlice = createSlice({
  name: "collections",
  initialState: [] as Collection[],
  reducers: {
    setCollections: collectionReducers.set,
    resetCollections: collectionReducers.reset,
    addCollection: collectionReducers.add,
    updateCollection: (
      state,
      action: PayloadAction<{
        id: string;
        updatedCollection: Partial<Collection>;
      }>
    ) => {
      return collectionReducers.update(state, {
        ...action,
        payload: { id: action.payload.id, updates: action.payload.updatedCollection }
      });
    },
    renameCollection: collectionReducers.rename,
    deleteCollection: collectionReducers.deleteById,
  },
});

export const { 
  setCollections, 
  resetCollections, 
  addCollection, 
  updateCollection, 
  renameCollection, 
  deleteCollection 
} = collectionsSlice.actions;
export default collectionsSlice.reducer;
