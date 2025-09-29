export type MenuOption = {
  id: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
};
