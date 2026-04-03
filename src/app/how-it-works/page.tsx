"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EyebrowLabel, Button } from "@/components/ui";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const donorSteps = [
  {
    eyebrow: "Step 1",
    title: "AI-Powered Matching",
    description:
      "Answer five quick questions and receive a personalized shortlist of verified projects aligned with what matters most to you.",
    detail:
      "Our matching engine uses your values, geography preference, and giving style to recommend projects with the highest personal alignment.",
  },
  {
    eyebrow: "Step 2",
    title: "Fund Into Escrow",
    description:
      "Your donation enters a Stripe-held escrow account immediately. Before you commit, you can see the full milestone breakdown — where every dollar goes and when.",
    detail:
      "You see the full milestone structure before committing. Each milestone has a defined cost, timeline, and verification criteria.",
  },
  {
    eyebrow: "Step 3",
    title: "Independent Milestone Review",
    description:
      "As each milestone is completed, our AI reviews the submitted evidence independently. You are notified with the results — no waiting, no guesswork.",
    detail:
      "Photo evidence, GPS coordinates, and community voice recordings are cross-referenced by our AI. No self-reporting.",
  },
  {
    eyebrow: "Step 4",
    title: "Impact Report Delivered",
    description:
      "Receive a full, verified impact report containing GPS-tagged photos, community voice recordings, and an independent AI confidence score.",
    detail:
      "A permanent, shareable impact record with verified evidence, community narrative, and your giving history.",
  },
];

const partnerSteps = [
  {
    eyebrow: "Step 1",
    title: "Gate 1 — AI Screening",
    description:
      "Submit your project proposal and receive a detailed score across five dimensions within 24 hours, plus actionable feedback to strengthen your application.",
    detail:
      "Scored on: Project Fit, Community Alignment, Financial Health, Milestone Clarity, Implementation Readiness.",
  },
  {
    eyebrow: "Step 2",
    title: "Project Goes Live",
    description:
      "Once approved, your project is published with clearly defined milestones, a budget per milestone, and a GPS-verified location.",
    detail:
      "Each milestone has a defined payment amount, evidence requirements, and timeline. Partners and Firsthand agree before launch.",
  },
  {
    eyebrow: "Step 3",
    title: "Submit Evidence",
    description:
      "At each milestone, upload GPS-tagged photographs, a community voice recording, and a short text description through the partner portal.",
    detail:
      "Evidence is submitted through our partner portal. GPS metadata is automatically extracted and cross-referenced.",
  },
  {
    eyebrow: "Step 4",
    title: "Escrow Releases Within 48 hrs",
    description:
      "Once verified, funds release directly to your account via Stripe or M-Pesa. The 5–8 % platform fee is deducted from escrow — never added on top.",
    detail:
      "US/global partners via Stripe. Kenya partners via M-Pesa. Fee deducted from escrow, not added on top.",
  },
];

/* ------------------------------------------------------------------ */
/*  Escrow flow boxes                                                  */
/* ------------------------------------------------------------------ */

const escrowBoxes = [
  {
    label: "01",
    title: "Donation",
    description: "Funds enter Stripe-held escrow instantly.",
    highlighted: false,
  },
  {
    label: "02",
    title: "Escrow Hold",
    description: "Funds locked. Partner notified. Work begins on milestones.",
    highlighted: true,
  },
  {
    label: "03",
    title: "AI Verification",
    description:
      "Evidence submitted. AI independently scores. Escrow releases.",
    highlighted: false,
  },
];

/* ------------------------------------------------------------------ */
/*  Arrow between boxes                                                */
/* ------------------------------------------------------------------ */

function FlowArrow() {
  return (
    <div className="hidden md:flex items-center justify-center text-[#444] shrink-0">
      <svg
        width="32"
        height="16"
        viewBox="0 0 32 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 8H28M28 8L22 2M28 8L22 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile arrow (vertical)                                            */
/* ------------------------------------------------------------------ */

function FlowArrowDown() {
  return (
    <div className="flex md:hidden items-center justify-center text-[#444] py-2">
      <svg
        width="16"
        height="32"
        viewBox="0 0 16 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 0V28M8 28L2 22M8 28L14 22"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Timeline step component                                            */
/* ------------------------------------------------------------------ */

function TimelineStep({
  step,
  isLast,
}: {
  step: (typeof donorSteps)[number];
  isLast: boolean;
}) {
  return (
    <div className="relative pl-10 md:pl-14 pb-12 last:pb-0">
      {/* Vertical line */}
      {!isLast && (
        <span className="absolute left-[7px] md:left-[11px] top-[20px] bottom-0 w-px bg-rule" />
      )}
      {/* Dot */}
      <span className="absolute left-0 md:left-1 top-[6px] w-[15px] h-[15px] rounded-full border-[2.5px] border-terra bg-paper" />

      <EyebrowLabel className="mb-3">{step.eyebrow}</EyebrowLabel>
      <h3 className="font-display text-[22px] md:text-[26px] font-bold mb-2">
        {step.title}
      </h3>
      <p className="text-[15px] leading-[1.75] text-ink-soft max-w-[560px] mb-4">
        {step.description}
      </p>
      {/* Detail box */}
      <div className="border-l-[3px] border-terra bg-paper py-4 px-5 text-[13px] text-ink-soft leading-[1.65] font-mono max-w-[560px]">
        {step.detail}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState<"donor" | "partner">("donor");

  const steps = activeTab === "donor" ? donorSteps : partnerSteps;

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="bg-paper py-24 px-6 md:px-12 text-center">
          <div className="flex flex-col items-center gap-5 max-w-[640px] mx-auto">
            <EyebrowLabel className="justify-center">The Model</EyebrowLabel>
            <h1 className="font-display text-display-lg">
              How Firsthand works
            </h1>
            <p className="text-lg leading-[1.75] text-ink-soft max-w-[560px]">
              Every dollar has a journey. For the first time, you can follow
              it&nbsp;— verified at every step by independent AI, not
              self-reported by the people spending it.
            </p>
          </div>
        </section>

        {/* ── Escrow Architecture ───────────────────────────────── */}
        <section className="bg-[#111009] py-24 px-6 md:px-12">
          <div className="max-w-[960px] mx-auto">
            <EyebrowLabel className="justify-center mb-4 text-terra">
              Escrow Architecture
            </EyebrowLabel>
            <h2 className="font-display text-[28px] md:text-[36px] font-bold text-white text-center mb-16">
              Your money is held, not handed over
            </h2>

            {/* Boxes + arrows */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-0">
              {escrowBoxes.map((box, i) => (
                <div key={box.label} className="flex flex-col md:flex-row items-center">
                  {/* Box */}
                  <div
                    className={`rounded-lg p-6 md:p-8 w-full md:w-[260px] text-center transition-colors ${
                      box.highlighted
                        ? "bg-terra text-white"
                        : "bg-[#1a1a14] text-white border border-[#2a2a22]"
                    }`}
                  >
                    <span
                      className={`font-mono text-[10px] tracking-[0.2em] uppercase block mb-3 ${
                        box.highlighted ? "text-white/70" : "text-[#666]"
                      }`}
                    >
                      {box.label}
                    </span>
                    <h3 className="font-display text-[20px] font-bold mb-2">
                      {box.title}
                    </h3>
                    <p
                      className={`text-[13px] leading-[1.65] ${
                        box.highlighted ? "text-white/80" : "text-[#999]"
                      }`}
                    >
                      {box.description}
                    </p>
                  </div>

                  {/* Arrow (not after last box) */}
                  {i < escrowBoxes.length - 1 && (
                    <>
                      <FlowArrow />
                      <FlowArrowDown />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tabbed Timeline ───────────────────────────────────── */}
        <section className="py-24 px-6 md:px-12">
          <div className="max-w-[720px] mx-auto">
            <EyebrowLabel className="justify-center mb-4">
              The Journey
            </EyebrowLabel>
            <h2 className="font-display text-[28px] md:text-[36px] font-bold text-center mb-12">
              Two sides. One transparent system.
            </h2>

            {/* Tab buttons */}
            <div className="flex justify-center gap-3 mb-16">
              <button
                onClick={() => setActiveTab("donor")}
                className={`px-6 py-3 rounded-md font-body text-sm font-semibold transition-all duration-150 cursor-pointer border-none ${
                  activeTab === "donor"
                    ? "bg-terra text-white"
                    : "bg-paper text-ink-soft hover:bg-dust"
                }`}
              >
                Donor Journey
              </button>
              <button
                onClick={() => setActiveTab("partner")}
                className={`px-6 py-3 rounded-md font-body text-sm font-semibold transition-all duration-150 cursor-pointer border-none ${
                  activeTab === "partner"
                    ? "bg-terra text-white"
                    : "bg-paper text-ink-soft hover:bg-dust"
                }`}
              >
                Partner Journey
              </button>
            </div>

            {/* Timeline */}
            <div>
              {steps.map((step, i) => (
                <TimelineStep
                  key={`${activeTab}-${i}`}
                  step={step}
                  isLast={i === steps.length - 1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <section className="bg-paper py-24 px-6 md:px-12 text-center">
          <h2 className="font-display text-display-md mb-5">
            Ready to give differently?
          </h2>
          <p className="text-lg leading-[1.75] text-ink-soft mb-10 max-w-[480px] mx-auto">
            Join the waitlist and be among the first to experience verified,
            milestone-gated giving.
          </p>
          <Link href="/for-donors">
            <Button variant="primary" arrow>
              Join the Donor Waitlist
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
