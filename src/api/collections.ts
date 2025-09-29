import store from "./store/store";

import collections from "../data/collections.json";
import { parseToken } from "../utils/tokens";
import { setCollections } from "./store/reducers/collectionsReducer";

export const setInitialCollections = (token: string) => {
  console.log(token);
  const userId = parseToken(token);

  const userCollections = collections.filter(
    (collection) => collection.userId === userId
  );
  return store.dispatch(setCollections(userCollections ?? []));
};

export const getAllCollections = () => {
  return store.getState().collections;
};
