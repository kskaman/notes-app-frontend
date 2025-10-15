// Form field base props
export interface FormFieldProps {
  name: string;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

// Form validation types
export interface ValidationRule {
  type: "required" | "email" | "minLength" | "maxLength" | "pattern";
  message: string;
  value?: string | number;
}

export interface FormValidationSchema {
  [fieldName: string]: ValidationRule[];
}

// Form state types
export interface FormState<T = Record<string, unknown>> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

// Form action types
export type FormAction<T = Record<string, unknown>> =
  | { type: "SET_FIELD_VALUE"; field: keyof T; value: T[keyof T] }
  | { type: "SET_FIELD_ERROR"; field: keyof T; error: string }
  | { type: "SET_FIELD_TOUCHED"; field: keyof T; touched: boolean }
  | { type: "SET_SUBMITTING"; isSubmitting: boolean }
  | { type: "RESET_FORM"; initialValues: T };

// Auth form types
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Settings form types
export interface UserSettingsFormData {
  email?: string;
  firstName?: string;
  lastName?: string;
  colorTheme?: "light" | "dark";
  fontTheme?: "sans-serif" | "serif" | "monospace";
}

// Create content form types
export interface CreateNoteFormData {
  title: string;
  content?: string;
  collectionId?: string;
}

export interface CreateCollectionFormData {
  name: string;
  description?: string;
  color?: string;
}
