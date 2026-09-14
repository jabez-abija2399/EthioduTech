import * as React from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg';
  isLoading?: boolean;
}

const variantStyles = {
  primary: "bg-[var(--primary)] text-[var(--on-primary)] hover:bg-[var(--primary)]/90",
  secondary: "bg-[var(--surface-variant)] text-[var(--foreground)] hover:bg-[var(--surface-variant)]/80",
  ghost: "hover:bg-[var(--surface-variant)] text-[var(--foreground)]",
  destructive: "bg-[var(--error)] text-white hover:bg-[var(--error)]/90",
};

const sizeStyles = {
  default: "min-h-[44px] px-4 py-2",
  sm: "min-h-[36px] px-3 py-1 text-xs",
  lg: "min-h-[56px] px-8 py-3 text-lg",
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', isLoading = false, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
