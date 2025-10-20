import { useState } from "react";
import SettingsSubLayout from "./settings-sub-layout";
import {
  getColorTheme,
  requestUpdateColorTheme,
} from "../../../api/userSettings";
import { Button, ThemeOption } from "../../../ui";
import colorThemeOptions from "../../../constants/theme/colorThemeOptions";

const ColorThemePage = () => {
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark">(() =>
    getColorTheme()
  );

  const handleApply = (value: "light" | "dark") => {
    // Logic to apply the selected theme
    requestUpdateColorTheme(value);
  };

  return (
    <SettingsSubLayout
      heading="Color Theme"
      subHeading="Change your color theme"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleApply(selectedTheme);
        }}
        className="flex flex-col gap-4 w-full"
      >
        {colorThemeOptions.map((option) => (
          <ThemeOption
            key={option.id}
            id={option.id}
            title={option.title}
            description={option.description}
            icon={
              <option.icon
                color={`var(--option-icon)`}
                height={20}
                width={20}
              />
            }
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
