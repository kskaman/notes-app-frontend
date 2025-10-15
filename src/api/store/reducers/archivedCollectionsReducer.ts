import { createSlice } from "@reduxjs/toolkit";
import type { Collection } from "../../../types/collection";
import { createCollectionReducers } from "../../../utils/state";

const collectionReducers = createCollectionReducers<Collection>();

const archivedCollectionsSlice = createSlice({
  name: "archivedCollections",
  initialState: [] as Collection[],
  reducers: {
    setArchivedCollections: collectionReducers.set,
    resetArchivedCollections: collectionReducers.reset,
    addArchivedCollection: collectionReducers.add,
    deleteArchivedCollection: collectionReducers.deleteById,
    renameArchivedCollection: collectionReducers.rename,
  },
});

export const {
  setArchivedCollections,
  resetArchivedCollections,
  addArchivedCollection,
  deleteArchivedCollection,
  renameArchivedCollection,
} = archivedCollectionsSlice.actions;
export default archivedCollectionsSlice.reducer;
