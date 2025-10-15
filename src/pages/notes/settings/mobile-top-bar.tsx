import { useNavigate } from "react-router";
import leftArrowIcon from "../../../assets/icons/svg/icon-arrow-left.svg";
import { Button } from "../../../ui";

const MobileTopBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-start justify-start m-4">
        <Button variant="text" onClick={() => navigate(-1)}>
          <div className="flex gap-0 items-center justify-start">
            <img src={leftArrowIcon} alt="Back" className="w-4" />
            <span>Settings</span>
          </div>
        </Button>
      </div>
    </>
  );
};

export default MobileTopBar;
