import { useNavigate } from "react-router";
import { Button } from "../../../ui";
import LeftArrowIcon from "../../../assets/icons/components/LeftArrowIcon";

const MobileTopBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-start justify-start m-4">
        <Button variant="text" onClick={() => navigate(-1)}>
          <div className="flex gap-0 items-center justify-start">
            <LeftArrowIcon color={`var(--nav-item-icon-color)`} />

            <span>Settings</span>
          </div>
        </Button>
      </div>
    </>
  );
};

export default MobileTopBar;
