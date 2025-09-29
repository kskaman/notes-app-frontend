import { getAllArchivedCollections } from "../../../api/archivedCollections";
import type { Collection } from "../../../types/collection";
import InfoText from "../components/info-text";
import MainPageView from "../components/page-views/main-page-view";
import CollectionCard from "../home/components/CollectionCard";

const ArchivedPage = () => {
  const archivedCollections: Collection[] = getAllArchivedCollections();

  return (
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
              No notes have been archived yet. Move notes here for safekeeping.
            </span>
          </InfoText>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
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
                    onClick: () => console.log("Restore clicked"),
                  },
                  {
                    id: "delete",
                    label: "Delete",
                    onClick: () => console.log("Delete clicked"),
                  },
                ]}
              />
            ))}
          </div>
        )}
      </div>
    </MainPageView>
  );
};

export default ArchivedPage;
