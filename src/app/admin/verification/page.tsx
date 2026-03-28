"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

const demoEvidence = [
  {
    id: "e1",
    milestoneTitle: "Materials purchased and delivered",
    projectTitle: "Classroom Roof Repair — Eldoret Primary School",
    partnerName: "Lwala Community Alliance",
    submittedAt: "2h ago",
    photoCount: 4,
    hasVoice: true,
    hasGps: true,
    aiScore: 87,
    status: "VERIFICATION_IN_PROGRESS",
  },
  {
    id: "e2",
    milestoneTitle: "Parts sourced and purchased",
    projectTitle: "Water Pump Repair — Nakuru County",
    partnerName: "Nakuru Water Group",
    submittedAt: "1d ago",
    photoCount: 2,
    hasVoice: false,
    hasGps: true,
    aiScore: 62,
    status: "VERIFICATION_IN_PROGRESS",
  },
];

export default function AdminVerificationPage() {
  return (
    <div className="min-h-screen bg-paper">
      <nav className="bg-ink px-6 md:px-12 h-[60px] flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="font-display text-[22px] font-black text-terra tracking-[-0.02em] no-underline">
          First<em className="text-white not-italic font-display italic">hand</em>
        </Link>
        <span className="px-4 py-[7px] rounded-md text-xs font-semibold bg-terra text-white">Admin</span>
      </nav>

      <div className="max-w-[960px] mx-auto px-6 md:px-12 py-10">
        <div className="mb-8">
          <div className="font-mono text-[10px] tracking-[0.2em] text-lgray uppercase mb-1.5">AI Verification Queue</div>
          <h1 className="font-display text-[28px] font-black tracking-[-0.02em]">Evidence Review</h1>
        </div>

        <div className="space-y-3">
          {demoEvidence.map((ev) => {
            const scoreColor = ev.aiScore >= 75 ? "border-green text-green" : ev.aiScore >= 50 ? "border-amber text-amber" : "border-red text-red";
            return (
              <Link
                key={ev.id}
                href={`/admin/verification/${ev.id}`}
                className="block bg-white border border-rule rounded-lg p-5 hover:border-terra transition-colors no-underline"
              >
                <div className="flex items-center gap-4">
                  <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold border-[3px] flex-shrink-0", scoreColor)}>
                    {ev.aiScore}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-ink">{ev.milestoneTitle}</div>
                    <div className="text-xs text-lgray mt-0.5">{ev.projectTitle} &middot; {ev.partnerName}</div>
                    <div className="flex gap-3 mt-2">
                      <span className="text-[10px] text-gray">📷 {ev.photoCount} photos</span>
                      {ev.hasVoice && <span className="text-[10px] text-gray">🎙 Voice</span>}
                      {ev.hasGps && <span className="text-[10px] text-gray">📍 GPS</span>}
                      <span className="text-[10px] text-lgray">🗓 {ev.submittedAt}</span>
                    </div>
                  </div>
                  <span className="text-lg text-lgray">&rarr;</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
