import store from "./store/store";

import archivedCollections from "../data/archived-collections.json";
import { parseToken } from "../utils/tokens";
import { setArchivedCollections } from "./store/reducers/archivedCollectionsReducer";
import type { Collection } from "../types/collection";

export const setInitialArchivedCollections = (token: string) => {
  console.log(token);
  const userId = parseToken(token);

  const userCollections = archivedCollections.filter(
    (collection: Collection) => collection.userId === userId
  );
  return store.dispatch(setArchivedCollections(userCollections ?? []));
};

export const getAllArchivedCollections = () => {
  return store.getState().archivedCollections;
};
