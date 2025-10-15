import { useCallback, useRef, useEffect } from 'react';

// Debounced callback hook
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebouncedCallback = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T => {
  const timeoutRef = useRef<number | null>(null);

  const debouncedCallback = useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]) as T;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
};

// Throttled callback hook
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useThrottledCallback = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T => {
  const lastRun = useRef<number>(Date.now());

  const throttledCallback = useCallback((...args: Parameters<T>) => {
    if (Date.now() - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = Date.now();
    }
  }, [callback, delay]) as T;

  return throttledCallback;
};

// Event listener hook with cleanup
export const useEventListener = <K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element: Window | Document | HTMLElement | null = window,
  options?: AddEventListenerOptions
) => {
  const savedHandler = useRef(handler);

  // Update saved handler when handler changes
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!element) return;

    const eventListener = (event: Event) => {
      savedHandler.current(event as WindowEventMap[K]);
    };

    element.addEventListener(eventName, eventListener, options);

    return () => {
      element.removeEventListener(eventName, eventListener, options);
    };
  }, [eventName, element, options]);
};

// Click outside hook
export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  handler: () => void,
  enabled = true
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handler, enabled]);

  return ref;
};

// Keyboard shortcuts hook
export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  meta?: boolean;
  handler: (event: KeyboardEvent) => void;
  preventDefault?: boolean;
}

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcut[], enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const matchingShortcut = shortcuts.find(shortcut => {
        const keyMatches = shortcut.key.toLowerCase() === event.key.toLowerCase();
        const ctrlMatches = !!shortcut.ctrl === event.ctrlKey;
        const altMatches = !!shortcut.alt === event.altKey;
        const shiftMatches = !!shortcut.shift === event.shiftKey;
        const metaMatches = !!shortcut.meta === event.metaKey;

        return keyMatches && ctrlMatches && altMatches && shiftMatches && metaMatches;
      });

      if (matchingShortcut) {
        if (matchingShortcut.preventDefault !== false) {
          event.preventDefault();
        }
        matchingShortcut.handler(event);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts, enabled]);
};

// Optimized event handlers for forms
export const useOptimizedFormHandlers = <T extends Record<string, unknown>>(
  onChange: (field: keyof T, value: T[keyof T]) => void,
  debounceDelay = 300
) => {
  const debouncedOnChange = useDebouncedCallback(
    (field: keyof T, value: T[keyof T]) => onChange(field, value), 
    debounceDelay
  );

  const createInputHandler = useCallback((field: keyof T) => {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value as T[keyof T];
      
      // Immediate update for UI responsiveness
      onChange(field, value);
      
      // Debounced update for expensive operations (validation, API calls, etc.)
      debouncedOnChange(field, value);
    };
  }, [onChange, debouncedOnChange]);

  const createSelectHandler = useCallback((field: keyof T) => {
    return (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value as T[keyof T];
      onChange(field, value);
    };
  }, [onChange]);

  const createCheckboxHandler = useCallback((field: keyof T) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.checked as T[keyof T];
      onChange(field, value);
    };
  }, [onChange]);

  return {
    createInputHandler,
    createSelectHandler, 
    createCheckboxHandler,
  };
};
