import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EyebrowLabel, Badge, Button } from "@/components/ui";
import { HeroMechCard } from "@/components/HeroMechCard";
import { TrustBar } from "@/components/TrustBar";
import { FeeCompare } from "@/components/FeeCompare";
import { CommunityVoiceDemo } from "@/components/CommunityVoiceDemo";
import { PilotCard } from "@/components/PilotCard";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* ── SECTION 1.1 — HERO ── */}
        <section className="min-h-[calc(100vh-64px)] grid grid-cols-1 lg:grid-cols-2 items-center gap-16 py-20 px-6 md:px-12 max-w-[1200px] mx-auto">
          <div className="flex flex-col gap-7">
            <div className="flex items-center gap-3 animate-fade-up">
              <Badge variant="ai" className="text-[10px] tracking-[0.1em] px-3 py-1">
                Verified Impact Platform
              </Badge>
            </div>
            <h1 className="font-display text-[clamp(40px,5.5vw,72px)] font-black leading-[1.05] tracking-[-0.025em] animate-fade-up animate-delay-1">
              When was the last time you gave —
              <span className="block text-terra italic">
                and actually knew<br />what happened?
              </span>
            </h1>
            <p className="text-[17px] leading-[1.75] text-ink-soft max-w-[460px] animate-fade-up animate-delay-2">
              Firsthand connects donors directly to verified community needs.
              No opaque institutions. No self-reported impact.
              Just a direct line — confirmed by AI — from your giving to real change.
            </p>
            <div className="flex items-center gap-4 flex-wrap animate-fade-up animate-delay-3">
              <Link href="/for-donors">
                <Button variant="primary" arrow>Join the Donor Waitlist</Button>
              </Link>
              <Link href="/for-partners">
                <Button variant="outline">Apply as a Community Partner</Button>
              </Link>
            </div>
            {/* Proof bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-rule animate-fade-up animate-delay-4">
              {[
                { stat: "$0", label: "leaves escrow unverified" },
                { stat: "5–8%", label: "platform fee vs 20–40% avg" },
                { stat: "3", label: "pilot geographies launching" },
                { stat: "100%", label: "community-owned narratives" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="font-display text-[22px] font-black text-terra leading-none">
                    {item.stat}
                  </div>
                  <div className="font-mono text-[8px] tracking-[0.15em] uppercase text-ink-muted mt-1.5 leading-[1.4]">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block animate-fade-up animate-delay-2">
            <HeroMechCard />
          </div>
        </section>

        {/* ── SECTION 1.2 — TRUST BAR ── */}
        <TrustBar />

        {/* ── SECTION 1.3 — FEE COMPARISON ── */}
        <FeeCompare />

        {/* ── SECTION 1.4 — HOW IT WORKS (2-COLUMN) ── */}
        <div className="py-20 px-6 md:px-12">
          <div className="max-w-[1200px] mx-auto">
            <EyebrowLabel className="mb-5">How It Works</EyebrowLabel>
            <h2 className="font-display text-display-md mb-14">
              Two paths. One mechanism.
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* For Donors */}
              <div>
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-terra border-b-2 border-terra pb-2 mb-8 inline-block">
                  For Donors
                </div>
                <div className="flex flex-col gap-6">
                  {[
                    { num: "01", title: "Answer 5 questions", desc: "AI matches you with verified projects aligned to your values and geography." },
                    { num: "02", title: "Fund with confidence", desc: "Your donation enters Stripe-held escrow. Full milestone breakdown visible before you commit." },
                    { num: "03", title: "Watch it happen", desc: "Receive milestone updates as the community completes each stage. AI verifies independently." },
                    { num: "04", title: "Hear the community\u2019s voice", desc: "Verified impact report with GPS data, photos, community voice recordings, and AI verification score." },
                  ].map((step) => (
                    <div key={step.num} className="flex gap-4">
                      <div className="font-mono text-[11px] tracking-[0.15em] text-terra pt-0.5 flex-shrink-0 w-6">
                        {step.num}
                      </div>
                      <div>
                        <h4 className="text-[15px] font-semibold text-ink mb-1">{step.title}</h4>
                        <p className="text-[13px] leading-[1.65] text-ink-muted">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* For Community Partners */}
              <div>
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-terra border-b-2 border-terra pb-2 mb-8 inline-block">
                  For Community Partners
                </div>
                <div className="flex flex-col gap-6">
                  {[
                    { num: "01", title: "Submit a bounded project", desc: "AI screens your application across 5 dimensions within 24 hours. Detailed feedback provided." },
                    { num: "02", title: "Get funded", desc: "Your project goes live. Milestones defined, budget allocated per milestone, GPS location confirmed." },
                    { num: "03", title: "Submit evidence", desc: "GPS-tagged photos, voice recordings, written descriptions. Evidence submitted at each milestone." },
                    { num: "04", title: "Receive verified payment", desc: "Escrow releases within 48hrs. Via Stripe (US/global) or M-Pesa (Kenya). 5\u20138% from escrow." },
                  ].map((step) => (
                    <div key={step.num} className="flex gap-4">
                      <div className="font-mono text-[11px] tracking-[0.15em] text-terra pt-0.5 flex-shrink-0 w-6">
                        {step.num}
                      </div>
                      <div>
                        <h4 className="text-[15px] font-semibold text-ink mb-1">{step.title}</h4>
                        <p className="text-[13px] leading-[1.65] text-ink-muted">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 1.5 — COMMUNITY VOICE DEMO ── */}
        <div className="bg-paper py-20 px-6 md:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12">
              <EyebrowLabel className="justify-center mb-5">Community Voice</EyebrowLabel>
              <h2 className="font-display text-display-md mb-4">
                The community tells the story. In their own words.
              </h2>
              <p className="text-[15px] leading-[1.75] text-ink-soft max-w-[600px] mx-auto">
                Every other platform tells communities&apos; stories on their behalf. On Firsthand, community members record voice notes from the field. Our AI transcribes, translates, and publishes them as donor impact stories — owned entirely by the community.
              </p>
            </div>
            <CommunityVoiceDemo />
          </div>
        </div>

        {/* ── SECTION 1.6 — PILOT PROGRAM (LA) ── */}
        <PilotCard
          pilotName="LA Foster Youth Pilot"
          partner="Luc Robitaille"
          partnerRole="LA Kings President · Echoes of Hope"
          eyebrow="Pilot Program · Los Angeles"
          headline="Foster youth college completion — verified one milestone at a time."
          paragraphs={[
            "Our US launch pilot, in partnership with Luc Robitaille and Echoes of Hope, funds foster youth transitioning into higher education in Los Angeles. Each milestone — enrollment, completion of first semester, scholarship application — is independently verified before escrow releases.",
            "Donors see exactly where their money is in the pipeline. Youth see their progress documented and celebrated. Partners receive payment tied to real outcomes — not just effort.",
          ]}
          tags={["Los Angeles", "Foster Youth", "College Completion", "Milestone-Verified"]}
        />

        {/* ── SECTION 1.7 — FOUNDER ── */}
        <div className="py-20 px-6 md:px-12">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-center">
            {/* Photo placeholder */}
            <div className="aspect-square max-w-[320px] mx-auto lg:mx-0 rounded-xl bg-sage relative overflow-hidden" data-photo-slot="jesse-giddings">
              <Image
                src="/images/IMG_4403.jpeg"
                alt="Jesse Giddings — Founder of Firsthand Foundation"
                fill
                className="object-cover object-top"
                sizes="320px"
              />
            </div>

            {/* Content */}
            <div>
              <blockquote className="font-display text-[clamp(20px,2.5vw,28px)] italic text-terra leading-[1.35] mb-8">
                &ldquo;I&apos;ve stood on stages in front of 20,000 people raising money for communities I&apos;d visited in Kenya and India. I saw the impact with my own eyes. Most donors never do. Firsthand is how we close that gap.&rdquo;
              </blockquote>
              <h3 className="font-display text-[22px] font-bold mb-1">Jesse Giddings</h3>
              <p className="text-sm text-ink-muted mb-5">Founder &amp; Executive Director</p>
              <p className="text-[14px] leading-[1.8] text-ink-soft mb-5">
                A philanthropy strategist and connector with 15+ years bridging global humanitarian causes, high-profile donors, and mission-driven partnerships. Jesse hosted national WE Charity events for a decade, standing on stage in front of 20,000 people across Canada while cultivating major donor relationships and leading impact trips to Kenya and India. As a television personality on E! News and MuchMusic and with years in talent management and film production, he developed the storytelling and relationship skills that now drive Firsthand&apos;s model.
              </p>
              <div className="flex flex-wrap gap-2">
                {["WE Charity", "10+ years", "E! News", "MuchMusic", "Kenya", "India fieldwork", "Syrian refugee crisis", "IMC", "Talent Management", "Film Production", "@jessegiddings"].map((tag) => (
                  <span key={tag} className="font-mono text-[9px] tracking-[0.1em] uppercase px-2.5 py-1 rounded bg-terra-pale text-terra">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 1.8 — ORG TRUST / STATUS ── */}
        <div className="bg-paper py-20 px-6 md:px-12">
          <div className="max-w-[1200px] mx-auto">
            <EyebrowLabel className="mb-5">Organizational Status</EyebrowLabel>
            <h2 className="font-display text-display-md mb-12">Built to be trusted.</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { label: "Wyoming Nonprofit Corp.", status: "confirmed" },
                { label: "EIN Obtained", status: "confirmed" },
                { label: "501(c)(3) Pending", status: "pending" },
                { label: "Gates Foundation Grant App", note: "April 2026", status: "pending" },
                { label: "Stripe Escrow", status: "confirmed" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-5 rounded-lg border bg-white border-rule"
                >
                  <div
                    className={`inline-block w-2.5 h-2.5 rounded-full mb-3 ${
                      item.status === "confirmed"
                        ? "bg-green"
                        : "bg-amber"
                    }`}
                  />
                  <h4 className="text-[13px] font-semibold text-ink leading-tight">
                    {item.label}
                  </h4>
                  {item.note && (
                    <p className="text-[11px] text-ink-muted mt-1">{item.note}</p>
                  )}
                  <span
                    className={`inline-block font-mono text-[9px] tracking-[0.1em] uppercase mt-2 px-2 py-0.5 rounded ${
                      item.status === "confirmed"
                        ? "bg-green-bg text-green"
                        : "bg-amber-bg text-amber"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
