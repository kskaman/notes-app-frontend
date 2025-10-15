import { useDeferredValue, useState } from "react";
import {
  InfoText,
  Loader,
  NoteCard,
  StandardPageLayout,
  TextInput,
} from "../../../ui";
import { getSearchNotes } from "../../../api/notes";
import { SearchIcon } from "../../../assets";

const SearchPage = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const deferredInputValue = useDeferredValue(inputValue);
  const isLoading = deferredInputValue !== inputValue;

  return (
    <StandardPageLayout heading={"Search Notes"} variant="main">
      <div className="pt-4 pb-6">
        <TextInput
          value={inputValue}
          placeholder="Search notes..."
          onChange={(e) => {
            e.preventDefault();
            setInputValue(e.target.value);
          }}
          startIcon={<SearchIcon color="var(--input-item-icon-color)" />}
        />

        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <SearchResults query={deferredInputValue} />
          </div>
        )}
      </div>
    </StandardPageLayout>
  );
};

function SearchResults({ query }: { query: string }) {
  const notes = getSearchNotes(query);

  return (
    <>
      {notes.length === 0 && query.trim() !== "" ? (
        <InfoText>
          <span>No notes found.</span>
        </InfoText>
      ) : (
        notes.map((note) => (
          // Todo: implement note display
          <NoteCard
            key={note.title}
            type={note.isArchived ? "archived" : "regular"}
            note={note}
          />
        ))
      )}
    </>
  );
}
export default SearchPage;
