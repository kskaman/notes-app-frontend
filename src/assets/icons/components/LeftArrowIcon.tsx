import type { IconProps } from "../../../types";

const LeftArrowIcon = ({
  color,
  width = 16,
  height = 16,
  className = "",
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
    className={className}
  >
    <path
      fill={color}
      fillRule="evenodd"
      d="M15.75 20.414 7.336 12l8.414-8.414L17.164 5l-7 7 7 7-1.414 1.414Z"
      clipRule="evenodd"
    />
  </svg>
);

export default LeftArrowIcon;
