import { forwardRef, useCallback, useState } from 'react';
import clsx from 'clsx';
import type { TextInputProps } from '../../types';
import { useDebouncedCallback } from '../../utils';
import { InfoIcon } from '../../assets';

interface EnhancedTextInputProps extends TextInputProps {
  validateOnChange?: boolean;
  debounceDelay?: number;
  showValidationIcon?: boolean;
  validator?: (value: string) => Promise<string | null> | string | null;
}

const EnhancedTextInput = forwardRef<HTMLInputElement, EnhancedTextInputProps>(({
  type = "text",
  onChange,
  label,
  subLabel,
  name,
  value,
  placeholder = "",
  startIcon,
  endIcon,
  error,
  infoText,
  disabled = false,
  onFocus,
  validateOnChange = false,
  debounceDelay = 300,
  showValidationIcon = false,
  validator,
  className = "",
  ...props
}, ref) => {
  const [validationState, setValidationState] = useState<{
    isValidating: boolean;
    isValid?: boolean;
    validationError?: string;
  }>({ isValidating: false });

  const debouncedValidate = useDebouncedCallback(async (inputValue: string) => {
    if (!validator || !validateOnChange) return;

    setValidationState({ isValidating: true });
    
    try {
      const validationResult = await validator(inputValue);
      setValidationState({
        isValidating: false,
        isValid: !validationResult,
        validationError: validationResult || undefined,
      });
    } catch {
      setValidationState({
        isValidating: false,
        isValid: false,
        validationError: 'Validation failed',
      });
    }
  }, debounceDelay);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    
    if (validateOnChange) {
      debouncedValidate(event.target.value);
    }
  }, [onChange, validateOnChange, debouncedValidate]);

  const hasError = Boolean(error?.message || validationState.validationError);
  const borderColorClass = hasError
    ? "border border-(--warning-color)"
    : validationState.isValid === true
    ? "border border-green-500"
    : "border border-(--input-field-border)";

  // Choose the message to show - prioritize validation error over info text
  const message = error?.message || 
                  validationState.validationError || 
                  (infoText ? infoText : "");

  const messageColor = error?.message || validationState.validationError
    ? "text-(--warning-color)" 
    : validationState.isValid === true
    ? "text-green-600"
    : "text-(--input-field-info-text)";

  return (
    <div className={`w-full flex flex-col gap-[1px] ${className}`}>
      <div className="mb-[2px] flex justify-between items-center">
        {label && (
          <span className="text-preset-4 text-(--input-field-label-color)">
            {label}
          </span>
        )}
        {subLabel && typeof subLabel === "string" ? (
          <span className="text-preset-7 text-(--input-field-sublabel-color)">
            {subLabel}
          </span>
        ) : (
          subLabel
        )}
      </div>

      <div
        className={clsx(
          "flex items-center bg-(--input-field-bg) rounded-[12px]",
          borderColorClass,
          disabled && "bg-(--input-field-disabled-bg) cursor-not-allowed"
        )}
      >
        {startIcon && (
          <span className="ml-4 mr-2 flex items-center">{startIcon}</span>
        )}

        <input
          ref={ref}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          onFocus={onFocus}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 bg-transparent py-3 px-4 outline-none
            placeholder:text-(--input-field-placeholder)
            text-(--input-field-text)
            disabled:cursor-not-allowed
            text-preset-5"
          {...props}
        />

        <div className="flex items-center">
          {/* Validation state indicator */}
          {showValidationIcon && validateOnChange && (
            <span className="mr-2 flex items-center">
              {validationState.isValidating ? (
                <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
              ) : validationState.isValid === true ? (
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : validationState.isValid === false ? (
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              ) : null}
            </span>
          )}

          {endIcon && (
            <span
              className={clsx(
                "mr-4 ml-2 flex items-center",
                disabled && "cursor-not-allowed"
              )}
            >
              <button type="button" disabled={disabled}>
                {endIcon}
              </button>
            </span>
          )}
        </div>
      </div>

      <span className="flex gap-1 items-start min-h-5">
        {message && (
          <>
            <InfoIcon
              color={
                hasError
                  ? "var(--warning-color)"
                  : validationState.isValid === true
                  ? "green"
                  : "var(--input-field-info-text)"
              }
            />
            <p className={clsx(messageColor, "text-preset-7")}>
              {message}
            </p>
          </>
        )}
      </span>
    </div>
  );
});

EnhancedTextInput.displayName = 'EnhancedTextInput';

export default EnhancedTextInput;
