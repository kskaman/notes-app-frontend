import { useLocation } from "react-router";

export const useBack = () => {
  const location = useLocation();

  // Get the last segment of the current pathname
  const path = location.pathname;

  // Show back button only if not on settings page
  const showBack = path.includes("collections") || path.includes("notes");

  if (path.includes("/collections/")) {
    const collectionType = path
      .split("/collections/")[1]
      ?.split("/")[0]
      .split("_")[0];
    const back_path = collectionType === "a" ? "/archived" : "/home";
    return { showBack, back_path };
  }
  return { showBack, back_path: null };
};
