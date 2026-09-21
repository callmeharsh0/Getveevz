import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}

const glassButtonVariants = cva(
  "relative isolate all-unset cursor-pointer rounded-full transition-all",
  {
    variants: {
      size: {
        default: "text-base font-medium",
        sm: "text-sm font-medium",
        lg: "text-lg font-medium",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const glassButtonTextVariants = cva(
  "glass-button-text relative block select-none tracking-tighter",
  {
    variants: {
      size: {
        default: "px-6 py-3.5",
        sm: "px-4 py-2",
        lg: "px-8 py-4",
        icon: "flex h-10 w-10 items-center justify-center",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof glassButtonVariants> {
  contentClassName?: string;
  href?: string;
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, children, size, contentClassName, href, onClick, ...props }, ref) => {
    const content = (
      <span
        className={cn(
          glassButtonTextVariants({ size }),
          contentClassName
        )}
      >
        {children}
      </span>
    );

    if (href) {
      return (
        <div
          className={cn(
            "glass-button-wrap cursor-pointer rounded-full",
            className
          )}
        >
          <a
            href={href}
            onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
            className={cn("glass-button", glassButtonVariants({ size }))}
          >
            {content}
          </a>
          <div className="glass-button-shadow rounded-full"></div>
        </div>
      );
    }

    return (
      <div
        className={cn(
          "glass-button-wrap cursor-pointer rounded-full",
          className
        )}
      >
        <button
          className={cn("glass-button", glassButtonVariants({ size }))}
          ref={ref}
          onClick={onClick}
          {...props}
        >
          {content}
        </button>
        <div className="glass-button-shadow rounded-full"></div>
      </div>
    );
  }
);
GlassButton.displayName = "GlassButton";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-xl bg-surface/80 border border-border/90 backdrop-blur-xl shadow-xl hover:border-frost/60 transition-all duration-300 group",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GlassCard.displayName = "GlassCard";

export { GlassButton, GlassCard, glassButtonVariants };