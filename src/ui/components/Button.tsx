import type { CSSProperties } from "react";
import { memo, useMemo } from "react";
import clsx from "clsx";
import type { ButtonProps } from "../../types";
import { buttonVariants } from "../../constants";
import { LoadingSpinner } from "../feedback";

const Button = memo(({
  variant = "primary",
  children,
  icon,
  color,
  width = "100%",
  height = "44px",
  onClick,
  disabled = false,
  loading = false,
}: ButtonProps) => {
  // classify the variant
  const variantInfo = useMemo(() => {
    const isTextOnly = variant === "text";
    const isIconOnly = variant === "icon";
    const isRegular = !isTextOnly && !isIconOnly;
    return { isTextOnly, isIconOnly, isRegular };
  }, [variant]);

  const { isTextOnly, isIconOnly, isRegular } = variantInfo;

  // base: flex + center
  const base = `
    flex
    items-center
    justify-center
    gap-2 
    cursor-pointer`;

  // only “regular” variants get rounded corners + transitions + active/focus styles
  const regularShape = isRegular
    ? "rounded-[12px] transition-colors duration-200 ease"
    : "";

  const activeFocus =
    isRegular && !disabled
      ? `
      active:ring-[2px]
      active:ring-(--btn-outer-shadow-color)
      active:ring-offset-[2px]
      active:ring-offset-(--btn-inner-shadow-color)
      focus-visible:outline-none
    `
      : "";

  const disabledClasses = disabled || loading
    ? `
      bg-(--btn-disabled-bg)
      text-(--btn-disabled-text)
      border-none
      cursor-not-allowed
    `
    : "";

  // pull in your variant styles (hover, bg, text, border, etc.)
  const variantClasses = !disabled && !loading ? buttonVariants[variant] : "";

  // inline style overrides:
  // - color only for unstyled variants
  // - width/height only for regular variants
  const style: CSSProperties = {};
  if (isTextOnly || isIconOnly) {
    if (color) style.color = color;
    style.width = "auto";
    style.height = "auto";
  } else {
    style.width = width;
    style.height = height;
  }

  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      style={style}
      className={clsx(
        base,
        regularShape,
        variantClasses,
        activeFocus,
        disabledClasses
      )}
    >
      {loading ? (
        <LoadingSpinner size="small" variant="spinner" />
      ) : (
        <>
          {isIconOnly && icon}
          {isTextOnly && <span className="text-base text-nowrap">{children}</span>}
          {isRegular && (
            <>
              {icon && <span>{icon}</span>}
              <span className="text-preset-4 text-nowrap">{children}</span>
            </>
          )}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
