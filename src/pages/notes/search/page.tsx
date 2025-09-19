import { useState } from "react";
import SearchIcon from "../../../assets/icons/SearchIcon";
import TextInput from "../../../ui/TextInput";
import InfoText from "../components/info-text";
import type { Note } from "../../../types/note";

const SearchPage = () => {
  const [inputValue, setInputValue] = useState<string>("");

  // TODO: implement note fetching
  const notes: Note[] = [];

  return (
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

      {notes.length === 0 && inputValue.trim() !== "" && (
        <InfoText>
          <span>No notes found.</span>
        </InfoText>
      )}

      {notes.map((note) => (
        // Todo: implement note display
        <div key={note.title}>{note.title}</div>
      ))}
    </div>
  );
};

export default SearchPage;
