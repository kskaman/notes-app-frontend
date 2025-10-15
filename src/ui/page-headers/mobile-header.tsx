import leftArrowIcon from "../../assets/icons/svg/icon-arrow-left.svg";
import { useNavigate } from "react-router";
import { useBack } from "../../hooks/useBack";
import { Button } from "../components";

const MobileHeader = ({ heading }: { heading: string }) => {
  const navigate = useNavigate();
  const showBack = useBack().showBack;

  return (
    <div className="overflow-y-auto">
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
