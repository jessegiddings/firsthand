import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EyebrowLabel, Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Why Firsthand — Verified Impact Platform",
  description:
    "The honest critique of how giving works — and what Firsthand built instead. Escrow-gated, AI-verified, community-owned.",
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const sections = [
  {
    problem: {
      title: "Funds move before anything is verified.",
      copy: "On every major giving platform, donations transfer before independent verification occurs, if verification occurs at all. Progress reports are self-submitted by the organizations receiving the money. That\u2019s a structural conflict of interest.",
    },
    answer: {
      title: "Escrow + Independent AI Verification",
      copy: "Every donation enters escrow. Not a cent moves until our AI independently reviews the evidence — photos, GPS data, community voice — and scores the milestone. The implementing org has no role in their own verification.",
    },
  },
  {
    problem: {
      title: "Communities are the subject, not the author.",
      copy: "Charity: water\u2019s films are beautiful. GlobalGiving\u2019s partner updates are well-intentioned. But in every case, a communications team decides what gets told, how it\u2019s framed, and who\u2019s photographed. Communities are the content — not the storytellers.",
    },
    answer: {
      title: "Community Voice as Infrastructure",
      copy: "Community members record voice notes in their language. Our AI transcribes, translates, and publishes them as the donor impact story. The community approves the final version. They own their data. The organization does not.",
    },
  },
  {
    problem: {
      title: "Platform fees punish donors and partners alike.",
      copy: null, // Rendered inline due to italic span
    },
    answer: {
      title: "5–8% from Escrow, Only on Verification",
      copy: "We take our fee from inside the escrow, only when a milestone is verified. If a project fails, no Firsthand fee is charged. The fee structure aligns our incentives with actual outcomes — not with the volume of donations processed.",
    },
  },
  {
    problem: {
      title: "AI is being applied to fundraising copy, not accountability.",
      copy: "Most platforms using AI are using it to generate fundraising emails, optimize donation pages, or write impact summaries. The accountability chain — where trust actually breaks — remains untouched.",
    },
    answer: {
      title: "AI at Every Stage of the Accountability Chain",
      copy: "Firsthand uses AI for: Gate 1 application screening (5-dimension scoring), milestone evidence verification (photo, GPS, voice cross-reference), community voice transcription and translation, and donor-project matching. AI is the verification layer — not the marketing layer.",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function WhyFirsthandPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="bg-ink text-white py-28 px-6 md:px-12">
          <div className="max-w-[900px] mx-auto">
            <EyebrowLabel className="text-terra mb-6">
              Why Firsthand
            </EyebrowLabel>

            <h1 className="font-display text-[clamp(36px,5.5vw,72px)] font-black leading-[1.05] tracking-[-0.03em] mb-6">
              The honest critique of how giving works&nbsp;— and what we built
              instead.
            </h1>

            <p className="text-lg md:text-xl leading-[1.8] text-white/70 max-w-[680px]">
              Every platform in this space solves part of the problem. None solve
              all of it. Here&apos;s what we learned&nbsp;— and what we built.
            </p>
          </div>
        </section>

        {/* ── Critique + Answer Sections ───────────────────────────── */}
        <section className="py-24 px-6 md:px-12">
          <div className="max-w-[1200px] mx-auto flex flex-col gap-20">
            {sections.map((s, i) => (
              <div
                key={i}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
              >
                {/* Problem column */}
                <div className="bg-white rounded-lg p-8 md:p-10">
                  <EyebrowLabel className="mb-4 text-ink/40">
                    The Problem
                  </EyebrowLabel>
                  <h3 className="font-display text-2xl md:text-3xl font-bold tracking-[-0.02em] text-ink mb-4">
                    {s.problem.title}
                  </h3>
                  {/* Section 3 has inline italic */}
                  {i === 2 ? (
                    <p className="font-body text-base leading-[1.8] text-ink/70">
                      Traditional NGOs take 20–40% overhead before any program
                      dollar moves. Crowdfunding platforms charge 8–15% at the
                      moment of donation&nbsp;— not when impact is delivered.
                      Some emerging platforms{" "}
                      <em>add their fee on top</em> of each milestone payment.
                      Our fee is detached from whether anything worked.
                    </p>
                  ) : (
                    <p className="font-body text-base leading-[1.8] text-ink/70">
                      {s.problem.copy}
                    </p>
                  )}
                </div>

                {/* Answer column */}
                <div className="bg-[#faf3ee] border-l-4 border-terra rounded-lg p-8 md:p-10">
                  <EyebrowLabel className="mb-4">
                    Firsthand&apos;s Answer
                  </EyebrowLabel>
                  <h3 className="font-display text-2xl md:text-3xl font-bold tracking-[-0.02em] text-ink mb-4">
                    {s.answer.title}
                  </h3>
                  <p className="font-body text-base leading-[1.8] text-ink/70">
                    {s.answer.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA Section ──────────────────────────────────────────── */}
        <section className="bg-paper py-24 px-6 md:px-12 text-center">
          <div className="max-w-[640px] mx-auto">
            <EyebrowLabel className="justify-center mb-6">
              Next Steps
            </EyebrowLabel>

            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-[-0.02em] text-ink mb-4">
              See the mechanism in detail.
            </h2>

            <p className="font-body text-base leading-[1.8] text-ink/60 mb-10">
              Explore how escrow, AI verification, and community voice come
              together&nbsp;— or join the donor waitlist to be first in line.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/how-it-works">
                <Button variant="primary" arrow>
                  See How It Works
                </Button>
              </Link>
              <Link href="/for-donors">
                <Button variant="outline" arrow>
                  Join the Donor Waitlist
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
