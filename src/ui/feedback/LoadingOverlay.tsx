import type { BaseComponentProps } from '../../types';

export interface LoadingOverlayProps extends BaseComponentProps {
  isVisible: boolean;
  message?: string;
  spinner?: boolean;
  backdrop?: boolean;
}

const LoadingOverlay = ({ 
  isVisible, 
  message = "Loading...", 
  spinner = true,
  backdrop = true,
  className = '',
  children,
  ...props 
}: LoadingOverlayProps) => {
  if (!isVisible) return <>{children}</>;

  return (
    <div className="relative" {...props}>
      {children}
      <div 
        className={`absolute inset-0 flex items-center justify-center z-50 ${
          backdrop ? 'bg-black bg-opacity-20 backdrop-blur-sm' : ''
        } ${className}`}
      >
        <div className="flex flex-col items-center gap-3 p-4 rounded-lg bg-white shadow-lg">
          {spinner && (
            <div className="w-6 h-6 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
          )}
          <p className="text-sm text-gray-700 font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
