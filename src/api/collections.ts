import store from "./store/store";

import collections from "../data/collections.json";
import { parseToken } from "../utils/tokens";
import { setCollections } from "./store/reducers/collectionsReducer";

import archivedCollections from "../data/archived-collections.json";

import { setArchivedCollections } from "./store/reducers/archivedCollectionsReducer";
import type { Collection } from "../types/collection";

export const setInitialCollections = (token: string) => {
  console.log(token);
  const userId = parseToken(token);

  const userCollections = collections.filter(
    (collection) => collection.userId === userId
  );
  return store.dispatch(setCollections(userCollections ?? []));
};

export const setInitialArchivedCollections = (token: string) => {
  console.log(token);
  const userId = parseToken(token);

  const userCollections = archivedCollections.filter(
    (collection: Collection) => collection.userId === userId
  );
  return store.dispatch(setArchivedCollections(userCollections ?? []));
};

export const getAllCollections = () => {
  return store.getState().collections;
};

export const getAllArchivedCollections = () => {
  return store.getState().archivedCollections;
};

export const renameCollection = (id: string, newName: string) => {
  store.dispatch({
    type: "collections/renameCollection",
    payload: { id, newName },
  });
  store.dispatch({
    type: "archivedCollections/renameArchivedCollection",
    payload: { id, newName },
  });
};

export const deleteUnArchivedCollection = (id: string) => {
  store.dispatch({ type: "collections/deleteCollection", payload: id });
};

export const deleteArchivedCollection = (id: string) => {
  store.dispatch({ type: "archivedCollections/deleteCollection", payload: id });
};

export const addCollection = (name: string, userId: string) => {
  store.dispatch({
    type: "collections/addCollection",
    payload: {
      id: crypto.randomUUID(),
      name,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: [],
    },
  });
};

export const archiveCollection = (id: string) => {
  const state = store.getState();
  const toArchive = state.collections.find((c) => c.id === id);
  if (!toArchive) return;

  const archived = state.archivedCollections;
  const existing = archived.find((c) => c.id === id);

  let newArchivedCollections;
  if (existing) {
    // merge into existing archived
    const mergedNoteIds = Array.from(
      new Set([...(existing.noteIds ?? []), ...(toArchive.noteIds ?? [])])
    );
    newArchivedCollections = archived.map((c) =>
      c.id === id
        ? {
            ...c,
            noteIds: mergedNoteIds,
            noteCount: mergedNoteIds.length,
          }
        : c
    );
  } else {
    // add new archived entry
    newArchivedCollections = [
      ...archived,
      {
        ...toArchive,
        noteIds: Array.from(new Set(toArchive.noteIds ?? [])),
        noteCount: (toArchive.noteIds ?? []).length,
      },
    ];
  }

  store.dispatch({
    type: "archivedCollections/setArchivedCollections",
    payload: newArchivedCollections,
  });

  // remove from active
  store.dispatch({ type: "collections/deleteCollection", payload: id });
};

export const unarchiveCollection = (id: string) => {
  const state = store.getState();
  const fromArchived = state.archivedCollections.find((c) => c.id === id);
  if (!fromArchived) return;

  const actives = state.collections;
  const existing = actives.find((c) => c.id === id);

  let newCollections;

  if (existing) {
    // merge into existing active
    const mergedNoteIds = Array.from(
      new Set([...(existing.noteIds ?? []), ...(fromArchived.noteIds ?? [])])
    );
    newCollections = actives.map((c) =>
      c.id === id
        ? {
            ...c,
            noteIds: mergedNoteIds,
            noteCount: mergedNoteIds.length,
          }
        : c
    );
  } else {
    // add new active entry
    newCollections = [
      ...actives,
      {
        ...fromArchived,
        noteIds: Array.from(new Set(fromArchived.noteIds ?? [])),
        noteCount: (fromArchived.noteIds ?? []).length,
      },
    ];
  }

  store.dispatch({
    type: "collections/setCollections",
    payload: newCollections,
  });

  // remove from archived
  store.dispatch({
    type: "archivedCollections/deleteArchivedCollection",
    payload: id,
  });
};
