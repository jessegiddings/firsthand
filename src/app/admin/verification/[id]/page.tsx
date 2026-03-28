import Link from "next/link";
import { cn } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function VerificationDetailPage({ params }: { params: { id: string } }) {
  // TODO: Fetch evidence by ID from database
  return (
    <div className="min-h-screen bg-paper">
      <nav className="bg-ink px-6 md:px-12 h-[60px] flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="font-display text-[22px] font-black text-terra tracking-[-0.02em] no-underline">
          First<em className="text-white not-italic font-display italic">hand</em>
        </Link>
        <span className="px-4 py-[7px] rounded-md text-xs font-semibold bg-terra text-white">Admin</span>
      </nav>

      <div className="max-w-[960px] mx-auto px-6 md:px-12 py-10">
        <Link href="/admin/verification" className="text-sm text-terra no-underline hover:underline mb-6 inline-block">
          &larr; Back to Verification Queue
        </Link>

        <h1 className="font-display text-[28px] font-black tracking-[-0.02em] mb-6">Evidence Review</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AI Score Panel */}
          <div className="bg-white border border-rule rounded-lg p-6">
            <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-terra mb-4">AI Verification Score</div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full border-[4px] border-green flex items-center justify-center text-2xl font-bold text-green">
                87
              </div>
              <div>
                <div className="text-sm font-semibold text-ink">High confidence</div>
                <div className="text-xs text-gray">Auto-verification eligible</div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { label: "GPS Match", val: 95, desc: "Within 50m of project location" },
                { label: "Photo Metadata", val: 90, desc: "EXIF data consistent, timestamps valid" },
                { label: "Image Analysis", val: 85, desc: "Content matches claimed milestone" },
                { label: "Manipulation Check", val: 78, desc: "No signs of image manipulation" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray">{item.label}</span>
                    <span className="font-mono text-ink">{item.val}%</span>
                  </div>
                  <div className="h-1.5 bg-dust rounded-full overflow-hidden mb-0.5">
                    <div className={cn("h-full rounded-full", item.val >= 75 ? "bg-green" : item.val >= 50 ? "bg-amber" : "bg-red")} style={{ width: `${item.val}%` }} />
                  </div>
                  <div className="text-[10px] text-lgray">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Evidence Details */}
          <div className="bg-white border border-rule rounded-lg p-6">
            <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-terra mb-4">Evidence Details</div>
            <div className="space-y-4">
              <div>
                <div className="text-[10px] font-mono tracking-[0.1em] uppercase text-lgray mb-1">Photos</div>
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-video bg-dust rounded-lg flex items-center justify-center text-lgray text-sm">
                      Photo {i}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono tracking-[0.1em] uppercase text-lgray mb-1">Community Voice</div>
                <div className="bg-paper border border-rule rounded p-3 flex items-center gap-2">
                  <span className="text-lg">🎙</span>
                  <span className="text-xs text-gray">Voice recording (2:34) — Swahili</span>
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono tracking-[0.1em] uppercase text-lgray mb-1">GPS Location</div>
                <div className="bg-paper border border-rule rounded p-3 text-xs text-gray font-mono">
                  0.5143° N, 35.2698° E · Accuracy: ±12m
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 bg-white border border-rule rounded-lg p-4 flex flex-wrap gap-2 items-center">
          <button className="px-5 py-2.5 rounded-md text-xs font-semibold bg-sage text-white cursor-pointer border-none hover:bg-[#2d4038] transition-colors">
            ✓ Verify & Release Funds
          </button>
          <button className="px-5 py-2.5 rounded-md text-xs font-semibold bg-amber-bg text-amber border border-[#e8c870] cursor-pointer hover:bg-[#ffe8a0] transition-colors">
            ⚠ Request Additional Evidence
          </button>
          <button className="px-5 py-2.5 rounded-md text-xs font-semibold bg-red-bg text-red border border-[#e8a898] cursor-pointer hover:bg-[#ffe0da] transition-colors">
            ✕ Reject Evidence
          </button>
          <div className="flex-1" />
          <span className="text-[11px] text-lgray font-mono">
            {/* TODO: Phase 2 — AI verification results */}
            AI verified 2h ago
          </span>
        </div>
      </div>
    </div>
  );
}
