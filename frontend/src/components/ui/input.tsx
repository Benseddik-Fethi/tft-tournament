import * as React from "react"
import { cn } from "@/lib/utils"
import type {LucideIcon} from "lucide-react";

// On étend les props HTML standards pour y ajouter notre prop 'icon' optionnelle
export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: LucideIcon;
    variant?: 'default' | 'glass';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, icon: Icon, variant = 'default', ...props }, ref) => {
        const baseStyles = variant === 'glass' 
            ? "glass-card h-11 px-4 py-2 text-[var(--tft-text-primary)] placeholder:text-[var(--tft-text-muted)] border-[var(--glass-border)] focus:border-[#C8AA6E] focus:ring-2 focus:ring-[#C8AA6E]/20 focus:shadow-[0_0_16px_rgba(200,170,110,0.2)] transition-all duration-200"
            : "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";
        
        if (Icon) {
            return (
                <div className="relative w-full">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Icon className="h-4 w-4" />
                    </div>
                    <input
                        type={type}
                        className={cn(
                            baseStyles,
                            "pl-10",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                </div>
            )
        }

        return (
            <input
                type={type}
                className={cn(
                    baseStyles,
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export { Input }