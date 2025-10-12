import { useState } from "react";
import Button from "./Button";
import HDivider from "./HDivider";
import Modal from "./modal";
import TextInput from "./TextInput";
import { createCollection, isCollectionNameTaken } from "../api/collections";
import { createNote, isNoteNameTaken } from "../api/notes";

interface Props {
  type: "note" | "collection";
  onClose: () => void;
  collectionId?: string | null;
}

const CreateModal = ({ type, onClose, collectionId }: Props) => {
  const [document, setDocument] = useState<string>("");
  const [error, setError] = useState<{ message?: string } | undefined>(
    undefined
  );

  const handleSubmit = () => {
    if (type === "collection") {
      if (document.trim() === "") {
        setError({ message: "Collection name cannot be empty" });
        return;
      } else if (isCollectionNameTaken(document.trim())) {
        setError({ message: "Collection already exists" });
        return;
      }
      // Proceed with creation logic
      createCollection(document.trim());
    } else if (type === "note") {
      if (collectionId === null || collectionId === undefined) {
        return;
      }

      if (document.trim() === "") {
        setError({ message: "Note content cannot be empty" });
        return;
      } else if (isNoteNameTaken(document.trim())) {
        setError({ message: "Note with this content already exists" });
        return;
      }
      // Proceed with creation logic for note
      createNote(document.trim(), collectionId);
    }

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
              value={document}
              onChange={(e) => setDocument(e.target.value)}
              error={error}
            />
          ) : (
            <TextInput
              type="text"
              label="Note's Name"
              placeholder="Enter the name of the note"
              value={document}
              onChange={(e) => setDocument(e.target.value)}
              error={error}
            />
          )}
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
