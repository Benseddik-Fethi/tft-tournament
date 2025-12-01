/**
 * Password input component with visibility toggle
 */

import { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface PasswordInputProps {
  /** Input value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Input label */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Error message */
  error?: string;
  /** Additional CSS classes for input */
  className?: string;
  /** Input name attribute */
  name?: string;
  /** Whether input is disabled */
  disabled?: boolean;
  /** Show lock icon */
  showIcon?: boolean;
}

/**
 * Password input with visibility toggle button
 */
export function PasswordInput({
  value,
  onChange,
  label,
  placeholder = '••••••••',
  error,
  className,
  name,
  disabled,
  showIcon = true,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1.5">
      {label && (
        <Label className="text-[var(--tft-text-secondary)] font-medium pl-1">
          {label}
        </Label>
      )}
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          name={name}
          disabled={disabled}
          icon={showIcon ? Lock : undefined}
          className={cn(
            'h-12 bg-[var(--tft-bg-surface)] border-[var(--tft-border)] focus:bg-[var(--tft-bg-elevated)] focus:border-[#C8AA6E] rounded-xl shadow-sm pr-10 text-[var(--tft-text-primary)] placeholder:text-[var(--tft-text-muted)]',
            showIcon && 'pl-11',
            error && 'border-red-300 focus:border-red-300',
            className
          )}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--tft-text-muted)] hover:text-[var(--tft-text-primary)]"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {error && <p className="text-sm text-red-500 pl-1 mt-1">{error}</p>}
    </div>
  );
}
