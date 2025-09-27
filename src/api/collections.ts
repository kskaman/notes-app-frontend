import store from "./store/store";

export const getAllCollections = () => {
  return store.getState().collections;
};
