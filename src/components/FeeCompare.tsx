import { cn } from "@/lib/utils";
import { EyebrowLabel } from "@/components/ui";

interface FeeCompareProps {
  className?: string;
}

const columns = [
  {
    label: "Traditional NGOs",
    pct: "20–40%",
    desc: "Taken as overhead before any program dollar moves. Annual reports self-written by the org.",
    highlighted: false,
  },
  {
    label: "Firsthand",
    tag: "Our Model",
    pct: "5–8%",
    desc: "Taken from escrow only after independent AI verification confirms the milestone was real. Fee is deducted from escrow — not added on top of your donation.",
    highlighted: true,
  },
  {
    label: "Crowdfunding Platforms",
    pct: "8–15%",
    desc: "Charged at the moment of donation — not when impact is delivered. No verification required.",
    highlighted: false,
  },
];

export function FeeCompare({ className }: FeeCompareProps) {
  return (
    <div className={cn("bg-ink py-20 px-6 md:px-12", className)}>
      <div className="max-w-[1200px] mx-auto">
        <EyebrowLabel className="text-white/40 mb-5" withLine={false}>
          <span className="block w-6 h-px bg-white/40" />
          Fee Comparison
        </EyebrowLabel>
        <h2 className="font-display text-display-md text-white mb-4">
          We charge less. And only when something actually happens.
        </h2>
        <p className="text-sm text-white/50 mb-12 max-w-[520px]">
          We take our fee from inside the escrow. Not on top of it.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns.map((col) => (
            <div
              key={col.label}
              className={cn(
                "rounded-lg p-8 border",
                col.highlighted
                  ? "bg-terra/15 border-terra"
                  : "bg-white/5 border-white/10"
              )}
            >
              {col.tag && (
                <span className="inline-block font-mono text-[9px] tracking-[0.12em] uppercase text-terra bg-terra/20 px-2 py-0.5 rounded mb-4">
                  {col.tag}
                </span>
              )}
              <div
                className={cn(
                  "font-display text-[48px] font-black leading-none mb-2",
                  col.highlighted ? "text-terra" : "text-white/70"
                )}
              >
                {col.pct}
              </div>
              <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/40 mb-4">
                {col.label}
              </div>
              <p className="text-[13px] leading-[1.65] text-white/55">
                {col.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
