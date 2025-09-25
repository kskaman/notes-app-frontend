import { useState } from "react";
import colorThemeOptions from "../../../constants/colorThemeOptions";
import SettingsSubLayout from "./sub-page";
import ThemeOption from "../../../ui/theme-option";
import Button from "../../../ui/Button";
import store from "../../../store/store";

const ColorThemePage = () => {
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark">(() => {
    const user = store.getState().user;
    return "colorTheme" in user &&
      (user.colorTheme === "light" || user.colorTheme === "dark")
      ? user.colorTheme
      : "light";
  });

  const handleApply = (value: "light" | "dark") => {
    // Logic to apply the selected theme
    store.dispatch({ type: "user/updateColorTheme", payload: value });
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
