import type { PayloadAction } from "@reduxjs/toolkit";

// Generic reducer utilities for array-based state
export const createArrayReducers = <T extends { id: string }>() => ({
  set: (_state: T[], action: PayloadAction<T[]>) => {
    return action.payload;
  },

  reset: () => {
    return [] as T[];
  },

  add: (state: T[], action: PayloadAction<T>) => {
    state.push(action.payload);
  },

  deleteById: (state: T[], action: PayloadAction<string>) => {
    return state.filter((item) => item.id !== action.payload);
  },

  deleteByIdObject: (state: T[], action: PayloadAction<{ id: string }>) => {
    return state.filter((item) => item.id !== action.payload.id);
  },
});

// Specific utilities for collections
export const createCollectionReducers = <
  T extends { id: string; name: string }
>() => ({
  ...createArrayReducers<T>(),

  rename: (
    state: T[],
    action: PayloadAction<{ id: string; newName: string }>
  ) => {
    return state.map((item) =>
      item.id === action.payload.id
        ? { ...item, name: action.payload.newName }
        : item
    );
  },

  update: (
    state: T[],
    action: PayloadAction<{ id: string; updates: Partial<T> }>
  ) => {
    return state.map((item) =>
      item.id === action.payload.id
        ? { ...item, ...action.payload.updates }
        : item
    );
  },
});

// Specific utilities for notes
export const createNoteReducers = <
  T extends { id: string; title: string }
>() => ({
  ...createArrayReducers<T>(),

  rename: (
    state: T[],
    action: PayloadAction<{ id: string; newTitle: string }>
  ) => {
    return state.map((item) =>
      item.id === action.payload.id
        ? { ...item, title: action.payload.newTitle }
        : item
    );
  },
});
