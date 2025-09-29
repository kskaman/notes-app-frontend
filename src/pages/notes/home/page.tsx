import { getAllCollections } from "../../../api/collections";
import Button from "../../../ui/Button";
import InfoText from "../components/info-text";
import CollectionCard from "./components/CollectionCard";
import MainPageView from "../components/page-views/main-page-view";

const AllNotesPage = () => {
  const collections = getAllCollections();

  return (
    <MainPageView heading="All Notes">
      <div
        className="w-full  h-full
      py-5 pr-4 pl-8
      flex flex-col gap-4 overflow-y-auto"
      >
        <div className="flex items-center gap-4 flex-col md:flex-row">
          <div className="w-full max-w-[250px]">
            {/* Button to create a new note */}
            <Button variant="primary" height="41px" icon="+">
              Create New Collection
            </Button>
          </div>
          <div className="w-full max-w-[250px]">
            {/* Button to create a new note */}
            <Button variant="primary" height="41px" icon="+">
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
          gap-4 mt-6
            "
          >
            {collections.map((collection) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                options={[
                  {
                    id: "rename",
                    label: "Rename",
                    onClick: () => console.log("Rename clicked"),
                  },
                  {
                    id: "delete",
                    label: "Delete",
                    onClick: () => console.log("Delete clicked"),
                  },
                  {
                    id: "archive",
                    label: "Archive",
                    onClick: () => console.log("Archive clicked"),
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

export default AllNotesPage;
