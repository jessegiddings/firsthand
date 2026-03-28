import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "dark" | "outline" | "ghost" | "white";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  arrow?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-terra text-white hover:bg-terra-light",
  dark: "bg-ink text-white hover:bg-[#2a2820]",
  outline: "bg-transparent text-ink border-[1.5px] border-rule hover:border-ink",
  ghost: "bg-transparent text-terra p-0 text-[13px] gap-1.5",
  white: "bg-white text-ink hover:bg-paper",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", arrow, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 px-7 py-3.5 rounded-md font-body text-sm font-semibold cursor-pointer border-none transition-all duration-150 tracking-[0.01em] no-underline",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
        {arrow && <span>&rarr;</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
