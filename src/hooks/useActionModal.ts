import { useCallback, useMemo, useState } from "react";
import type { ModalState } from "../types/modalState";

type Options = {
  type: "note" | "collection";
  onDelete: (id: string) => void | Promise<void>;
  onArchive: (id: string) => void | Promise<void>;
  onUnarchive: (id: string) => void | Promise<void>;
};

export function useActionModal({
  type,
  onDelete,
  onArchive,
  onUnarchive,
}: Options) {
  const [modal, setModal] = useState<ModalState>({ type: null });

  const openDelete = useCallback(
    (id: string) => setModal({ type: "delete", id }),
    []
  );
  const openArchive = useCallback(
    (id: string) => setModal({ type: "archive", id }),
    []
  );
  const openUnarchive = useCallback(
    (id: string) => setModal({ type: "unarchive", id }),
    []
  );
  const close = useCallback(() => setModal({ type: null }), []);

  const confirm = useCallback(async () => {
    if (!modal.type || !modal.id) return;
    if (modal.type === "delete") await onDelete(modal.id);
    if (modal.type === "archive") await onArchive(modal.id);
    if (modal.type === "unarchive") await onUnarchive(modal.id);
    close();
  }, [modal, onDelete, onArchive, onUnarchive, close]);

  const ui = useMemo(() => {
    switch (modal.type) {
      case "delete":
        return {
          title: `Delete ${type}`,
          description: `Are you sure you want to delete this ${type}? This action cannot be undone.`,
          confirmLabel: "Delete",
          intent: "danger" as const,
        };
      case "archive":
        return {
          title: `Archive ${type}`,
          description: `Are you sure you want to archive this ${type}? You can unarchive it later.`,
          confirmLabel: "Archive",
          intent: "neutral" as const,
        };
      case "unarchive":
        return {
          title: `Unarchive ${type}`,
          description: `Move this ${type} back to your active ${type}s?`,
          confirmLabel: "Unarchive",
          intent: "primary" as const,
        };
      default:
        return {
          title: "",
          description: "",
          confirmLabel: "",
          intent: "neutral" as const,
        };
    }
  }, [modal.type, type]);

  return {
    // state
    modal,
    isOpen: modal.type !== null,

    // actions
    openDelete,
    openArchive,
    openUnarchive,
    close,
    confirm,

    // ui
    title: ui.title,
    description: ui.description,
    confirmLabel: ui.confirmLabel,
    intent: ui.intent,
  };
}
