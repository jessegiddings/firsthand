import { cn } from "@/lib/utils";

interface SectionRuleProps {
  className?: string;
}

export function SectionRule({ className }: SectionRuleProps) {
  return <hr className={cn("border-none border-t border-rule", className)} />;
}
