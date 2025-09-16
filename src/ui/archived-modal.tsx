import ArchivedIcon from "../assets/icons/ArchivedIcon";
import Button from "./Button";
import HDivider from "./HDivider";
import Modal from "./modal";

const DeleteModal = () => {
  return (
    <>
      <Modal>
        <div
          className="flex flex-row justify-center gap-4
        p-5"
        >
          <div
            className="w-[70px] h-[40px] rounded-[8px]
          bg-(--modal-icon-bg) flex justify-center items-center"
          >
            <ArchivedIcon
              color="var(--modal-icon-color)"
              width={20}
              height={20}
            />
          </div>
          <div className="flex flex-col gap-4 justify-start items-between">
            <h3 className="text-preset-3">Archive Note</h3>
            <span className="text-preset-5">
              Are you sure you want to archive this note? You can find it in the
              Archived Notes section and restore it anytime.
            </span>
          </div>
        </div>
        <HDivider />
        <div
          className="flex justify-end items-center gap-4            
        py-4 px-5 "
        >
          <Button variant="secondary" width="78px" height="41px">
            Cancel
          </Button>
          <Button variant="primary" width="110px" height="41px">
            Archive Note
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
