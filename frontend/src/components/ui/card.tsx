import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "flex flex-col gap-6 rounded-xl border py-6 shadow-sm transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        // Legacy TFT variants
        "tft-card": "bg-[var(--tft-bg-card)] text-[var(--tft-text-primary)] border-[rgba(200,170,110,0.2)]",
        "tft-card-elevated": "bg-[var(--tft-bg-elevated)] text-[var(--tft-text-primary)] border-[rgba(200,170,110,0.3)] shadow-[0_4px_20px_rgba(0,0,0,0.3)]",
        "tft-card-gold": "bg-[var(--tft-bg-card)] text-[var(--tft-text-primary)] border-2 border-[#C8AA6E] shadow-[0_0_15px_rgba(200,170,110,0.2)]",
        // New Glassmorphism & Hextech Premium variants
        "glass": [
          "glass-card",
          "text-[var(--tft-text-primary)]",
          "hover:shadow-[0_12px_48px_rgba(0,0,0,0.2)]",
          "hover:-translate-y-1",
        ].join(" "),
        "glass-elevated": [
          "glass-card hextech-clip",
          "border-l-4 border-l-[#C8AA6E]",
          "text-[var(--tft-text-primary)]",
          "hover:shadow-[0_16px_64px_rgba(0,0,0,0.3)]",
          "hover:border-l-[#D4B574]",
          "hover:-translate-y-1",
        ].join(" "),
        "glass-premium": [
          "glass-card hextech-clip",
          "bg-gradient-to-br from-[var(--glass-bg)] to-transparent",
          "text-[var(--tft-text-primary)]",
          "shadow-[0_0_5px_var(--tft-gold),0_0_10px_var(--tft-gold)]",
          "hover:shadow-[0_0_10px_var(--tft-gold),0_0_20px_var(--tft-gold),0_0_30px_var(--tft-gold)]",
        ].join(" "),
        "glass-interactive": [
          "glass-card card-3d",
          "text-[var(--tft-text-primary)]",
          "cursor-pointer",
          "hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Card({ 
  className, 
  variant,
  ...props 
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  cardVariants,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
