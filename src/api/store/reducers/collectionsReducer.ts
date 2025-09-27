import { createSlice } from "@reduxjs/toolkit";
import notes from "../../../data/collections.json";
import { parseToken } from "../../../utils/tokens";

const getInitialCollectionsState = () => {
  const accessToken = localStorage.getItem("accessToken");
  const userId = parseToken(accessToken!);

  const userCollections = notes.filter((note) => note.userId === userId);
  return userCollections ?? [];
};

const collectionsSlice = createSlice({
  name: "notes",
  initialState: getInitialCollectionsState(),
  reducers: {},
});

export default collectionsSlice.reducer;
