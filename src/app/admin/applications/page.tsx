"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AiScore {
  total: number;
  dimensions: {
    legitimacy: number;
    specificity: number;
    budget: number;
    measurability: number;
    feasibility: number;
  };
  flag: string;
  flags: string[];
  questions: string[];
  summary: string;
}

interface Application {
  id: string;
  orgName: string;
  orgCountry: string;
  contactName: string;
  contactEmail: string;
  missionStatement: string;
  projectDescription: string;
  budgetEstimate: number;
  status: string;
  aiScore: AiScore | null;
  submittedAt: string;
}

// Demo data as fallback
const demoApplications: Application[] = [
  {
    id: "demo-1",
    orgName: "Lwala Community Alliance",
    orgCountry: "Kenya",
    contactName: "James Odhiambo",
    contactEmail: "james@lwala.org",
    missionStatement: "Community-led health and education in western Kenya.",
    projectDescription: "Project Title: Classroom Roof Repair — Eldoret Primary School\nCategory: Education — Infrastructure\nLocation: Eldoret, Uasin Gishu County\nDescription: Repair leaking roof on Block B classroom serving 47 students.\nBeneficiaries: 47\nTimeline: 1–3 months\nPayment Method: M-Pesa (Kenya/East Africa)",
    budgetEstimate: 8400,
    status: "AI_SCREENED",
    aiScore: {
      total: 84,
      dimensions: { legitimacy: 18, specificity: 17, budget: 16, measurability: 18, feasibility: 15 },
      flag: "APPROVE",
      flags: ["verified_registration", "specific_deliverable", "m_pesa_confirmed"],
      questions: [
        "Request before-photo with GPS metadata to establish baseline for verification",
        "Confirm local verification contact's availability for milestone submission",
      ],
      summary: "Strong application from a verified Kenyan NGO with 8 years of operations. The classroom roof repair is specific, bounded, and verifiable with GPS/photo evidence.",
    },
    submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-2",
    orgName: "Nakuru Farmers Alliance",
    orgCountry: "Kenya",
    contactName: "Grace Wanjiku",
    contactEmail: "grace@nakurufarmers.org",
    missionStatement: "Supporting women farmers in Nakuru County through cooperative agriculture.",
    projectDescription: "Project Title: Women's Agricultural Cooperative — Seed & Tools Fund\nCategory: Economic Empowerment\nLocation: Nakuru County\nDescription: Provide seeds and farming tools to cooperative members.\nBeneficiaries: 120\nTimeline: 3–6 months\nPayment Method: M-Pesa (Kenya/East Africa)",
    budgetEstimate: 12000,
    status: "AI_SCREENED",
    aiScore: {
      total: 61,
      dimensions: { legitimacy: 12, specificity: 13, budget: 11, measurability: 14, feasibility: 11 },
      flag: "REVIEW",
      flags: ["unverified_registration", "budget_lacks_itemisation"],
      questions: [
        "Please provide your cooperative registration number and registering authority",
        "How many cooperative members will directly benefit, and can you provide an itemised budget?",
        "Please upload your most recent financial statement or cooperative audit",
      ],
      summary: "Promising cooperative project but registration could not be verified and budget lacks itemisation. Additional documentation needed before approval.",
    },
    submittedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-3",
    orgName: "Hope Rising Foundation",
    orgCountry: "Nigeria",
    contactName: "Michael Adeyemi",
    contactEmail: "michael@hoperising.org",
    missionStatement: "Empowering communities through sustainable development.",
    projectDescription: "Project Title: Community Development Program — General Operations Support\nCategory: Other\nLocation: Lagos\nDescription: General community development program including various activities.\nBeneficiaries: Not specified\nTimeline: 12+ months\nPayment Method: Bank Transfer (USD/CAD/GBP)",
    budgetEstimate: 45000,
    status: "AI_SCREENED",
    aiScore: {
      total: 28,
      dimensions: { legitimacy: 6, specificity: 3, budget: 4, measurability: 5, feasibility: 10 },
      flag: "DECLINE",
      flags: ["not_found_in_registry", "no_documents", "ineligible_project_type"],
      questions: [
        "Auto-decline recommended. Application does not meet minimum criteria on 4 of 5 dimensions.",
      ],
      summary: "Organisation not found in any public registry and website domain was registered recently. Project is program-level with no specific deliverable or milestone structure.",
    },
    submittedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

function getFlag(score: number): { label: string; color: string; filterKey: string } {
  if (score >= 70) return { label: "Ready to Approve", color: "green", filterKey: "green" };
  if (score >= 40) return { label: "Needs Info", color: "amber", filterKey: "amber" };
  return { label: "Low Score", color: "red", filterKey: "red" };
}

function extractProjectTitle(description: string): string {
  const match = description.match(/Project Title:\s*(.+)/);
  return match ? match[1].trim() : description.slice(0, 60) + "...";
}

function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 1) return "just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export default function AdminApplicationsPage() {
  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [applications, setApplications] = useState<Application[]>(demoApplications);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const res = await fetch("/api/applications");
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            // Map Prisma response to our interface
            const mapped: Application[] = data.map((app: Record<string, unknown>) => ({
              id: app.id,
              orgName: app.orgName,
              orgCountry: app.orgCountry,
              contactName: app.contactName,
              contactEmail: app.contactEmail,
              missionStatement: app.missionStatement,
              projectDescription: app.projectDescription,
              budgetEstimate: parseFloat(String(app.budgetEstimate)) || 0,
              status: app.status,
              aiScore: app.aiScore as AiScore | null,
              submittedAt: app.submittedAt as string,
            }));
            setApplications(mapped);
          }
          // If no real applications, keep demo data
        }
      } catch {
        // Keep demo data on error
      } finally {
        setLoading(false);
      }
    }
    fetchApplications();
  }, []);

  const filteredApps = applications.filter((app) => {
    if (filter === "all") return true;
    const flag = getFlag(app.aiScore?.total || 0);
    return flag.filterKey === filter;
  });

  const stats = {
    total: applications.length,
    approved: applications.filter((a) => getFlag(a.aiScore?.total || 0).filterKey === "green").length,
    needsReview: applications.filter((a) => getFlag(a.aiScore?.total || 0).filterKey === "amber").length,
    declined: applications.filter((a) => getFlag(a.aiScore?.total || 0).filterKey === "red").length,
  };

  const handleAction = (id: string, action: string) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: action } : a))
    );
    setExpandedId(null);
  };

  return (
    <div className="min-h-screen bg-paper">
      <nav className="bg-ink px-6 md:px-12 h-[60px] flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="font-display text-[22px] font-black text-terra tracking-[-0.02em] no-underline">
          First<em className="text-white not-italic font-display italic">hand</em>
        </Link>
        <span className="px-4 py-[7px] rounded-md text-xs font-semibold bg-terra text-white">Admin</span>
      </nav>

      <div className="max-w-[960px] mx-auto px-6 md:px-12 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-lgray uppercase mb-1.5">AI Screening Queue</div>
            <h1 className="font-display text-[28px] font-black tracking-[-0.02em]">Partner Applications</h1>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <div className="font-display text-2xl font-black text-ink">{stats.total}</div>
              <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-lgray">Total</div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl font-black text-green">{stats.approved}</div>
              <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-lgray">Approved</div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl font-black text-amber">{stats.needsReview}</div>
              <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-lgray">Needs Review</div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl font-black text-red">{stats.declined}</div>
              <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-lgray">Declined</div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { key: "all", label: "All Applications" },
            { key: "green", label: "✓ Ready to Approve" },
            { key: "amber", label: "⚠ Needs Info" },
            { key: "red", label: "✕ Low Score" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "px-4 py-2 rounded-md text-xs font-semibold whitespace-nowrap border transition-all cursor-pointer",
                filter === f.key
                  ? "bg-ink text-white border-ink"
                  : "bg-white text-ink-soft border-rule hover:border-ink"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="w-2 h-2 rounded-full bg-terra animate-pulse mx-auto mb-3" />
            <span className="text-xs text-lgray">Loading applications...</span>
          </div>
        )}

        {/* Application Cards */}
        <div className="space-y-3">
          {filteredApps.map((app) => {
            const flag = getFlag(app.aiScore?.total || 0);
            const isExpanded = expandedId === app.id;
            const score = app.aiScore;
            const projectTitle = extractProjectTitle(app.projectDescription);

            return (
              <div key={app.id} className="bg-white border border-rule rounded-lg overflow-hidden">
                {/* Header row */}
                <div
                  className="flex items-center gap-4 p-4 cursor-pointer hover:bg-paper/50 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : app.id)}
                >
                  {/* Score ring */}
                  {score ? (
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold border-[3px] flex-shrink-0",
                        flag.color === "green" && "border-green text-green",
                        flag.color === "amber" && "border-amber text-amber",
                        flag.color === "red" && "border-red text-red"
                      )}
                    >
                      {score.total}
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-[10px] font-semibold border-[3px] border-dust text-lgray flex-shrink-0">
                      —
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-ink truncate">{projectTitle}</div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                      <span className="text-[11px] text-lgray">🏢 {app.orgName}</span>
                      <span className="text-[11px] text-lgray">📍 {app.orgCountry}</span>
                      <span className="text-[11px] text-lgray">💵 ${app.budgetEstimate.toLocaleString()} USD</span>
                      <span className="text-[11px] text-lgray">🗓 {formatTimeAgo(app.submittedAt)}</span>
                    </div>
                  </div>

                  {score ? (
                    <span
                      className={cn(
                        "px-3 py-1 rounded-md text-[10px] font-semibold uppercase tracking-[0.05em] whitespace-nowrap",
                        flag.color === "green" && "bg-green-bg text-green",
                        flag.color === "amber" && "bg-amber-bg text-amber",
                        flag.color === "red" && "bg-red-bg text-red"
                      )}
                    >
                      {flag.label}
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-md text-[10px] font-semibold uppercase tracking-[0.05em] whitespace-nowrap bg-paper text-lgray border border-rule">
                      Pending
                    </span>
                  )}

                  <span className={cn("text-lg text-lgray transition-transform", isExpanded && "rotate-180")}>⌄</span>
                </div>

                {/* Expanded body */}
                {isExpanded && (
                  <div className="border-t border-rule">
                    <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-0">
                      {/* AI Panel */}
                      <div className="p-6 md:border-r border-rule">
                        {score ? (
                          <>
                            <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-terra mb-4">AI Screening Report</div>

                            {/* Score bars */}
                            <div className="space-y-3 mb-6">
                              {[
                                { label: "Org. Legitimacy", val: score.dimensions.legitimacy, max: 20 },
                                { label: "Project Specificity", val: score.dimensions.specificity, max: 20 },
                                { label: "Budget Realism", val: score.dimensions.budget, max: 20 },
                                { label: "Impact Measurability", val: score.dimensions.measurability, max: 20 },
                                { label: "Geo. Feasibility", val: score.dimensions.feasibility, max: 20 },
                              ].map((bar) => {
                                const pct = (bar.val / bar.max) * 100;
                                const barColor = pct >= 75 ? "bg-green" : pct >= 50 ? "bg-amber" : "bg-red";
                                return (
                                  <div key={bar.label} className="flex items-center gap-3">
                                    <div className="w-[120px] text-[11px] text-gray truncate">{bar.label}</div>
                                    <div className="flex-1 h-[6px] bg-dust rounded-full overflow-hidden">
                                      <div className={cn("h-full rounded-full", barColor)} style={{ width: `${pct}%` }} />
                                    </div>
                                    <div className="text-[11px] font-mono text-gray w-[40px] text-right">{bar.val}/{bar.max}</div>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Summary */}
                            {score.summary && (
                              <div className="mb-6">
                                <div className="text-[10px] font-mono tracking-[0.1em] uppercase text-lgray mb-2">Summary</div>
                                <p className="text-xs text-gray leading-[1.7] bg-paper border border-rule rounded p-3">{score.summary}</p>
                              </div>
                            )}

                            {/* Flags */}
                            {score.flags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mb-6">
                                {score.flags.map((f, i) => (
                                  <span key={i} className="px-2 py-0.5 text-[10px] font-mono bg-paper border border-rule rounded text-gray">
                                    {f}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Questions */}
                            <div>
                              <div className="text-[10px] font-mono tracking-[0.1em] uppercase text-lgray mb-2">
                                {score.flag === "DECLINE" ? "AI Recommendation" : "Suggested Follow-up"}
                              </div>
                              {score.questions.map((q, i) => (
                                <div key={i} className="text-xs text-ink bg-paper border border-rule rounded p-2.5 mb-1.5 leading-[1.6]">
                                  {q}
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <div className="text-center py-8">
                            <div className="text-xs text-lgray">AI screening not yet completed for this application.</div>
                          </div>
                        )}
                      </div>

                      {/* Details Panel */}
                      <div className="p-6">
                        <div className="space-y-5">
                          <div>
                            <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-lgray mb-2">Organisation</div>
                            <div className="space-y-1.5">
                              <div className="flex justify-between text-xs"><span className="text-lgray">Name</span><span className="text-ink">{app.orgName}</span></div>
                              <div className="flex justify-between text-xs"><span className="text-lgray">Country</span><span className="text-ink">{app.orgCountry}</span></div>
                              <div className="flex justify-between text-xs"><span className="text-lgray">Contact</span><span className="text-ink">{app.contactName}</span></div>
                              <div className="flex justify-between text-xs"><span className="text-lgray">Email</span><span className="text-ink text-terra">{app.contactEmail}</span></div>
                              <div className="flex justify-between text-xs"><span className="text-lgray">Budget</span><span className="text-ink">${app.budgetEstimate.toLocaleString()}</span></div>
                            </div>
                          </div>
                          <div>
                            <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-lgray mb-2">Mission</div>
                            <p className="text-xs text-gray leading-[1.7]">{app.missionStatement}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action bar */}
                    <div className="border-t border-rule p-4 flex flex-wrap gap-2 items-center">
                      <button
                        onClick={() => handleAction(app.id, "APPROVED")}
                        className="px-4 py-2 rounded-md text-xs font-semibold bg-sage text-white cursor-pointer border-none hover:bg-[#2d4038] transition-colors"
                      >
                        ✓ Approve Project
                      </button>
                      <button
                        onClick={() => handleAction(app.id, "NEEDS_INFO")}
                        className="px-4 py-2 rounded-md text-xs font-semibold bg-amber-bg text-amber border border-[#e8c870] cursor-pointer hover:bg-[#ffe8a0] transition-colors"
                      >
                        ⚠ Request More Info
                      </button>
                      <button
                        onClick={() => handleAction(app.id, "REJECTED")}
                        className="px-4 py-2 rounded-md text-xs font-semibold bg-red-bg text-red border border-[#e8a898] cursor-pointer hover:bg-[#ffe0da] transition-colors"
                      >
                        ✕ Decline
                      </button>
                      <div className="flex-1" />
                      <span className="text-[11px] text-lgray font-mono">
                        {app.status === "AI_SCREENED" ? `AI screened ${formatTimeAgo(app.submittedAt)}` : `Submitted ${formatTimeAgo(app.submittedAt)}`}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
