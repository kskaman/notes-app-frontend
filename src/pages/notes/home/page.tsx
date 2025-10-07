import {
  archiveCollection,
  deleteUnArchivedCollection,
  getAllCollections,
} from "../../../api/collections";
import Button from "../../../ui/Button";
import InfoText from "../components/info-text";
import CollectionCard from "../components/CollectionCard";
import MainPageView from "../components/page-views/main-page-view";
import TrashIcon from "../../../assets/icons/TrashIcon";
import ArchivedIcon from "../../../assets/icons/ArchivedIcon";
import ConfirmModal from "../../../ui/confirm-modal";
import { useState } from "react";
import { useCollectionActionModal } from "../../../hooks/useCollectionActionModal";
import CreateModal from "../../../ui/create-modal";

const AllNotesPage = () => {
  const collections = getAllCollections();

  const modal = useCollectionActionModal({
    onDelete: (id) => {
      deleteUnArchivedCollection(id);
    },
    onArchive: (id) => {
      archiveCollection(id);
    },
    onUnarchive: () => {},
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
      <MainPageView heading="All Notes">
        <div
          className="w-full  h-full
      py-5 pr-4 pl-8
      flex flex-col gap-4 overflow-y-auto"
        >
          <div className="flex items-center gap-4 flex-col md:flex-row">
            <div className="w-full max-w-[250px]">
              {/* Button to create a new note */}
              <Button
                variant="primary"
                height="41px"
                icon="+"
                onClick={() =>
                  setCreateModal({ isOpen: true, type: "collection" })
                }
              >
                Create New Collection
              </Button>
            </div>
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
          {collections.length === 0 ? (
            <InfoText>
              <span>
                You don't have any notes yet. Start a new collection or note to
                capture your thoughts and ideas.
              </span>
            </InfoText>
          ) : (
            <div
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 
          gap-4 mt-6
            "
            >
              {collections.map((collection) => (
                <CollectionCard
                  key={collection.id}
                  collection={collection}
                  editing={editingId === collection.id}
                  setEditingId={setEditingId}
                  options={[
                    {
                      id: "rename",
                      label: "Rename",
                      onClick: () => setEditingId(collection.id),
                    },
                    {
                      id: "delete",
                      label: "Delete",
                      onClick: () => modal.openDelete(collection.id),
                    },
                    {
                      id: "archive",
                      label: "Archive",
                      onClick: () => modal.openArchive(collection.id),
                    },
                  ]}
                />
              ))}
            </div>
          )}
        </div>
      </MainPageView>

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
        />
      )}
    </>
  );
};

export default AllNotesPage;
