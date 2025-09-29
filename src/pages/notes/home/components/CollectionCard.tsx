import type { Collection } from "../../../../types/collection";
import type { MenuOption } from "../../../../types/optionsButton";
import OptionsMenu from "../../../../ui/options-button";

const CollectionCard = ({
  collection,
  options,
}: {
  collection: Collection;
  options: MenuOption[];
}) => {
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
        <div className="text-preset-3">{collection.name}</div>
        <div className="text-preset-5">{collection.noteCount} note(s)</div>
      </div>

      <OptionsMenu options={options} />
    </div>
  );
};

export default CollectionCard;
