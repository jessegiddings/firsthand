import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ className, hover = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-paper border border-rule rounded-2xl p-9 relative overflow-hidden",
        hover && "transition-colors duration-200 hover:border-terra",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
