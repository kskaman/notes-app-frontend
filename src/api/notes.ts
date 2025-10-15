import notes from "../data/notes.json";
import archivedNotes from "../data/archived-notes.json";

import store from "./store/store";
import type { Collection } from "../types/collection";
import { parseToken } from "../utils";

/**
 * Initialize active notes for the current user from bundled JSON.
 * Steps:
 * 1) Parse user id from token.
 * 2) Filter bundled notes for this user.
 * 3) Hydrate the notes slice in the store.
 */
export const setInitialNotes = (token: string) => {
  // Step 1: Identify the current user.
  const userId = parseToken(token);

  // Step 2: Select only notes that belong to this user.
  const userNotes = notes.filter((note) => note.userId === userId);

  // Step 3: Put them into Redux (active notes slice).
  store.dispatch({ type: "notes/setNotes", payload: userNotes ?? [] });
};

/**
 * Initialize archived notes for the current user from bundled JSON.
 * Steps:
 * 1) Parse user id from token.
 * 2) Filter bundled archived notes for this user.
 * 3) Hydrate the archivedNotes slice in the store.
 */
export const setInitialArchivedNotes = (token: string) => {
  // Step 1: Identify the current user.
  const userId = parseToken(token);

  // Step 2: Select only archived notes that belong to this user.
  const userNotes = archivedNotes.filter((note) => note.userId === userId);

  // Step 3: Put them into Redux (archived notes slice).
  store.dispatch({
    type: "archivedNotes/setArchivedNotes",
    payload: userNotes ?? [],
  });
};

/**
 * Get notes for a given collection without dispatching (pure read).
 * Steps:
 * 1) Validate inputs (collection id/type).
 * 2) Decide whether we are reading archived or active notes based on c_type.
 * 3) Filter notes by collection id and archived flag.
 */
export const getNotesForCollection = (
  c_type: string | null,
  c_id: string | null
) => {
  // Step 1: Validate arguments.
  if (!c_id || !c_type) return [];

  // Step 2: Interpret collection type flag ("a" means archived).
  const isArchived = c_type === "a" ? true : false;

  // Step 3: Read appropriate slice and filter by collection id.
  if (isArchived) {
    return store
      .getState()
      .archivedNotes.filter(
        (note) => note.isArchived === true && note.collectionId === c_id
      );
  }

  const notes = store.getState().notes.filter((note) => {
    return note.isArchived === false && note.collectionId === c_id;
  });

  return notes;
};

/**
 * Get a single note by its ID from either active or archived slice.
 * Steps:
 * 1) Read current state.
 * 2) Search active notes first, then archived notes.
 * 3) Return the found note or undefined if not found.
 */

export const getNoteById = (id: string) => {
  const state = store.getState();
  const note =
    state.notes.find((n) => n.id === id) ||
    state.archivedNotes.find((n) => n.id === id);
  return note;
};

/**
 * Search notes by title across both active and archived slices.
 * Steps:
 * 1) Normalize the query (trim + lower).
 * 2) If query is empty, return empty array.
 * 3) Filter active notes for title matches.
 * 4) Filter archived notes for title matches.
 * 5) Combine and return results.
 */
export const getSearchNotes = (query: string) => {
  const state = store.getState();
  const q = query.trim().toLowerCase();
  if (q === "") return [];

  return [
    ...state.notes.filter((n) => n.title.toLowerCase().includes(q)),
    ...state.archivedNotes.filter((n) => n.title.toLowerCase().includes(q)),
  ];
};

/**
 * Update a note's title and/or content in either active or archived slice.
 * Steps:
 * 1) Read current state and locate the note (active or archived).
 * 2) Create an updated note object with new fields and updated timestamp.
 * 3) Replace the note in the appropriate slice and dispatch the updated slice.
 */
export const updateNote = (
  id: string,
  updates: { name?: string; content?: string }
) => {
  const state = store.getState();
  const note =
    state.notes.find((n) => n.id === id) ||
    state.archivedNotes.find((n) => n.id === id);
  if (!note) return;

  const isArchived = note.isArchived;

  const updatedNote = {
    ...note,
    title: updates.name ?? note.title,
    content: updates.content ?? note.content,
    lastEdited: new Date().toISOString(),
  };

  if (isArchived) {
    // Update archived slice.
    const newArchivedNotes = state.archivedNotes.map((n) =>
      n.id === id ? updatedNote : n
    );
    store.dispatch({
      type: "archivedNotes/setArchivedNotes",
      payload: newArchivedNotes,
    });
  } else {
    // Update active slice.
    const newNotes = state.notes.map((n) => (n.id === id ? updatedNote : n));
    store.dispatch({ type: "notes/setNotes", payload: newNotes });
  }
};

/**
 * Rename a note in either active or archived slice.
 * Steps:
 * 1) Route the action to the correct slice based on isArchived.
 * 2) Dispatch the rename action with id and new title.
 */
export const renameNote = (
  id: string,
  newTitle: string,
  isArchived: boolean
) => {
  // Step 1: Choose the correct slice.
  if (isArchived) {
    // Step 2: Update archived slice.
    store.dispatch({
      type: "archivedNotes/renameArchivedNote",
      payload: { id, newTitle },
    });
  } else {
    // Step 2: Update active slice.
    store.dispatch({ type: "notes/renameNote", payload: { id, newTitle } });
  }
};

/**
 * Create a new note
 * Steps:
 * 1) Generate a unique ID for the note.
 * 2) Update the corresponding collection to include this note ID and increment noteCount.
 * 3) Add the new note to the notes slice in the store.
 */
export const createNote = (title: string, collectionId: string) => {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}_${Math.random().toString(36).slice(2)}`;

  const collections = store.getState().collections;
  const collection = collections.find((c) => c.id === collectionId);
  if (!collection) return;

  const newCollection = {
    ...collection,
    noteIds: [...(collection.noteIds ?? []), id],
    noteCount: (collection.noteCount ?? 0) + 1,
  };

  // Step 2: Update collection in store.
  store.dispatch({
    type: "collections/updateCollection",
    payload: {
      id: newCollection.id,
      updatedCollection: {
        noteIds: newCollection.noteIds,
        noteCount: newCollection.noteCount,
      },
    },
  });

  // Step 3: Add note to store.
  store.dispatch({
    type: "notes/addNote",
    payload: {
      id,
      title,
      content: "",
      lastEdited: new Date().toISOString(),
      collectionId,
      isArchived: false,
    },
  });
};

/**
 * Delete a note from store and also remove it from its corresponding collection.
 * Steps:
 * 1) Read current state and locate the note (active or archived).
 * 2) Remove the note from the appropriate notes slice.
 * 3) Remove the note ID from its collection and update noteCount.
 * 4) Dispatch all updated slices back to store.
 */
export const deleteNote = (id: string, isArchived: boolean) => {
  const state = store.getState();

  // Step 1: Locate the note in the correct slice.
  const note = isArchived
    ? state.archivedNotes.find((n) => n.id === id)
    : state.notes.find((n) => n.id === id);
  if (!note) return;

  const { collectionId } = note;

  if (isArchived) {
    // Step 2: Remove note from archived notes.
    const newArchivedNotes = state.archivedNotes.filter((n) => n.id !== id);

    // Step 3: Remove note id from archived collection.
    const newArchivedCollections = state.archivedCollections.map((c) => {
      if (c.id !== collectionId) return c;
      const nextIds = (c.noteIds ?? []).filter((nid) => nid !== id);
      return { ...c, noteIds: nextIds, noteCount: nextIds.length };
    });

    // Step 4: Dispatch updates.
    store.dispatch({
      type: "archivedNotes/setArchivedNotes",
      payload: newArchivedNotes,
    });
    store.dispatch({
      type: "archivedCollections/setArchivedCollections",
      payload: newArchivedCollections,
    });
  } else {
    // Step 2: Remove note from active notes.
    const newNotes = state.notes.filter((n) => n.id !== id);

    // Step 3: Remove note id from active collection.
    const newCollections = state.collections.map((c) => {
      if (c.id !== collectionId) return c;
      const nextIds = (c.noteIds ?? []).filter((nid) => nid !== id);
      return { ...c, noteIds: nextIds, noteCount: nextIds.length };
    });

    // Step 4: Dispatch updates.
    store.dispatch({ type: "notes/setNotes", payload: newNotes });
    store.dispatch({
      type: "collections/setCollections",
      payload: newCollections,
    });
  }
};

/**
 * Archive a single active note and keep collections in sync.
 * Steps:
 * 1) Find the note in active notes; exit if not found.
 * 2) Move the note to archivedNotes (set isArchived=true) and remove from active notes.
 * 3) In active collections: remove note id and update counts.
 * 4) In archived collections: add note id (create collection if missing) and update counts.
 */
export const archiveNote = (id: string) => {
  const state = store.getState();

  // Step 1: Locate the note in the active notes slice.
  const note = state.notes.find((n) => n.id === id);
  if (!note) return;

  const { collectionId } = note;

  // Step 2: Move the note to archivedNotes and remove from active notes.
  const newArchivedNotes = [
    ...state.archivedNotes,
    { ...note, isArchived: true },
  ];
  const newNotes = state.notes.filter((n) => n.id !== id);

  store.dispatch({ type: "notes/setNotes", payload: newNotes });
  store.dispatch({
    type: "archivedNotes/setArchivedNotes",
    payload: newArchivedNotes,
  });

  // Step 3: Update active collections: remove note id & recalc noteCount.
  const newCollections = state.collections.map((c) => {
    if (c.id !== collectionId) return c;
    const nextIds = (c.noteIds ?? []).filter((nid) => nid !== id);
    return { ...c, noteIds: nextIds, noteCount: nextIds.length };
  });
  store.dispatch({
    type: "collections/setCollections",
    payload: newCollections,
  });

  // Step 4: Update archived collections: add note id or create the archived entry.
  const archivedMatch = state.archivedCollections.find(
    (c) => c.id === collectionId
  );

  let newArchivedCollections: Collection[];
  if (archivedMatch) {
    // 4a: Merge id into existing archived collection (de-duplicate with Set).
    const merged = Array.from(new Set([...(archivedMatch.noteIds ?? []), id]));
    newArchivedCollections = state.archivedCollections.map((c) =>
      c.id === collectionId
        ? { ...c, noteIds: merged, noteCount: merged.length }
        : c
    );
  } else {
    // 4b: Create a new archived collection entry by copying metadata from active.
    const src = state.collections.find((c) => c.id === collectionId);
    if (!src) return; // Safety: cannot mirror without source metadata.
    newArchivedCollections = [
      ...state.archivedCollections,
      {
        id: src.id,
        name: src.name,
        userId: src.userId,
        noteIds: [id],
        noteCount: 1,
      },
    ];
  }

  store.dispatch({
    type: "archivedCollections/setArchivedCollections",
    payload: newArchivedCollections,
  });
};

/**
 * Unarchive a single archived note and keep collections in sync.
 * Steps:
 * 1) Find the note in archivedNotes; exit if not found.
 * 2) Move the note to active notes (set isArchived=false) and remove from archivedNotes.
 * 3) In archived collections: remove note id and update counts.
 * 4) In active collections: add note id (create collection if missing) and update counts.
 */
export const unarchiveNote = (id: string) => {
  const state = store.getState();

  // Step 1: Locate the note in the archived notes slice.
  const note = state.archivedNotes.find((n) => n.id === id);
  if (!note) return;

  const { collectionId } = note;

  // Step 2: Move the note to active notes and remove from archived notes.
  const newNotes = [...state.notes, { ...note, isArchived: false }];
  const newArchivedNotes = state.archivedNotes.filter((n) => n.id !== id);

  store.dispatch({ type: "notes/setNotes", payload: newNotes });
  store.dispatch({
    type: "archivedNotes/setArchivedNotes",
    payload: newArchivedNotes,
  });

  // Step 3: Update archived collections: remove the note id & recalc count.
  const newArchivedCollections = state.archivedCollections.map((c) => {
    if (c.id !== collectionId) return c;
    const nextIds = (c.noteIds ?? []).filter((nid) => nid !== id);
    return { ...c, noteIds: nextIds, noteCount: nextIds.length };
  });
  store.dispatch({
    type: "archivedCollections/setArchivedCollections",
    payload: newArchivedCollections,
  });

  // Step 4: Update active collections: add note id or create the active entry.
  const activeMatch = state.collections.find((c) => c.id === collectionId);
  let newCollections: Collection[];
  if (activeMatch) {
    // 4a: Merge into existing active collection (de-duplicate).
    const merged = Array.from(new Set([...(activeMatch.noteIds ?? []), id]));
    newCollections = state.collections.map((c) =>
      c.id === collectionId
        ? { ...c, noteIds: merged, noteCount: merged.length }
        : c
    );
  } else {
    // 4b: Create a new active collection from archived metadata.
    const src = state.archivedCollections.find((c) => c.id === collectionId);
    if (!src) return; // Safety: cannot recreate without source metadata.
    newCollections = [
      ...state.collections,
      {
        id: src.id,
        name: src.name,
        userId: src.userId,
        noteIds: [id],
        noteCount: 1,
      },
    ];
  }
  store.dispatch({
    type: "collections/setCollections",
    payload: newCollections,
  });
};

/**
 * Check if a note title is already taken (case/trim insensitive) across active and archived notes.
 * Steps:
 * 1) Normalize the query (trim + lower).
 * 2) Search active notes for a title match.
 * 3) Search archived notes for a title match.
 * 4) Return true if either slice contains a match.
 */
export const isNoteNameTaken = (name: string) => {
  // Step 1: Normalize input for consistent comparison.
  const q = name.trim().toLowerCase();

  // Step 2–3: Read current state and check both slices.
  const { notes, archivedNotes } = store.getState();

  // Step 4: Return whether a duplicate exists.
  return (
    notes.some((n) => n.title.trim().toLowerCase() === q) ||
    archivedNotes.some((n) => n.title.trim().toLowerCase() === q)
  );
};
