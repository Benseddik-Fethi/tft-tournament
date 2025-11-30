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
        // TFT Hextech Variants
        "tft-primary":
          "bg-gradient-to-r from-[#C8AA6E] to-[#785A28] text-[#0A1428] font-semibold hover:shadow-[0_0_20px_rgba(200,170,110,0.5)] hover:-translate-y-0.5 transition-all duration-300",
        "tft-secondary":
          "bg-gradient-to-r from-[#0AC8B9] to-[#099E92] text-[#0A1428] font-semibold hover:shadow-[0_0_20px_rgba(10,200,185,0.5)] hover:-translate-y-0.5 transition-all duration-300",
        "tft-ghost":
          "bg-transparent text-[#C8AA6E] border border-[rgba(200,170,110,0.5)] font-semibold hover:bg-[rgba(200,170,110,0.1)] hover:border-[#C8AA6E] hover:shadow-[0_0_15px_rgba(200,170,110,0.3)] transition-all duration-300",
        "tft-outline":
          "bg-transparent text-[#F0E6D2] border border-[rgba(200,170,110,0.3)] hover:border-[#C8AA6E] hover:text-[#C8AA6E] transition-all duration-300",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        xl: "h-12 rounded-lg px-8 has-[>svg]:px-6 text-base",
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
