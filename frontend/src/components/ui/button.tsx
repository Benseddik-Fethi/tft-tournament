import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        // TFT Hextech Premium Variants with 3D effects and glassmorphism
        "tft-primary": [
          "bg-gradient-to-br from-[#C8AA6E] via-[#D4B574] to-[#B8985E]",
          "text-[#0A1428] font-bold uppercase tracking-wide",
          "border-0 rounded-lg",
          "shadow-[0_4px_0_rgba(120,90,40,0.5),0_8px_16px_rgba(0,0,0,0.2)]",
          "hover:shadow-[0_6px_0_rgba(120,90,40,0.5),0_12px_24px_rgba(200,170,110,0.3)]",
          "hover:-translate-y-0.5 hover:from-[#D4B574] hover:via-[#E0C180] hover:to-[#C8AA6E]",
          "active:translate-y-0.5 active:shadow-[0_2px_0_rgba(120,90,40,0.5),0_4px_8px_rgba(0,0,0,0.2)]",
          "transition-all duration-200",
        ].join(" "),
        "tft-secondary": [
          "bg-[rgba(10,200,185,0.1)] backdrop-blur-sm",
          "border border-[#0AC8B9]/30 text-[#0AC8B9] font-semibold uppercase tracking-wide",
          "rounded-lg",
          "hover:border-[#0AC8B9] hover:bg-[#0AC8B9]/20",
          "hover:shadow-[0_0_20px_rgba(10,200,185,0.3)]",
          "transition-all duration-300",
        ].join(" "),
        "tft-ghost": [
          "bg-transparent backdrop-blur-sm",
          "border border-[rgba(200,170,110,0.3)]",
          "text-[#C8AA6E] font-semibold uppercase tracking-wide",
          "rounded-lg",
          "hover:border-[#C8AA6E] hover:bg-[rgba(200,170,110,0.1)]",
          "hover:shadow-[0_0_15px_rgba(200,170,110,0.2)]",
          "transition-all duration-300",
        ].join(" "),
        "tft-outline": [
          "bg-transparent",
          "border border-[rgba(200,170,110,0.3)] text-[var(--tft-text-primary)]",
          "rounded-lg",
          "hover:border-[#C8AA6E] hover:text-[#C8AA6E]",
          "hover:bg-[rgba(200,170,110,0.05)]",
          "transition-all duration-300",
        ].join(" "),
        "tft-glass": [
          "glass-card",
          "text-[var(--tft-text-primary)] font-semibold",
          "hover:border-[#C8AA6E]/50",
          "hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)]",
          "transition-all duration-300",
        ].join(" "),
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        xl: "h-14 rounded-lg px-8 has-[>svg]:px-6 text-base",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
