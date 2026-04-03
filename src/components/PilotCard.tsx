import { cn } from "@/lib/utils";
import { EyebrowLabel } from "@/components/ui";

interface PilotCardProps {
  pilotName: string;
  partner: string;
  partnerRole: string;
  eyebrow: string;
  headline: string;
  paragraphs: string[];
  tags: string[];
  className?: string;
}

export function PilotCard({
  partner,
  partnerRole,
  eyebrow,
  headline,
  paragraphs,
  tags,
  className,
}: PilotCardProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden",
        className
      )}
    >
      {/* Image placeholder */}
      <div className="aspect-[4/3] lg:aspect-auto bg-sage relative flex items-end justify-start p-6">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-sm">
          <p className="text-[13px] font-semibold text-ink">{partner}</p>
          <p className="text-[11px] text-ink-muted">{partnerRole}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-10 md:p-12 bg-paper">
        <EyebrowLabel className="mb-5">{eyebrow}</EyebrowLabel>
        <h3 className="font-display text-[clamp(22px,2.5vw,32px)] font-bold leading-[1.15] mb-5">
          {headline}
        </h3>
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className="text-[14px] leading-[1.75] text-ink-soft mb-4 last:mb-0"
          >
            {p}
          </p>
        ))}
        <div className="flex flex-wrap gap-2 mt-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] tracking-[0.1em] uppercase px-2.5 py-1 rounded bg-terra-pale text-terra"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
