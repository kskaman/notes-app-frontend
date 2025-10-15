import { useState, useCallback } from 'react';

// Enhanced form validation utilities
export interface ValidationRule<T = unknown> {
  validate: (value: T) => boolean;
  message: string;
}

export interface FieldValidation<T = unknown> {
  required?: boolean;
  rules?: ValidationRule<T>[];
  asyncValidation?: (value: T) => Promise<string | null>;
}

export interface FormErrors {
  [field: string]: string | null;
}

export interface FormTouched {
  [field: string]: boolean;
}

// Common validation rules
export const validationRules = {
  email: {
    validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: 'Please enter a valid email address',
  },
  
  minLength: (min: number) => ({
    validate: (value: string) => value.length >= min,
    message: `Must be at least ${min} characters long`,
  }),

  maxLength: (max: number) => ({
    validate: (value: string) => value.length <= max,
    message: `Must be no more than ${max} characters long`,
  }),

  pattern: (regex: RegExp, message: string) => ({
    validate: (value: string) => regex.test(value),
    message,
  }),

  password: {
    validate: (value: string) => 
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@_])[A-Za-z\d#@_]{8,20}$/.test(value),
    message: '8–20 chars, upper, lower, digit & #@_',
  },

  notEmpty: {
    validate: (value: string) => value.trim().length > 0,
    message: 'This field is required',
  },

  matchField: (compareValue: string, fieldName: string) => ({
    validate: (value: string) => value === compareValue,
    message: `Must match ${fieldName}`,
  }),
};

// Validation function
export const validateField = <T>(
  value: T,
  validation: FieldValidation<T>
): string | null => {
  if (validation.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    return 'This field is required';
  }

  if (!validation.rules || !value) return null;

  for (const rule of validation.rules) {
    if (!rule.validate(value)) {
      return rule.message;
    }
  }

  return null;
};

// Form validation hook
export const useFormValidation = <T extends Record<string, unknown>>(
  initialValues: T,
  validationSchema: { [K in keyof T]?: FieldValidation<T[K]> }
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setFieldTouched] = useState<FormTouched>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setValues((prev: T) => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field as string]) {
      setErrors((prev: FormErrors) => ({ ...prev, [field]: null }));
    }
  }, [errors]);

  const setTouched = useCallback(<K extends keyof T>(field: K) => {
    setFieldTouched((prev: FormTouched) => ({ ...prev, [field]: true }));
  }, []);

  const validateFormFields = useCallback(async (): Promise<boolean> => {
    const newErrors: FormErrors = {};
    const asyncValidations: Promise<void>[] = [];

    for (const [field, validation] of Object.entries(validationSchema)) {
      if (!validation) continue;

      const fieldValue = values[field as keyof T];
      const error = validateField(fieldValue, validation);
      
      if (error) {
        newErrors[field] = error;
      } else if (validation.asyncValidation && fieldValue) {
        asyncValidations.push(
          validation.asyncValidation(fieldValue).then((asyncError: string | null) => {
            if (asyncError) {
              newErrors[field] = asyncError;
            }
          })
        );
      }
    }

    // Wait for all async validations
    if (asyncValidations.length > 0) {
      await Promise.all(asyncValidations);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values, validationSchema]);

  const validateSingleField = useCallback(async <K extends keyof T>(field: K): Promise<boolean> => {
    const validation = validationSchema[field];
    if (!validation) return true;

    const fieldValue = values[field];
    let error = validateField(fieldValue, validation);

    if (!error && validation.asyncValidation && fieldValue) {
      error = await validation.asyncValidation(fieldValue);
    }

    setErrors((prev: FormErrors) => ({ ...prev, [field]: error }));
    return !error;
  }, [values, validationSchema]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setFieldTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const isValid = Object.values(errors).every(error => !error);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    setValue,
    setTouched,
    setIsSubmitting,
    validateForm: validateFormFields,
    validateField: validateSingleField,
    reset,
  };
};
