"use client";

import { cn } from "@/lib/utils";

interface CommunityVoiceDemoProps {
  className?: string;
}

export function CommunityVoiceDemo({ className }: CommunityVoiceDemoProps) {
  return (
    <div className={cn("", className)}>
      <div className="bg-white border border-rule rounded-xl overflow-hidden max-w-[720px] mx-auto">
        {/* Audio player header */}
        <div className="bg-sage p-5 flex items-center gap-4">
          <button
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 cursor-pointer border-none"
            aria-label="Play audio"
          >
            <svg width="14" height="16" viewBox="0 0 14 16" fill="white">
              <path d="M0 0L14 8L0 16V0Z" />
            </svg>
          </button>
          {/* Waveform */}
          <div className="flex-1 flex items-center gap-[2px] h-8">
            {Array.from({ length: 40 }).map((_, i) => {
              const heights = [12, 20, 16, 28, 24, 14, 32, 18, 26, 10, 22, 30, 16, 24, 20, 14, 28, 12, 18, 32, 24, 16, 20, 28, 14, 26, 22, 10, 18, 30, 24, 12, 20, 16, 28, 14, 22, 26, 18, 32];
              return (
                <div
                  key={i}
                  className={cn(
                    "w-[3px] rounded-full flex-shrink-0",
                    i < 15 ? "bg-white" : "bg-white/30"
                  )}
                  style={{ height: `${heights[i % heights.length]}px` }}
                />
              );
            })}
          </div>
          <span className="font-mono text-[11px] text-white/70 flex-shrink-0">
            1:42
          </span>
        </div>

        {/* Speaker info */}
        <div className="px-5 py-3 border-b border-rule flex items-center justify-between">
          <div>
            <span className="text-[13px] font-semibold text-ink">Amara W.</span>
            <span className="text-[12px] text-ink-muted ml-2">
              Project Lead · Eldoret, Kenya
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-muted">
            Recorded in Swahili
          </span>
        </div>

        {/* Two-column transcript */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-rule">
          <div className="p-5">
            <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-ink-muted mb-2">
              Original (Swahili)
            </div>
            <p className="text-[13px] leading-[1.7] text-ink-soft italic">
              &ldquo;Watoto wetu sasa wanasoma chini ya paa imara. Mvua ikinyesha, hawasimami tena kusoma. Hii ndio tofauti — si ahadi, ni ukweli unaonekana.&rdquo;
            </p>
          </div>
          <div className="p-5">
            <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-terra mb-2">
              AI Translation (English)
            </div>
            <p className="text-[13px] leading-[1.7] text-ink-soft">
              &ldquo;Our children now study under a solid roof. When it rains, they no longer stop learning. This is the difference — not a promise, but a truth you can see.&rdquo;
            </p>
          </div>
        </div>

        {/* Published as */}
        <div className="px-5 py-3 bg-paper border-t border-rule">
          <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-ink-muted mb-1">
            Published to donors as
          </div>
          <p className="text-[13px] text-ink-soft leading-[1.6]">
            &ldquo;The classroom roof in Eldoret is complete. 47 students now learn without interruption during rainy season. Verified by community voice recording and GPS-tagged photo evidence.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
