// Core domain types
export type { Collection } from './collection';
export type { Note } from './note';
export type { User } from './user';
export type { MenuOption } from './optionsButton';
export type { FontThemeOptionType } from './fontThemeType';
export type { ModalState } from './modalState';
export type { IconProps } from './icon';

// Component types
export type {
  BaseComponentProps,
  InteractiveProps,
  ButtonProps,
  BaseInputProps,
  TextInputProps,
  PasswordInputProps,
  BaseModalProps,
  ConfirmModalProps,
  CreateModalProps,
  LayoutProps,
  NavigationProps,
  BaseCardProps,
  ThemeOptionProps,
  DividerProps,
  OptionsMenuProps,
} from './components';

// Layout types
export type {
  BaseLayoutProps,
  LogoBarProps,
  ResponsiveLayoutProps,
  StandardPageLayoutProps,
  SettingsSubLayoutProps,
  MobileHeaderProps,
  DesktopHeaderProps,
  SidebarProps,
  BottomNavbarProps,
} from './layouts';

// Form types
export type {
  FormFieldProps,
  ValidationRule,
  FormValidationSchema,
  FormState,
  FormAction,
  LoginFormData,
  SignupFormData,
  ForgotPasswordFormData,
  ChangePasswordFormData,
  UserSettingsFormData,
  CreateNoteFormData,
  CreateCollectionFormData,
} from './forms';
