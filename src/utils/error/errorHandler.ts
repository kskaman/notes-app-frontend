// Error handling utilities and types
export interface AppError {
  message: string;
  code?: string;
  status?: number;
  details?: unknown;
}

export class APIError extends Error implements AppError {
  code?: string;
  status?: number;
  details?: unknown;

  constructor(message: string, code?: string, status?: number, details?: unknown) {
    super(message);
    this.name = 'APIError';
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export class ValidationError extends Error implements AppError {
  code?: string;
  status?: number;
  details?: unknown;

  constructor(message: string, code?: string, details?: unknown) {
    super(message);
    this.name = 'ValidationError';
    this.code = code;
    this.status = 400;
    this.details = details;
  }
}

// Error handling functions
export const handleAPIError = (error: unknown): AppError => {
  if (error instanceof APIError || error instanceof ValidationError) {
    return error;
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'UNKNOWN_ERROR',
      status: 500,
    };
  }

  return {
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
    status: 500,
    details: error,
  };
};

export const formatErrorMessage = (error: AppError): string => {
  switch (error.code) {
    case 'NETWORK_ERROR':
      return 'Network connection failed. Please check your internet connection.';
    case 'UNAUTHORIZED':
      return 'You are not authorized to perform this action.';
    case 'FORBIDDEN':
      return 'Access denied. You do not have permission.';
    case 'NOT_FOUND':
      return 'The requested resource was not found.';
    case 'VALIDATION_ERROR':
      return error.message || 'Please check your input and try again.';
    case 'SERVER_ERROR':
      return 'Server error. Please try again later.';
    default:
      return error.message || 'An unexpected error occurred.';
  }
};

// Hook for error handling
export const useErrorHandler = () => {
  const handleError = (error: unknown, fallbackMessage?: string): string => {
    const appError = handleAPIError(error);
    const message = formatErrorMessage(appError);
    
    // Log error for debugging
    if (import.meta.env.DEV) {
      console.error('Error occurred:', appError);
    }
    
    return fallbackMessage || message;
  };

  return { handleError };
};
