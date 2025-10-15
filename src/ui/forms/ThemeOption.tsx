import { FAMILY_CLASS } from "../../constants";
import type { ThemeOptionProps } from "../../types";

const ThemeOption = ({
  id,
  title,
  description,
  icon,
  name,
  value,
  checked,
  onChange,
}: ThemeOptionProps) => {
  const familyClass =
    FAMILY_CLASS[value as "sans-serif" | "serif" | "monospace"];

  return (
    <label
      htmlFor={id}
      className={`flex items-center justify-between 
      p-4 border border-(--option-border) rounded-[12px] 
      ${
        checked ? "bg-(--option-hover-bg)" : "bg-(--option-bg)"
      } cursor-pointer gap-4 h-[72px]`}
    >
      <div className={`flex items-center gap-4`}>
        <div
          className="flex items-center justify-center 
          border border-(--option-icon-border) rounded-[12px]
        w-10 h-10 bg-(--option-icon-bg)"
        >
          <img src={icon} alt="theme option icon" className="w-5" />
        </div>
        <div className={`flex flex-col ${familyClass}`}>
          <span className="text-preset-4 text-(--option-label-text)">
            {title}
          </span>
          <span className="text-preset-6 text-(--option-description)">
            {description}
          </span>
        </div>
      </div>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className={`
    w-3 h-3 rounded-full
    border-[3px]
    ${checked ? "border-blue-600" : "border-gray-300"}
    appearance-none
    transition duration-150
    bg-white
  `}
      />
    </label>
  );
};

export default ThemeOption;
