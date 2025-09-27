import type { Collection } from "../../../../types/collection";

const CollectionCard = ({ collection }: { collection: Collection }) => {
  return (
    <div
      key={collection.name}
      className="p-4 border border-(--) rounded-[12px] 
            bg-(--collection-card-bg) 
            border border-(--collection-card-border)
            hover:bg-(--collection-card-hover-bg)
            cursor-pointer
            text-(--collection-card-text)
            "
    >
      {collection.name}
    </div>
  );
};

export default CollectionCard;
