"use client";

import { cn } from "@/lib/utils";

interface HeroMechCardProps {
  className?: string;
}

export function HeroMechCard({ className }: HeroMechCardProps) {
  const steps = [
    {
      num: "01",
      label: "Donation",
      desc: "Funds enter Stripe-held escrow instantly.",
      dot: "bg-terra",
      line: true,
    },
    {
      num: "02",
      label: "Milestone",
      desc: "Community completes defined milestone.",
      dot: "bg-ink",
      line: true,
    },
    {
      num: "03",
      label: "AI Verifies",
      desc: "Evidence reviewed independently.",
      dot: "bg-sage",
      isAI: true,
      line: true,
    },
    {
      num: "04",
      label: "Escrow Releases",
      desc: "Funds released to community partner.",
      dot: "bg-terra",
      line: false,
    },
  ];

  return (
    <div
      className={cn(
        "bg-paper border border-rule rounded-2xl p-8 relative overflow-hidden",
        className
      )}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-terra to-terra-light" />
      <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-ink-muted mb-6">
        The Firsthand Mechanism
      </div>
      <div className="flex flex-col gap-0">
        {steps.map((step) => (
          <div key={step.num} className="flex gap-4 items-start relative">
            {/* Timeline */}
            <div className="flex flex-col items-center">
              {step.isAI ? (
                <div className="w-8 h-8 rounded-full bg-sage flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-[9px] font-mono font-bold tracking-wider">
                    AI
                  </span>
                </div>
              ) : (
                <div
                  className={cn(
                    "w-3 h-3 rounded-full flex-shrink-0 mt-[10px]",
                    step.dot
                  )}
                />
              )}
              {step.line && (
                <div className="w-px h-8 bg-rule" />
              )}
            </div>
            {/* Content */}
            <div className="pb-4 flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-[13px] font-semibold text-ink">
                  {step.label}
                </h4>
                {step.isAI && (
                  <span className="inline-block font-mono text-[8px] tracking-[0.1em] px-1.5 py-0.5 rounded bg-[#eaf4ee] text-sage uppercase">
                    Milestone Verified
                  </span>
                )}
              </div>
              <p className="text-xs text-ink-muted leading-[1.5] mt-0.5">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
