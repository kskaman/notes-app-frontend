import { memo, useMemo, useCallback } from "react";

// Higher-order component for automatic memoization
export const withMemo = <P extends object>(
  Component: React.ComponentType<P>,
  areEqual?: (prevProps: P, nextProps: P) => boolean
) => {
  const MemoizedComponent = memo(Component, areEqual);
  MemoizedComponent.displayName = `Memo(${
    Component.displayName || Component.name
  })`;
  return MemoizedComponent;
};

// Hook for memoizing expensive computations
export const useExpensiveComputation = <T>(
  computation: () => T,
  dependencies: React.DependencyList
): T => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => computation(), dependencies);
};

// Hook for memoizing callback functions
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useStableCallback = <T extends (...args: any[]) => any>(
  callback: T,
  dependencies: React.DependencyList
): T => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(callback, dependencies);
};

// Memoization utilities for common patterns
export const memoUtils = {
  // Shallow compare for object props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  shallowEqual: <T extends Record<string, any>>(obj1: T, obj2: T): boolean => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }

    return true;
  },

  // Deep compare for nested objects (use sparingly)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deepEqual: (obj1: any, obj2: any): boolean => {
    if (obj1 === obj2) return true;

    if (obj1 == null || obj2 == null) return false;

    if (typeof obj1 !== "object" || typeof obj2 !== "object") return false;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
      if (!keys2.includes(key)) return false;
      if (!memoUtils.deepEqual(obj1[key], obj2[key])) return false;
    }

    return true;
  },

  // Memoize array props
  arrayEqual: <T>(arr1: T[], arr2: T[]): boolean => {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((item, index) => item === arr2[index]);
  },
};
