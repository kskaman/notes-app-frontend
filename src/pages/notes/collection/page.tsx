import { useState } from "react";

import {
  archiveNote,
  deleteNote,
  getNotesForCollection,
  unarchiveNote,
} from "../../../api/notes";
import { useActionModal } from "../../../hooks/useActionModal";
import { useCollectionId } from "../../../hooks/useCollectionId";
import Button from "../../../ui/Button";
import Divider from "../../../ui/Divider";
import NoteCard from "../components/NoteCard";
import SubPageLayout from "../components/page-views/sub-page-layout";
import ConfirmModal from "../../../ui/confirm-modal";
import TrashIcon from "../../../assets/icons/TrashIcon";
import ArchivedIcon from "../../../assets/icons/ArchivedIcon";
import CreateModal from "../../../ui/create-modal";

const CollectionPage = () => {
  const { c_type, c_id, c_name } = useCollectionId();

  const notes = getNotesForCollection(c_type, c_id);
  const modal = useActionModal({
    type: "note",
    onDelete: (id) => {
      deleteNote(id, c_type === "a" ? true : false);
    },
    onArchive: (id) => {
      if (c_type === "r") {
        archiveNote(id);
      }
    },
    onUnarchive: (id) => {
      if (c_type === "a") {
        unarchiveNote(id);
      }
    },
  });

  const [createModal, setCreateModal] = useState<{
    isOpen: boolean;
    type?: "note" | "collection";
  }>({
    isOpen: false,
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <>
      <SubPageLayout
        heading={c_name ?? "Unknown Collection"}
        rootPath={`/collections/${c_type}_${c_id}`}
      >
        <div
          className="w-full lg:w-[242px] h-full 
      py-5
      flex flex-col gap-4 overflow-y-auto"
        >
          <div className="flex items-center gap-4">
            <div className="w-full max-w-[250px]">
              {/* Button to create a new note */}
              <Button
                variant="primary"
                height="41px"
                icon="+"
                onClick={() => setCreateModal({ isOpen: true, type: "note" })}
              >
                Create New Note
              </Button>
            </div>
          </div>

          {/* If there are no notes, display a message  
      else display list of notes */}

          {notes.length === 0 ? (
            <p className="p-2 rounded-[8px] bg-[#e0e4e4] text-preset-5">
              You don't have any notes yet. Start a new note to capture your
              thoughts and ideas.
            </p>
          ) : (
            <ul className="py-4">
              {notes.map((note, idx) => (
                <li key={note.id}>
                  <NoteCard
                    type="regular"
                    note={note}
                    editing={editingId === note.id}
                    setEditingId={setEditingId}
                    options={
                      c_type === "r"
                        ? [
                            {
                              id: "rename",
                              label: "Rename",
                              onClick: () => setEditingId(note.id),
                            },
                            {
                              id: "delete",
                              label: "Delete",
                              onClick: () => modal.openDelete(note.id),
                            },
                            {
                              id: "archive",
                              label: "Archive",
                              onClick: () => modal.openArchive(note.id),
                            },
                          ]
                        : [
                            {
                              id: "rename",
                              label: "Rename",
                              onClick: () => setEditingId(note.id),
                            },
                            {
                              id: "delete",
                              label: "Delete",
                              onClick: () => modal.openDelete(note.id),
                            },
                            {
                              id: "unarchive",
                              label: "Unarchive",
                              onClick: () => modal.openUnarchive(note.id),
                            },
                          ]
                    }
                  />
                  {idx !== notes.length - 1 && (
                    <div className="py-4">
                      <Divider />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </SubPageLayout>
      {/* Modal for delete and archive actions */}
      {modal.isOpen && (
        <ConfirmModal
          title={modal.title}
          description={modal.description}
          icon={
            modal.modal.type === "delete" ? (
              <TrashIcon
                color="var(--modal-icon-color)"
                width={20}
                height={20}
              />
            ) : (
              <ArchivedIcon
                color="var(--modal-icon-color)"
                width={20}
                height={20}
              />
            )
          }
          onCancel={modal.close}
          onConfirm={modal.confirm}
          confirmLabel={modal.confirmLabel}
        />
      )}

      {createModal.isOpen && (
        <CreateModal
          type={createModal.type!}
          onClose={() => setCreateModal({ isOpen: false })}
          collectionId={c_id}
        />
      )}
    </>
  );
};

export default CollectionPage;
