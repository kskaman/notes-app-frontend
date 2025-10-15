import {
  deleteArchivedCollection,
  getAllArchivedCollections,
  unarchiveCollection,
} from "../../../api/collections";
import { ArchivedIcon, TrashIcon } from "../../../assets";
import { useActionModal } from "../../../hooks";
import type { Collection } from "../../../types";
import {
  ConfirmModal,
  InfoText,
  StandardPageLayout,
  CollectionCard,
} from "../../../ui";

const ArchivedPage = () => {
  const archivedCollections: Collection[] = getAllArchivedCollections();

  const modal = useActionModal({
    type: "collection",
    onDelete: (id) => {
      deleteArchivedCollection(id);
    },
    onUnarchive: (id) => {
      unarchiveCollection(id);
    },
    onArchive: () => {},
  });

  return (
    <>
      <StandardPageLayout heading="Archived Notes" variant="main">
        <div
          className="w-full  h-full
      
      flex flex-col gap-4 overflow-y-auto"
        >
          <p className="text-preset-5 text-[#2b303b]">
            All your archived notes are stored here. You can restore or delete
            them anytime.
          </p>
          {/* If there are no notes, display a message  
      else display list of notes */}
          {archivedCollections.length === 0 ? (
            <InfoText>
              <span>
                No notes have been archived yet. Move notes here for
                safekeeping.
              </span>
            </InfoText>
          ) : (
            <div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 
          gap-4 mt-6
            "
            >
              {archivedCollections.map((collection) => (
                <CollectionCard
                  type="archived"
                  key={collection.id}
                  collection={collection}
                  options={[
                    {
                      id: "restore",
                      label: "Restore",
                      onClick: () => modal.openUnarchive(collection.id),
                    },
                    {
                      id: "delete",
                      label: "Delete",
                      onClick: () => modal.openDelete(collection.id),
                    },
                  ]}
                />
              ))}
            </div>
          )}
        </div>
      </StandardPageLayout>

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
    </>
  );
};

export default ArchivedPage;
