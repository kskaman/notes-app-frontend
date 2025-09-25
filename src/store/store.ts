import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./reducers/userReducer";
// import collectionsReducer from "./reducers/collectionsReducer";
// import notesReducer from "./reducers/notesReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    // collections: collectionsReducer,
    // notes: notesReducer,
  },
});

export default store;
