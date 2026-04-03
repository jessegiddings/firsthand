"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Score {
  label: string;
  value: number;
}

interface Gate1ScoreBarProps {
  scores: Score[];
  className?: string;
}

export function Gate1ScoreBar({ scores, className }: Gate1ScoreBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("flex flex-col gap-4", className)}>
      {scores.map((score) => (
        <div key={score.label}>
          <div className="flex justify-between mb-1.5">
            <span className="text-[13px] font-medium text-white">
              {score.label}
            </span>
            <span className="font-mono text-[12px] text-white/70">
              {score.value}
            </span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-terra rounded-full transition-all duration-1000 ease-out"
              style={{
                width: visible ? `${score.value}%` : "0%",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
