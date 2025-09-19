import InfoText from "../components/info-text";

const ArchivedPage = () => {
  const archivedNotes: { title: string }[] = [];

  return (
    <div
      className="w-full lg:w-[242px] h-full 
      lg:border-r lg:border-(--divider)
      py-5 pr-4 pl-8
      flex flex-col gap-4 overflow-y-auto"
    >
      <p className="text-preset-5 text-[#2b303b]">
        All your archived notes are stored here. You can restore or delete them
        anytime.
      </p>
      {/* If there are no notes, display a message  
      else display list of notes */}
      {archivedNotes.length === 0 ? (
        <InfoText>
          <span>
            No notes have been archived yet. Move notes here for safekeeping.
          </span>
        </InfoText>
      ) : (
        archivedNotes.map((note) => <div key={note.title}>{note.title}</div>)
      )}
    </div>
  );
};

export default ArchivedPage;
