import store from "./store/store";

import collections from "../data/collections.json";
import archivedCollections from "../data/archived-collections.json";

import { parseToken } from "../utils/tokens";
import { setCollections } from "./store/reducers/collectionsReducer";
import { setArchivedCollections } from "./store/reducers/archivedCollectionsReducer";
import type { Collection } from "../types/collection";

/**
 * Initialize ACTIVE collections for the current user from bundled JSON.
 * Steps:
 * 1) Parse user id from token.
 * 2) Filter bundled collections for this user.
 * 3) Hydrate the active collections slice.
 */
export const setInitialCollections = (token: string) => {
  const userId = parseToken(token);
  const userCollections = collections.filter((c) => c.userId === userId);
  return store.dispatch(setCollections(userCollections ?? []));
};

/**
 * Initialize ARCHIVED collections for the current user from bundled JSON.
 * Steps:
 * 1) Parse user id from token.
 * 2) Filter bundled archived collections for this user.
 * 3) Hydrate the archived collections slice.
 */
export const setInitialArchivedCollections = (token: string) => {
  const userId = parseToken(token);
  const userCollections = archivedCollections.filter(
    (c: Collection) => c.userId === userId
  );
  return store.dispatch(setArchivedCollections(userCollections ?? []));
};

/** Read all ACTIVE collections (pure read). */
export const getAllCollections = () => store.getState().collections;

/** Read all ARCHIVED collections (pure read). */
export const getAllArchivedCollections = () =>
  store.getState().archivedCollections;

/**
 * Resolve a collection name by id across active & archived.
 * Steps:
 * 1) Try active collections.
 * 2) Fallback to archived collections.
 * 3) If neither found, return "Unknown Collection".
 */
export const getCollectionNameById = (id: string) => {
  const state = store.getState();
  const active = state.collections.find((c) => c.id === id);
  if (active) return active.name;
  const archived = state.archivedCollections.find((c) => c.id === id);
  if (archived) return archived.name;
  return "Unknown Collection";
};

/**
 * Rename a collection in both slices (id is shared across states).
 * Safe if the id exists in only one slice.
 */
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

/**
 * Create a new ACTIVE collection.
 * Steps:
 * 1) Resolve userId (param > localStorage fallback).
 * 2) Generate id.
 * 3) Dispatch addCollection with empty noteIds & count.
 */
export const createCollection = (name: string, userId?: string) => {
  const resolvedUserId =
    userId ??
    localStorage.getItem("userId") ??
    parseToken(localStorage.getItem("token") || "");

  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}_${Math.random().toString(36).slice(2)}`;

  store.dispatch({
    type: "collections/addCollection",
    payload: {
      id,
      name,
      userId: resolvedUserId,
      noteIds: [],
      noteCount: 0,
    },
  });
};

/**
 * Delete an ACTIVE collection and all its ACTIVE notes.
 * Steps:
 * 1) Read state and collect note ids under this collection.
 * 2) Remove notes from active notes slice.
 * 3) Remove collection from active collections slice.
 */
export const deleteUnArchivedCollection = (id: string) => {
  const state = store.getState();

  // Step 1: Gather note ids in this active collection.
  const noteIds = new Set(
    (state.notes ?? []).filter((n) => n.collectionId === id).map((n) => n.id)
  );

  // Step 2: Purge those notes from active notes.
  const nextNotes = (state.notes ?? []).filter((n) => !noteIds.has(n.id));
  store.dispatch({ type: "notes/setNotes", payload: nextNotes });

  // Step 3: Drop the collection from active slice.
  store.dispatch({ type: "collections/deleteCollection", payload: id });
};

/**
 * Delete an ARCHIVED collection and all its ARCHIVED notes.
 * Steps:
 * 1) Read current state and collect ids of archived notes in this collection.
 * 2) Remove those notes from the archivedNotes slice.
 * 3) Remove the archived collection entry.
 */
export const deleteArchivedCollection = (id: string) => {
  const state = store.getState();

  // Step 1: Collect archived note IDs under this archived collection.
  const archivedNoteIds = new Set(
    (state.archivedNotes ?? [])
      .filter((n) => n.collectionId === id)
      .map((n) => n.id)
  );

  // Step 2: Purge those notes from archived notes.
  const nextArchivedNotes = (state.archivedNotes ?? []).filter(
    (n) => !archivedNoteIds.has(n.id)
  );
  store.dispatch({
    type: "archivedNotes/setArchivedNotes",
    payload: nextArchivedNotes,
  });

  // Step 3: Remove the archived collection entry.
  store.dispatch({
    type: "archivedCollections/deleteCollection",
    payload: id,
  });
};

/**
 * Archive an ACTIVE collection and all of its ACTIVE notes.
 * Steps:
 * 1) Locate active collection by id; exit if not found.
 * 2) Move all notes of this collection from active -> archived (set isArchived=true).
 * 3) Create/merge archived collection entry with merged noteIds & counts.
 * 4) Remove the collection from active collections.
 */
export const archiveCollection = (id: string) => {
  const state = store.getState();
  const toArchive = state.collections.find((c) => c.id === id);
  if (!toArchive) return;

  // Step 2: Move notes to archived slice (flip isArchived=true).
  const notesToMove = (state.notes ?? []).filter((n) => n.collectionId === id);
  const remainingActiveNotes = (state.notes ?? []).filter(
    (n) => n.collectionId !== id
  );
  const movedArchivedNotes = notesToMove.map((n) => ({
    ...n,
    isArchived: true,
  }));

  const nextArchivedNotes = [
    ...(state.archivedNotes ?? []),
    ...movedArchivedNotes,
  ];

  store.dispatch({ type: "notes/setNotes", payload: remainingActiveNotes });
  store.dispatch({
    type: "archivedNotes/setArchivedNotes",
    payload: nextArchivedNotes,
  });

  // Step 3: Create or merge archived collection entry.
  const archived = state.archivedCollections ?? [];
  const existing = archived.find((c) => c.id === id);

  const mergedNoteIds = Array.from(
    new Set([
      ...((existing?.noteIds ?? []) as string[]),
      ...((toArchive.noteIds ?? []) as string[]),
    ])
  );

  const nextArchivedCollections: Collection[] = existing
    ? archived.map((c) =>
        c.id === id
          ? { ...c, noteIds: mergedNoteIds, noteCount: mergedNoteIds.length }
          : c
      )
    : [
        ...archived,
        {
          id: toArchive.id,
          name: toArchive.name,
          userId: toArchive.userId,
          noteIds: mergedNoteIds,
          noteCount: mergedNoteIds.length,
        },
      ];

  store.dispatch({
    type: "archivedCollections/setArchivedCollections",
    payload: nextArchivedCollections,
  });

  // Step 4: Remove from active collections.
  store.dispatch({ type: "collections/deleteCollection", payload: id });
};

/**
 * Unarchive an ARCHIVED collection and all of its ARCHIVED notes.
 * Steps:
 * 1) Locate archived collection by id; exit if not found.
 * 2) Move all notes of this collection from archived -> active (set isArchived=false).
 * 3) Create/merge active collection entry with merged noteIds & counts.
 * 4) Remove the collection from archived collections.
 */
export const unarchiveCollection = (id: string) => {
  const state = store.getState();
  const fromArchived = state.archivedCollections.find((c) => c.id === id);
  if (!fromArchived) return;

  // Step 2: Move notes to active slice (flip isArchived=false).
  const notesToMove = (state.archivedNotes ?? []).filter(
    (n) => n.collectionId === id
  );
  const remainingArchivedNotes = (state.archivedNotes ?? []).filter(
    (n) => n.collectionId !== id
  );
  const movedActiveNotes = notesToMove.map((n) => ({
    ...n,
    isArchived: false,
  }));

  const nextActiveNotes = [...(state.notes ?? []), ...movedActiveNotes];

  store.dispatch({
    type: "archivedNotes/setArchivedNotes",
    payload: remainingArchivedNotes,
  });
  store.dispatch({ type: "notes/setNotes", payload: nextActiveNotes });

  // Step 3: Create or merge active collection entry.
  const actives = state.collections ?? [];
  const existing = actives.find((c) => c.id === id);

  const mergedNoteIds = Array.from(
    new Set([
      ...((existing?.noteIds ?? []) as string[]),
      ...((fromArchived.noteIds ?? []) as string[]),
    ])
  );

  const nextCollections: Collection[] = existing
    ? actives.map((c) =>
        c.id === id
          ? { ...c, noteIds: mergedNoteIds, noteCount: mergedNoteIds.length }
          : c
      )
    : [
        ...actives,
        {
          id: fromArchived.id,
          name: fromArchived.name,
          userId: fromArchived.userId,
          noteIds: mergedNoteIds,
          noteCount: mergedNoteIds.length,
        },
      ];

  store.dispatch({
    type: "collections/setCollections",
    payload: nextCollections,
  });

  // Step 4: Remove from archived collections.
  store.dispatch({
    type: "archivedCollections/deleteCollection",
    payload: id,
  });
};

/**
 * Check if a collection name is already taken (case/trim insensitive)
 * across active and archived collections.
 * Steps:
 * 1) Normalize the query (trim + lower).
 * 2) Search active collections for a name match.
 * 3) Search archived collections for a name match.
 * 4) Return true if either slice contains a match.
 */
export const isCollectionNameTaken = (name: string) => {
  const q = name.trim().toLowerCase();
  const { collections, archivedCollections } = store.getState();
  return (
    collections.some((c) => c.name.trim().toLowerCase() === q) ||
    archivedCollections.some((c) => c.name.trim().toLowerCase() === q)
  );
};
