"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

const demoProjects = [
  {
    id: "p1",
    title: "Classroom Roof Repair — Eldoret Primary School",
    status: "IN_PROGRESS",
    raised: 5600,
    goal: 8400,
    milestones: [
      { id: "m1", title: "Materials purchased and delivered", amount: 2800, status: "VERIFIED" },
      { id: "m2", title: "Construction 50% complete", amount: 3200, status: "EVIDENCE_SUBMITTED" },
      { id: "m3", title: "Roof complete + verified", amount: 2400, status: "PENDING" },
    ],
  },
  {
    id: "p2",
    title: "Water Pump Repair — Nakuru County",
    status: "ACTIVE",
    raised: 1200,
    goal: 1800,
    milestones: [
      { id: "m4", title: "Parts sourced and purchased", amount: 600, status: "VERIFIED" },
      { id: "m5", title: "Installation complete", amount: 700, status: "PENDING" },
      { id: "m6", title: "Community training delivered", amount: 500, status: "PENDING" },
    ],
  },
];

const statusLabel: Record<string, { label: string; color: string }> = {
  PENDING: { label: "Pending", color: "bg-dust text-gray" },
  EVIDENCE_SUBMITTED: { label: "Evidence Submitted", color: "bg-amber-bg text-amber" },
  VERIFICATION_IN_PROGRESS: { label: "Verifying...", color: "bg-amber-bg text-amber" },
  VERIFIED: { label: "Verified", color: "bg-green-bg text-green" },
  FUNDS_RELEASED: { label: "Funds Released", color: "bg-green-bg text-green" },
  FAILED: { label: "Failed", color: "bg-red-bg text-red" },
};

export default function PartnerDashboardPage() {
  return (
    <div className="min-h-screen bg-paper">
      <nav className="bg-ink px-6 md:px-12 h-[60px] flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="font-display text-[22px] font-black text-terra tracking-[-0.02em] no-underline">
          First<em className="text-white not-italic font-display italic">hand</em>
        </Link>
        <span className="px-4 py-[7px] rounded-md text-xs font-semibold bg-terra text-white">Partner</span>
      </nav>

      <div className="max-w-[900px] mx-auto px-6 md:px-12 py-10">
        <div className="mb-8">
          <div className="font-mono text-[10px] tracking-[0.2em] text-lgray uppercase mb-1.5">Partner Dashboard</div>
          <h1 className="font-display text-[28px] font-black tracking-[-0.02em]">Your Projects</h1>
        </div>

        <div className="space-y-6">
          {demoProjects.map((project) => (
            <div key={project.id} className="bg-white border border-rule rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h2 className="font-display text-lg font-bold">{project.title}</h2>
                  <span className={cn("px-3 py-1 rounded text-[10px] font-semibold uppercase tracking-[0.05em]",
                    project.status === "IN_PROGRESS" ? "bg-amber-bg text-amber" : "bg-green-bg text-green"
                  )}>
                    {project.status.replace("_", " ")}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-gray">${project.raised.toLocaleString()} raised</span>
                    <span className="text-ink font-semibold">${project.goal.toLocaleString()} goal</span>
                  </div>
                  <div className="h-2 bg-dust rounded-full overflow-hidden">
                    <div className="h-full bg-terra rounded-full transition-all" style={{ width: `${(project.raised / project.goal) * 100}%` }} />
                  </div>
                </div>

                {/* Milestones */}
                <div className="space-y-2">
                  {project.milestones.map((ms, i) => {
                    const st = statusLabel[ms.status] || statusLabel.PENDING;
                    return (
                      <div key={ms.id} className="flex items-center gap-3 p-3 bg-paper rounded-lg border border-rule">
                        <div className="font-mono text-[10px] text-terra tracking-[0.1em] w-6 flex-shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-ink truncate">{ms.title}</div>
                          <div className="text-xs text-lgray">${ms.amount.toLocaleString()} USD</div>
                        </div>
                        <span className={cn("px-2.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-[0.05em] whitespace-nowrap", st.color)}>
                          {st.label}
                        </span>
                        {ms.status === "PENDING" && (
                          <Link
                            href={`/partner/milestone/${ms.id}/submit`}
                            className="px-3 py-1.5 bg-terra text-white rounded text-[11px] font-semibold no-underline hover:bg-terra-light transition-colors"
                          >
                            Submit Evidence
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
