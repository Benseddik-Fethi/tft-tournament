/**
 * Loading spinner component
 */

import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  /** Size of the spinner */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
  /** Text to display alongside spinner */
  text?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
} as const;

/**
 * Reusable loading spinner component
 */
export function LoadingSpinner({ size = 'md', className, text }: LoadingSpinnerProps) {
  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <Loader2 className={cn('animate-spin text-[#C8AA6E]', sizeClasses[size])} />
      {text && <span className="text-[#5B5A56] dark:text-[#A09B8C] font-medium">{text}</span>}
    </div>
  );
}
