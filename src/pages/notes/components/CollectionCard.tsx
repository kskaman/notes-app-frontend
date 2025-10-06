import { useState } from "react";
import type { Collection } from "../../../types/collection";
import type { MenuOption } from "../../../types/optionsButton";
import OptionsMenu from "../../../ui/options-button";
import { renameCollection } from "../../../api/collections";

const CollectionCard = ({
  collection,
  options,
  editing = false,
  setEditingId = () => {},
}: {
  collection: Collection;
  options: MenuOption[];
  editing?: boolean;
  setEditingId?: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [value, setValue] = useState<string>(collection.name);

  return (
    <div
      key={collection.name}
      className="p-4 border border-(--) rounded-[12px] 
            bg-(--collection-card-bg) 
            border border-(--collection-card-border)
            hover:bg-(--collection-card-hover-bg)
            cursor-pointer
            text-(--collection-card-text)
            flex flex-row gap-2
            justify-between
            "
    >
      <div className="flex flex-col gap-3">
        {editing ? (
          <input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => {
              if (value.trim() !== collection.name) {
                renameCollection(collection.id, value.trim());
              }
              setEditingId(null);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (value.trim() !== collection.name) {
                  renameCollection(collection.id, value.trim());
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
          <div className="text-preset-3">{collection.name}</div>
        )}
        <div className="text-preset-5">{collection.noteCount} note(s)</div>
      </div>

      <OptionsMenu options={options} />
    </div>
  );
};

export default CollectionCard;
