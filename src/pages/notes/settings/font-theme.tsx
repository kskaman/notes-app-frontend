import { useState } from "react";
import Button from "../../../ui/Button";
import SettingsSubLayout from "./settings-sub-layout";
import ThemeOption from "../../../ui/theme-option";
import {
  getFontTheme,
  requestUpdateFontTheme,
} from "../../../api/userSettings";
import { fontThemeOptions } from "../../../constants/fontThemeOptions";

const FontThemePage = () => {
  const [selectedTheme, setSelectedTheme] = useState<
    "sans-serif" | "serif" | "monospace"
  >(() => {
    return getFontTheme();
  });

  const handleApply = () => {
    // Logic to apply the selected theme
    requestUpdateFontTheme(selectedTheme);
    document.documentElement.setAttribute("data-font-theme", selectedTheme);
  };

  return (
    <SettingsSubLayout heading="Font Theme" subHeading="Change your font theme">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleApply();
        }}
        className="flex flex-col gap-4 w-full lg:w-[528px]"
      >
        {fontThemeOptions.map((option) => (
          <ThemeOption
            key={option.id}
            id={option.id}
            title={option.title}
            description={option.description}
            icon={option.icon}
            name="color-theme"
            value={option.value}
            checked={selectedTheme === option.value}
            onChange={() =>
              setSelectedTheme(
                option.value as "sans-serif" | "serif" | "monospace"
              )
            }
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

export default FontThemePage;
