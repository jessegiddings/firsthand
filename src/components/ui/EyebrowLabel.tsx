import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface EyebrowLabelProps extends HTMLAttributes<HTMLDivElement> {
  withLine?: boolean;
}

export function EyebrowLabel({
  className,
  withLine = true,
  children,
  ...props
}: EyebrowLabelProps) {
  return (
    <div
      className={cn(
        "font-mono text-[10px] tracking-[0.25em] uppercase text-terra flex items-center gap-2.5",
        className
      )}
      {...props}
    >
      {withLine && (
        <span className="block w-6 h-px bg-terra" />
      )}
      {children}
    </div>
  );
}
