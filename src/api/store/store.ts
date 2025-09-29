import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./reducers/userReducer";
import collectionsReducer from "./reducers/collectionsReducer";
import notesReducer from "./reducers/notesReducer";
import archivedCollectionsReducer from "./reducers/archivedCollectionsReducer";
import archivedNotesReducer from "./reducers/archivedNotesReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    collections: collectionsReducer,
    notes: notesReducer,
    archivedCollections: archivedCollectionsReducer,
    archivedNotes: archivedNotesReducer,
  },
});

export default store;
