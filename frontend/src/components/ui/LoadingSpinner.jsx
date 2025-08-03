import { cn } from '../../lib/utils.js';

const LoadingSpinner = ({ className, size = 'default' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    default: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-current border-t-transparent',
        sizes[size],
        className
      )}
    />
  );
};

export default LoadingSpinner;
