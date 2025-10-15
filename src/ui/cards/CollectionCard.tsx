import { useState } from "react";
import { useNavigate } from "react-router";
import type { Collection, MenuOption } from "../../types";
import { renameCollection } from "../../api/collections";
import { OptionsMenu } from "../navigation";

const CollectionCard = ({
  type,
  collection,
  options,
  editing = false,
  setEditingId = () => {},
}: {
  type: "archived" | "regular";
  collection: Collection;
  options: MenuOption[];
  editing?: boolean;
  setEditingId?: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [value, setValue] = useState<string>(collection.name);
  const navigate = useNavigate();

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
      onDoubleClick={() =>
        navigate(`/collections/${type[0] + "_" + collection.id}`)
      }
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
