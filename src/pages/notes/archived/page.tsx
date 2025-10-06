import {
  deleteArchivedCollection,
  getAllArchivedCollections,
  unarchiveCollection,
} from "../../../api/collections";
import ArchivedIcon from "../../../assets/icons/ArchivedIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import { useCollectionActionModal } from "../../../hooks/useCollectionActionModal";
import type { Collection } from "../../../types/collection";
import ConfirmModal from "../../../ui/delete-modal";
import InfoText from "../components/info-text";
import MainPageView from "../components/page-views/main-page-view";
import CollectionCard from "../components/CollectionCard";

const ArchivedPage = () => {
  const archivedCollections: Collection[] = getAllArchivedCollections();

  const modal = useCollectionActionModal({
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
      <MainPageView heading="Archived Notes">
        <div
          className="w-full  h-full
      py-5 pr-4 pl-8
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
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 
          gap-4 mt-6
            "
            >
              {archivedCollections.map((collection) => (
                <CollectionCard
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
    </>
  );
};

export default ArchivedPage;
