import { useDeferredValue, useState } from "react";
import SearchIcon from "../../../assets/icons/SearchIcon";
import TextInput from "../../../ui/TextInput";
import InfoText from "../components/info-text";
import MainPageView from "../components/page-views/main-page-view";
import { getSearchNotes } from "../../../api/notes";
import NoteCard from "../components/NoteCard";
import Loader from "../../../ui/Loader";

const SearchPage = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const deferredInputValue = useDeferredValue(inputValue);
  const isLoading = deferredInputValue !== inputValue;

  return (
    <MainPageView heading={"Search Notes"}>
      <div className="px-8 pt-4 pb-6">
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
    </MainPageView>
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
