import Button from "../../../ui/Button";

const AllNotesPage = () => {
  const notes: { title: string }[] = [];

  return (
    <div
      className="w-full lg:w-[242px] h-full 
      border-r border-(--divider)
      py-5 pr-4 pl-8
      flex flex-col gap-4 overflow-y-auto"
    >
      <div className="flex items-center gap-4">
        <div className="w-full max-w-[250px]">
          {/* Button to create a new note */}
          <Button variant="primary" height="41px" icon="+">
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
        notes.map((note) => <div key={note.title}>{note.title}</div>)
      )}
    </div>
  );
};

export default AllNotesPage;
