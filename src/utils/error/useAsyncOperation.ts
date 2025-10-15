import { useState, useCallback } from 'react';
import type { AppError } from './errorHandler';
import { handleAPIError } from './errorHandler';

export interface AsyncState<T = unknown> {
  data: T | null;
  loading: boolean;
  error: AppError | null;
}

export const useAsyncOperation = <T = unknown>(initialData: T | null = null) => {
  const [state, setState] = useState<AsyncState<T>>({
    data: initialData,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (
    asyncFunction: () => Promise<T>,
    options?: {
      onSuccess?: (data: T) => void;
      onError?: (error: AppError) => void;
      resetOnStart?: boolean;
    }
  ): Promise<void> => {
    const { onSuccess, onError, resetOnStart = true } = options || {};

    setState(prev => ({
      ...prev,
      loading: true,
      error: resetOnStart ? null : prev.error,
    }));

    try {
      const result = await asyncFunction();
      setState({
        data: result,
        loading: false,
        error: null,
      });
      
      onSuccess?.(result);
    } catch (error) {
      const appError = handleAPIError(error);
      setState({
        data: initialData,
        loading: false,
        error: appError,
      });
      
      onError?.(appError);
    }
  }, [initialData]);

  const reset = useCallback(() => {
    setState({
      data: initialData,
      loading: false,
      error: null,
    });
  }, [initialData]);

  const clearError = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: null,
    }));
  }, []);

  return {
    ...state,
    execute,
    reset,
    clearError,
    isIdle: !state.loading && !state.error && state.data === initialData,
  };
};
