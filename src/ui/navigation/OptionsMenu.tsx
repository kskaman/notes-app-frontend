import { useEffect, useRef, useState } from "react";
import type { MenuOption } from "../../types";

interface OptionsMenuProps {
  options: MenuOption[];
  align?: "left" | "right";
  buttonClassName?: string;
}

export default function OptionsMenu({
  options,
  align = "right",
  buttonClassName = "",
}: OptionsMenuProps) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  // Focus first item when opening
  useEffect(() => {
    if (open && menuRef.current) {
      const first = menuRef.current.querySelector<HTMLElement>(
        "[data-menu-item]:not([aria-disabled='true'])"
      );
      first?.focus();
    }
  }, [open]);

  const handleKeyNav = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>("[data-menu-item]") ?? []
    ).filter((el) => el.getAttribute("aria-disabled") !== "true");
    if (!items.length) return;

    const idx = items.indexOf(document.activeElement as HTMLElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[(idx + 1) % items.length].focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[(idx - 1 + items.length) % items.length].focus();
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className={`inline-flex items-center 
          justify-center rounded-full p-2 hover:bg-gray-100
          focus:outline-none focus:ring-2 focus:ring-offset-2
          focus:ring-gray-300 ${buttonClassName}
          cursor-pointer`}
        title="Options"
      >
        <span className="sr-only">Open options</span>
        {/* 3 dots icon */}
        <svg
          viewBox="0 0 20 20"
          className="h-5 w-5"
          fill="currentColor"
          aria-hidden="true"
        >
          <circle cx="3" cy="10" r="1.75" />
          <circle cx="10" cy="10" r="1.75" />
          <circle cx="17" cy="10" r="1.75" />
        </svg>
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-label="Options"
          tabIndex={-1}
          onKeyDown={handleKeyNav}
          className={`absolute z-20 mt-2 min-w-40 rounded-[12px]
             border border-gray-200 bg-white p-1.5 focus:outline-none ${
               align === "right" ? "right-0" : "left-0"
             }`}
        >
          {options.map((opt) => {
            const disabled = !!opt.disabled;
            return (
              <button
                key={opt.id}
                type="button"
                role="menuitem"
                data-menu-item
                aria-disabled={disabled || undefined}
                disabled={disabled}
                onClick={() => {
                  if (disabled) return;
                  opt.onClick();
                  setOpen(false);
                  btnRef.current?.focus();
                }}
                className={`w-full rounded-xl px-3 py-2 text-left text-sm transition cursor-pointer
                  ${
                    disabled
                      ? "cursor-not-allowed text-gray-400"
                      : "hover:bg-gray-100 active:bg-gray-200"
                  }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
