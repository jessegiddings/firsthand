import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <input
          ref={ref}
          className={cn(
            "form-input",
            error && "border-red",
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-xs text-red font-body">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
