import Button from "../../../ui/Button";
import { useNavigate } from "react-router";
import leftArrowIcon from "../../../assets/images/icon-arrow-left.svg";
import logo from "../../../assets/logo.svg";

const MobileTopBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="w-full h-[54px] md:h-[74px]
            flex items-center justify-start
            px-4 md:px-8 bg-(--logo-bar-background)"
      >
        <img src={logo} alt="logo" className="h-7 w-auto" />
      </div>
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
