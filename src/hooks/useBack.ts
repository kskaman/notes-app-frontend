import { useLocation } from "react-router";

export const useBack = () => {
  const location = useLocation();

  // Get the last segment of the current pathname
  const path = location.pathname;

  // Show back button only if not on settings page
  const showBack = path.includes("collections") || path.includes("notes");
  return { showBack };
};
