import { cn } from "@/lib/utils";

interface TrustBarProps {
  className?: string;
}

const trustItems = [
  {
    icon: "🏛",
    title: "Wyoming Nonprofit Corp.",
    subtitle: "EIN obtained · 501(c)(3) pending",
  },
  {
    icon: "🔒",
    title: "Stripe-Powered Escrow",
    subtitle: "Funds held until AI verification",
  },
  {
    icon: "🤖",
    title: "Independent AI Verification",
    subtitle: "No self-reporting. No conflicts.",
  },
  {
    icon: "🎙",
    title: "Community-Owned Stories",
    subtitle: "Communities author their own impact",
  },
];

export function TrustBar({ className }: TrustBarProps) {
  return (
    <div
      className={cn(
        "bg-paper border-y border-rule py-8 px-6 md:px-12",
        className
      )}
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0">
        {trustItems.map((item, i) => (
          <div
            key={item.title}
            className={cn(
              "flex items-start gap-3 px-0 lg:px-6",
              i < trustItems.length - 1 &&
                "lg:border-r lg:border-rule"
            )}
          >
            <div className="text-lg flex-shrink-0 mt-0.5">{item.icon}</div>
            <div>
              <h4 className="text-[13px] font-semibold text-ink leading-tight">
                {item.title}
              </h4>
              <p className="text-[11px] text-ink-muted leading-[1.5] mt-0.5">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
