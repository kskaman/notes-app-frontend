import { useState } from "react";
import type { Note } from "../../../types/note";
import type { MenuOption } from "../../../types/optionsButton";
import OptionsMenu from "../../../ui/options-button";
import { formatDate } from "../../../utils/dateConversions";
import { useNavigate } from "react-router";
import { renameNote } from "../../../api/notes";

const NoteCard = ({
  type,
  note,
  options,
  editing = false,
  setEditingId = () => {},
}: {
  type: "archived" | "regular";
  note: Note;
  options: MenuOption[];
  editing?: boolean;
  setEditingId?: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [value, setValue] = useState<string>(note.title);
  const navigate = useNavigate();

  return (
    <div
      className="w-full p-2 
        flex flex-col gap-3
        bg-(--notes-card-bg) hover:bg-(--notes-card-hover-bg)
        cursor-pointer"
    >
      <div className="flex justify-between items-center">
        {editing ? (
          <input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => {
              if (value.trim() !== note.title) {
                renameNote(
                  note.id,
                  value.trim(),
                  type === "archived" ? true : false
                );
              }
              setEditingId(null);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (value.trim() !== note.title) {
                  renameNote(
                    note.id,
                    value.trim(),
                    type === "archived" ? true : false
                  );
                }
                setEditingId(null);
              }
            }}
            className="flex-1 text-preset-3 
              rounded-[12px] bg-background
              border-none outline-none
              focus:outline-none focus:ring-0
              focus:border-none shadow-none"
          />
        ) : (
          <h3
            className="text-preset-3 font-semibold
        text-(--notes-card-text)"
          >
            {note.title}
          </h3>
        )}

        <OptionsMenu options={options} />
      </div>
      <span
        className="text-preset-5
      text-(--notes-card-subtext)"
      >
        {formatDate(note.lastEdited)}
      </span>
    </div>
  );
};

export default NoteCard;
