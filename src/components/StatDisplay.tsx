import { cn } from "@/lib/utils";

interface StatDisplayProps {
  number: string;
  label: string;
  className?: string;
}

export function StatDisplay({ number, label, className }: StatDisplayProps) {
  return (
    <div className={cn("text-center", className)}>
      <div className="font-display text-[28px] font-black text-terra leading-none">
        {number}
      </div>
      <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-ink-muted mt-1">
        {label}
      </div>
    </div>
  );
}
