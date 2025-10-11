import logo from "../../../../assets/logo.svg";
import Button from "../../../../ui/Button";
import leftArrowIcon from "../../../../assets/images/icon-arrow-left.svg";
import { useNavigate } from "react-router";
import { useBack } from "../../../../hooks/useBack";

const MobileHeader = ({ heading }: { heading: string }) => {
  const navigate = useNavigate();
  const showBack = useBack().showBack;

  return (
    <div className="overflow-y-auto">
      <div
        className="w-full h-[54px] md:h-[74px]
            flex items-center justify-start
            px-4 md:px-8 bg-(--logo-bar-background)"
      >
        <img src={logo} alt="logo" className="h-7 w-auto" />
      </div>
      <header
        className="flex lg:hidden w-full flex items-center px-8
          md:h-[29px] mt-5 md:mt-6 mb-4"
      >
        {/* desktop page header */}
        {showBack && (
          <Button
            variant="icon"
            width="10px"
            icon={<img src={leftArrowIcon} />}
            onClick={() => navigate(-1)}
          />
        )}
        <h1 className="text-preset-1">{heading}</h1>
      </header>
    </div>
  );
};

export default MobileHeader;
