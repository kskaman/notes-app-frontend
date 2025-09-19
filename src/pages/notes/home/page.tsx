import Button from "../../../ui/Button";
import InfoText from "../components/info-text";

const AllNotesPage = () => {
  const collections: { title: string }[] = [];

  return (
    <div
      className="w-full 
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
        collections.map((collection) => (
          <div key={collection.title}>{collection.title}</div>
        ))
      )}
    </div>
  );
};

export default AllNotesPage;
