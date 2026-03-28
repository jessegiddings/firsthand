import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant =
  | "verified"
  | "live"
  | "funded"
  | "community"
  | "ai"
  | "donor"
  | "story"
  | "pending"
  | "submitted"
  | "approved"
  | "rejected"
  | "default";

const variantStyles: Record<BadgeVariant, string> = {
  verified: "bg-[#eaf4ee] text-sage",
  live: "bg-[#fff3ee] text-terra",
  funded: "bg-[#f5f0ff] text-[#6b4fa0]",
  community: "bg-sage-light text-sage",
  ai: "bg-terra-pale text-terra",
  donor: "bg-[#f0f0ff] text-[#5555aa]",
  story: "bg-[#fff8ee] text-[#aa7700]",
  pending: "bg-amber-bg text-amber",
  submitted: "bg-[#e8f0ff] text-[#3a6ea5]",
  approved: "bg-green-bg text-green",
  rejected: "bg-red-bg text-red",
  default: "bg-dust text-gray",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ variant = "default", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block font-mono text-[9px] tracking-[0.1em] px-2 py-0.5 rounded uppercase",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
