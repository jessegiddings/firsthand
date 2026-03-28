"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Application {
  id: string;
  orgName: string;
  projectTitle: string;
  country: string;
  budget: number;
  status: string;
  aiScore: {
    total: number;
    dimensions: {
      orgLegitimacy: number;
      projectSpecificity: number;
      budgetRealism: number;
      impactMeasurability: number;
      geoFeasibility: number;
    };
    flags: string[];
    observations: { type: string; text: string }[];
    questions: string[];
    recommendation: string;
  } | null;
  submittedAt: string;
}

// Demo data for the admin view
const demoApplications: Application[] = [
  {
    id: "1",
    orgName: "Lwala Community Alliance",
    projectTitle: "Classroom Roof Repair — Eldoret Primary School",
    country: "Kenya",
    budget: 8400,
    status: "AI_SCREENED",
    aiScore: {
      total: 84,
      dimensions: { orgLegitimacy: 18, projectSpecificity: 17, budgetRealism: 16, impactMeasurability: 18, geoFeasibility: 15 },
      flags: [],
      observations: [
        { type: "pos", text: "Organisation verified: NGO Board Kenya reg. #KE-NGO-4471-2016, 8 years operating" },
        { type: "pos", text: "Project highly specific — 47 students, physical roof structure, GPS coordinates provided" },
        { type: "pos", text: "M-Pesa payment pathway confirmed available for Uasin Gishu County" },
        { type: "neu", text: "Budget $8,400 is within normal range for school roof in Kenya ($150–$200/m²)" },
      ],
      questions: [
        "Request before-photo with GPS metadata to establish baseline for verification",
        "Confirm local verification contact's availability for milestone submission",
      ],
      recommendation: "APPROVE",
    },
    submittedAt: "2h ago",
  },
  {
    id: "2",
    orgName: "Nakuru Farmers Alliance",
    projectTitle: "Women's Agricultural Cooperative — Seed & Tools Fund",
    country: "Kenya",
    budget: 12000,
    status: "AI_SCREENED",
    aiScore: {
      total: 61,
      dimensions: { orgLegitimacy: 12, projectSpecificity: 13, budgetRealism: 11, impactMeasurability: 14, geoFeasibility: 11 },
      flags: ["unverified_registration"],
      observations: [
        { type: "neu", text: "Organisation reg. number provided but not found in Kenya NGO Board public database" },
        { type: "neg", text: "Budget lacks itemisation — $12,000 for 'seeds and tools' needs breakdown" },
        { type: "pos", text: "GPS coordinates provided, location confirmed in Nakuru County, M-Pesa feasible" },
        { type: "neu", text: "No financial statement uploaded — org history unclear beyond stated 3 years" },
      ],
      questions: [
        "Please provide your cooperative registration number and registering authority",
        "How many cooperative members will directly benefit, and can you provide an itemised budget?",
        "Please upload your most recent financial statement or cooperative audit",
      ],
      recommendation: "REQUEST_INFO",
    },
    submittedAt: "5h ago",
  },
  {
    id: "3",
    orgName: "Hope Rising Foundation",
    projectTitle: "Community Development Program — General Operations Support",
    country: "Nigeria",
    budget: 45000,
    status: "AI_SCREENED",
    aiScore: {
      total: 28,
      dimensions: { orgLegitimacy: 6, projectSpecificity: 3, budgetRealism: 4, impactMeasurability: 5, geoFeasibility: 10 },
      flags: ["not_found_in_registry", "no_documents", "ineligible_project_type"],
      observations: [
        { type: "neg", text: "Organisation not found in any public registry. Website domain registered 34 days ago." },
        { type: "neg", text: "Project description is entirely program-level with no specific deliverable" },
        { type: "neg", text: "Budget of $45,000 with no itemisation or milestones. Classified as general operational funding" },
        { type: "neg", text: "No registration document, no site photo, no endorsement letter uploaded" },
      ],
      questions: [
        "Auto-decline recommended. Application does not meet minimum criteria on 4 of 5 dimensions.",
      ],
      recommendation: "REJECT",
    },
    submittedAt: "1d ago",
  },
];

function getFlag(score: number): { label: string; color: string; filterKey: string } {
  if (score >= 70) return { label: "Ready to Approve", color: "green", filterKey: "green" };
  if (score >= 40) return { label: "Needs Info", color: "amber", filterKey: "amber" };
  return { label: "Low Score", color: "red", filterKey: "red" };
}

export default function AdminApplicationsPage() {
  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [applications, setApplications] = useState(demoApplications);

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

        {/* Application Cards */}
        <div className="space-y-3">
          {filteredApps.map((app) => {
            const flag = getFlag(app.aiScore?.total || 0);
            const isExpanded = expandedId === app.id;
            const score = app.aiScore;

            return (
              <div key={app.id} className="bg-white border border-rule rounded-lg overflow-hidden">
                {/* Header row */}
                <div
                  className="flex items-center gap-4 p-4 cursor-pointer hover:bg-paper/50 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : app.id)}
                >
                  {/* Score ring */}
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold border-[3px] flex-shrink-0",
                      flag.color === "green" && "border-green text-green",
                      flag.color === "amber" && "border-amber text-amber",
                      flag.color === "red" && "border-red text-red"
                    )}
                  >
                    {score?.total || 0}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-ink truncate">{app.projectTitle}</div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                      <span className="text-[11px] text-lgray">🏢 {app.orgName}</span>
                      <span className="text-[11px] text-lgray">📍 {app.country}</span>
                      <span className="text-[11px] text-lgray">💵 ${app.budget.toLocaleString()} USD</span>
                      <span className="text-[11px] text-lgray">🗓 {app.submittedAt}</span>
                    </div>
                  </div>

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

                  <span className={cn("text-lg text-lgray transition-transform", isExpanded && "rotate-180")}>⌄</span>
                </div>

                {/* Expanded body */}
                {isExpanded && score && (
                  <div className="border-t border-rule">
                    <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-0">
                      {/* AI Panel */}
                      <div className="p-6 border-r border-rule">
                        <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-terra mb-4">AI Screening Report</div>

                        {/* Score bars */}
                        <div className="space-y-3 mb-6">
                          {[
                            { label: "Org. Legitimacy", val: score.dimensions.orgLegitimacy, max: 20 },
                            { label: "Project Specificity", val: score.dimensions.projectSpecificity, max: 20 },
                            { label: "Budget Realism", val: score.dimensions.budgetRealism, max: 20 },
                            { label: "Impact Measurability", val: score.dimensions.impactMeasurability, max: 20 },
                            { label: "Geo. Feasibility", val: score.dimensions.geoFeasibility, max: 20 },
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

                        {/* Observations */}
                        <div className="space-y-2 mb-6">
                          {score.observations.map((obs, i) => (
                            <div key={i} className="flex gap-2 items-start text-xs leading-[1.6] text-gray">
                              <div
                                className={cn(
                                  "w-2 h-2 rounded-full flex-shrink-0 mt-1",
                                  obs.type === "pos" && "bg-green",
                                  obs.type === "neu" && "bg-amber",
                                  obs.type === "neg" && "bg-red"
                                )}
                              />
                              {obs.text}
                            </div>
                          ))}
                        </div>

                        {/* Questions */}
                        <div>
                          <div className="text-[10px] font-mono tracking-[0.1em] uppercase text-lgray mb-2">
                            {score.recommendation === "REJECT" ? "AI recommendation" : "Suggested follow-up"}
                          </div>
                          {score.questions.map((q, i) => (
                            <div key={i} className="text-xs text-ink bg-paper border border-rule rounded p-2.5 mb-1.5 leading-[1.6]">
                              {q}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Details Panel */}
                      <div className="p-6">
                        <div className="space-y-5">
                          <div>
                            <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-lgray mb-2">Organisation</div>
                            <div className="space-y-1.5">
                              <div className="flex justify-between text-xs"><span className="text-lgray">Name</span><span className="text-ink">{app.orgName}</span></div>
                              <div className="flex justify-between text-xs"><span className="text-lgray">Country</span><span className="text-ink">{app.country}</span></div>
                              <div className="flex justify-between text-xs"><span className="text-lgray">Budget</span><span className="text-ink">${app.budget.toLocaleString()}</span></div>
                            </div>
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
                      <span className="text-[11px] text-lgray font-mono">AI screened {app.submittedAt}</span>
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
