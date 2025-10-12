import { useNavigate } from "react-router";
import { useBack } from "../../../../hooks/useBack";
import Button from "../../../../ui/Button";

import leftArrowIcon from "../../../../assets/images/icon-arrow-left.svg";

const DesktopHeader = ({ heading }: { heading: string }) => {
  const showBack = useBack().showBack;
  const navigate = useNavigate();

  return (
    <header
      className="flex w-full flex items-center px-8
            h-[80px] border-b border-(--divider) shrink-0"
    >
      {/* desktop page header */}
      {showBack && (
        <Button
          variant="icon"
          width="10px"
          icon={<img src={leftArrowIcon} />}
          onClick={() => {
            navigate(-1);
          }}
        />
      )}
      {/* desktop page header */}
      <h1 className="text-preset-1">{heading}</h1>
    </header>
  );
};

export default DesktopHeader;
