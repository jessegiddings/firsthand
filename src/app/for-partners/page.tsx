import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EyebrowLabel, Button } from "@/components/ui";
import { Gate1ScoreBar } from "@/components/Gate1ScoreBar";

export const metadata = {
  title: "For Community Partners — Firsthand Foundation",
  description:
    "Get funded for verified milestones. AI-screened applications, escrow-gated payments, community-owned narratives.",
};

const eligibilityCriteria = [
  {
    num: 1,
    title: "Registered Organization",
    desc: "Formally registered NGO or nonprofit in your operating country. We verify legal status before onboarding.",
  },
  {
    num: 2,
    title: "Bounded Project",
    desc: "Specific scope, clear milestones, and a measurable end state. We fund projects, not operational costs.",
  },
  {
    num: 3,
    title: "Priority Geographies",
    desc: "Los Angeles, Eldoret/Nakuru (Kenya), Rajasthan (India). Other regions considered on a case-by-case basis.",
  },
  {
    num: 4,
    title: "Evidence Capacity",
    desc: "Ability to provide GPS-tagged photos, voice recordings, and basic written descriptions of progress.",
  },
  {
    num: 5,
    title: "Community Consent",
    desc: "Demonstrated community buy-in required. Community members must be involved in milestone definition.",
  },
  {
    num: 6,
    title: "Budget $500\u2013$50K",
    desc: "Current pilot range for funded projects. Larger projects considered with additional vetting and documentation.",
  },
];

const gate1Scores = [
  { label: "Project Fit", value: 88 },
  { label: "Community Alignment", value: 92 },
  { label: "Financial Health", value: 74 },
  { label: "Milestone Clarity", value: 81 },
  { label: "Implementation Readiness", value: 69 },
];

export default function ForPartnersPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* ── Hero ── */}
        <section className="bg-paper py-24 px-6 md:px-12 text-center">
          <div className="max-w-[720px] mx-auto">
            <EyebrowLabel className="justify-center mb-6" withLine={false}>
              <span className="block w-6 h-px bg-terra" />
              For Partners
            </EyebrowLabel>
            <h1 className="font-display text-[clamp(40px,6vw,72px)] font-black leading-[0.95] tracking-[-0.025em] text-ink mb-6">
              Get funded for what you actually accomplish.
            </h1>
            <p className="text-lg text-ink-muted max-w-[560px] mx-auto mb-10 leading-[1.75]">
              Firsthand funds community-defined projects with milestone-gated
              payments. You define the milestones. We verify the evidence. Donors
              fund with confidence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/apply">
                <Button variant="primary" arrow>
                  Start Your Application
                </Button>
              </Link>
              <Link href="#">
                <Button variant="outline">Download Partner Guide</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Eligibility Criteria ── */}
        <section className="max-w-[1200px] mx-auto py-24 px-6 md:px-12">
          <div className="flex flex-col gap-5 mb-16">
            <EyebrowLabel>Eligibility</EyebrowLabel>
            <h2 className="font-display text-display-md">
              Who we work with
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eligibilityCriteria.map((card) => (
              <div
                key={card.num}
                className="bg-white rounded-lg border-t-[3px] border-terra p-8 shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-terra/10 text-terra font-mono text-sm font-bold flex items-center justify-center mb-5">
                  {card.num}
                </div>
                <h3 className="font-display text-[18px] font-bold mb-3 text-ink">
                  {card.title}
                </h3>
                <p className="text-[13px] leading-[1.65] text-ink-muted">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Gate 1 AI Scoring ── */}
        <section className="bg-sage py-24 px-6 md:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left — Explanation */}
              <div>
                <EyebrowLabel
                  className="text-white/50 mb-6"
                  withLine={false}
                >
                  <span className="block w-6 h-px bg-white/50" />
                  Gate 1 &mdash; AI Scoring
                </EyebrowLabel>
                <h2 className="font-display text-[clamp(28px,4vw,44px)] font-black leading-[1.1] tracking-[-0.02em] text-white mb-6">
                  Instant, transparent feedback.
                </h2>
                <p className="text-[15px] leading-[1.8] text-white/75">
                  When you submit, our AI immediately scores your application
                  across five dimensions. You receive detailed feedback — not
                  just a pass/fail. If your score is below threshold, we tell you
                  exactly why and how to improve.
                </p>
                <p className="text-[15px] leading-[1.8] text-white/75 mt-4">
                  This isn&apos;t gatekeeping. It&apos;s a way to give every
                  organization the same quality of feedback that a large
                  foundation&apos;s program officer would give — instantly, at no
                  cost.
                </p>
              </div>

              {/* Right — Animated Score Bars */}
              <div>
                <Gate1ScoreBar scores={gate1Scores} />
              </div>
            </div>

            {/* AI Recommendation Box */}
            <div className="mt-16 bg-[#1a1a18] rounded-lg p-8 border-l-4 border-terra">
              <div className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase mb-4">
                AI Recommendation
              </div>
              <p className="text-white font-display text-lg font-bold mb-3">
                Overall score: 80.8/100 — Recommend for human review.
              </p>
              <p className="text-[13px] leading-[1.7] text-white/60">
                <span className="text-terra font-semibold">Flag:</span>{" "}
                Implementation timeline could be more specific.
              </p>
              <p className="text-[13px] leading-[1.7] text-white/60 mt-2">
                <span className="text-terra font-semibold">
                  Suggested question:
                </span>{" "}
                Can you break down the 6-month timeline into specific monthly
                milestones with evidence checkpoints?
              </p>
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="py-24 px-6 md:px-12 text-center bg-paper">
          <Link href="/apply">
            <Button variant="primary" arrow>
              Start Application
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
