import { useState } from "react";
import Button from "./Button";
import HDivider from "./HDivider";
import Modal from "./modal";
import TextInput from "./TextInput";
import { createCollection, isCollectionNameTaken } from "../api/collections";

interface Props {
  type: "note" | "collection";
  onClose: () => void;
}

const CreateModal = ({ type, onClose }: Props) => {
  const [collection, setCollection] = useState<string>("");
  const [error, setError] = useState<{ message?: string } | undefined>(
    undefined
  );

  const handleSubmit = () => {
    if (type === "collection") {
      if (collection.trim() === "") {
        setError({ message: "Collection name cannot be empty" });
        return;
      } else if (isCollectionNameTaken(collection.trim())) {
        setError({ message: "Collection already exists" });
        return;
      }
    }

    // Proceed with creation logic
    createCollection(collection.trim());
    onClose();
  };

  return (
    <>
      <Modal>
        <div
          className="flex flex-col justify-center gap-4
        p-5"
        >
          {type === "collection" ? (
            <TextInput
              type="text"
              label="Collection Name"
              placeholder="Enter the name of the collection"
              value={collection}
              onChange={(e) => setCollection(e.target.value)}
              error={error}
            />
          ) : null}
        </div>
        <HDivider />
        <div
          className="flex justify-end items-center gap-4            
        py-4 px-5 "
        >
          <Button
            variant="secondary"
            width="78px"
            height="41px"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            width="110px"
            height="41px"
            onClick={handleSubmit}
          >
            Create
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CreateModal;
