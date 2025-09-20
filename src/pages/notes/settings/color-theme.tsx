import { useState } from "react";
import colorThemeOptions from "../../../constants/colorThemeOptions";
import SettingsSubLayout from "./sub-page";
import ThemeOption from "../../../ui/theme-option";
import Button from "../../../ui/Button";

const ColorThemePage = () => {
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark">("light");

  const handleApply = () => {
    // Logic to apply the selected theme
    console.log("Font changed to:", selectedTheme);
  };

  return (
    <SettingsSubLayout
      heading="Color Theme"
      subHeading="Change your color theme"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleApply();
        }}
        className="flex flex-col gap-4 w-full"
      >
        {colorThemeOptions.map((option) => (
          <ThemeOption
            key={option.id}
            id={option.id}
            title={option.title}
            description={option.description}
            icon={option.icon}
            name="color-theme"
            value={option.value}
            checked={selectedTheme === option.value}
            onChange={() => setSelectedTheme(option.value as "light" | "dark")}
          />
        ))}

        <div className="flex justify-end mt-2">
          <Button variant="primary" width="132px" height="41px">
            Apply Changes
          </Button>
        </div>
      </form>
    </SettingsSubLayout>
  );
};

export default ColorThemePage;
