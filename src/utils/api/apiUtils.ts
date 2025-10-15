import store from "../../api/store/store";
import type { Collection } from "../../types/collection";
import type { Note } from "../../types/note";

// Simplified API utilities without complex generics
export const APIUtils = {
  // Get state safely
  getState() {
    return store.getState();
  },

  // Collection utilities
  collections: {
    getActive(): Collection[] {
      return store.getState().collections;
    },

    getArchived(): Collection[] {
      return store.getState().archivedCollections;
    },

    findById(id: string): Collection | undefined {
      const active = this.getActive().find((c) => c.id === id);
      return active || this.getArchived().find((c) => c.id === id);
    },

    isNameTaken(name: string): boolean {
      const normalizedName = name.trim().toLowerCase();
      const active = this.getActive();
      const archived = this.getArchived();

      return [...active, ...archived].some(
        (c) => c.name.trim().toLowerCase() === normalizedName
      );
    },
  },

  // Note utilities
  notes: {
    getActive(): Note[] {
      return store.getState().notes;
    },

    getArchived(): Note[] {
      return store.getState().archivedNotes;
    },

    findById(id: string): Note | undefined {
      const active = this.getActive().find((n) => n.id === id);
      return active || this.getArchived().find((n) => n.id === id);
    },

    isTitleTaken(title: string): boolean {
      const normalizedTitle = title.trim().toLowerCase();
      const active = this.getActive();
      const archived = this.getArchived();

      return [...active, ...archived].some(
        (n) => n.title.trim().toLowerCase() === normalizedTitle
      );
    },

    search(query: string): Note[] {
      if (!query.trim()) return [];

      const normalizedQuery = query.trim().toLowerCase();
      const active = this.getActive();
      const archived = this.getArchived();

      return [...active, ...archived].filter((note) =>
        note.title.toLowerCase().includes(normalizedQuery)
      );
    },
  },
};

// Export the main utility
export default APIUtils;
