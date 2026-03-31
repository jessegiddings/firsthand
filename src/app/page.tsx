import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EyebrowLabel, Badge, Button } from "@/components/ui";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="min-h-[calc(100vh-64px)] grid grid-cols-1 lg:grid-cols-2 items-center gap-20 py-20 px-6 md:px-12 max-w-[1200px] mx-auto">
          <div className="flex flex-col gap-8">
            <EyebrowLabel className="animate-fade-up">Verified Impact Platform</EyebrowLabel>
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
                <Button variant="primary" arrow>Join the Waitlist</Button>
              </Link>
              <Link href="/how-it-works">
                <Button variant="outline">See How It Works</Button>
              </Link>
            </div>
            <div className="flex items-center gap-4 pt-4 border-t border-rule animate-fade-up animate-delay-4">
              <div className="text-center">
                <div className="font-display text-[28px] font-black text-terra leading-none">5–8%</div>
                <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-ink-muted mt-1">Platform fee</div>
              </div>
              <div className="w-px h-10 bg-rule" />
              <div className="text-center">
                <div className="font-display text-[28px] font-black text-terra leading-none">100%</div>
                <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-ink-muted mt-1">Independently verified</div>
              </div>
              <div className="w-px h-10 bg-rule" />
              <div className="text-center">
                <div className="font-display text-[28px] font-black text-terra leading-none">0</div>
                <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-ink-muted mt-1">Self-reported outcomes</div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block animate-fade-up animate-delay-2">
            <div className="bg-paper border border-rule rounded-2xl p-9 relative overflow-hidden text-center">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-terra to-terra-light" />
              <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-terra mb-5">
                Founding Projects
              </div>
              <h3 className="font-display text-[22px] font-bold leading-[1.2] mb-4">
                Our first verified projects are being confirmed now.
              </h3>
              <p className="text-[13px] leading-[1.65] text-ink-muted max-w-[400px] mx-auto mb-6">
                We&apos;re onboarding our founding cohort of community partners across Los Angeles, Kenya, and India. Join the waitlist to be notified when they go live.
              </p>
              <Link href="/for-donors">
                <Button variant="primary" arrow>Join the Waitlist</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works strip */}
        <div className="bg-paper">
          <div className="max-w-[1200px] mx-auto py-24 px-6 md:px-12">
            <div className="flex flex-col gap-5 mb-16">
              <EyebrowLabel>The Model</EyebrowLabel>
              <h2 className="font-display text-display-md">Three layers. One unbroken chain of trust.</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0.5 mt-16">
              {[
                { num: "01", title: "Community identifies a real need", desc: "Verified local partners submit specific, human-scale needs — with location data, photos, and defined scope. No vague program budgets.", tag: "Community Layer", tagVariant: "community" as const },
                { num: "02", title: "Donors fund directly and transparently", desc: "Funds are held in escrow and released only on verified milestones — not transferred to organizations upfront.", tag: "Donor Layer", tagVariant: "donor" as const },
                { num: "03", title: "AI verifies completion independently", desc: "Photo evidence, GPS data, and community testimony are cross-referenced. No self-reporting. No assumed completion. Ever.", tag: "AI Verification", tagVariant: "ai" as const },
                { num: "04", title: "The story returns to the donor", desc: "You receive a verified, living impact record — with community voice, in real time. A story worth sharing.", tag: "Story Layer", tagVariant: "story" as const },
              ].map((step) => (
                <div key={step.num} className="bg-white p-9 pt-7 relative border-t-[3px] border-transparent transition-colors duration-200 hover:border-terra">
                  <div className="font-mono text-[11px] tracking-[0.2em] text-terra mb-5">{step.num}</div>
                  <h3 className="font-display text-xl font-bold mb-3 leading-[1.2]">{step.title}</h3>
                  <p className="text-[13px] leading-[1.65] text-ink-muted">{step.desc}</p>
                  <Badge variant={step.tagVariant} className="mt-4 text-[9px] tracking-[0.12em] px-2.5 py-1 rounded">{step.tag}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0.5">
          {/* The Problem */}
          <div className="bg-ink text-white p-16 md:p-20">
            <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40 flex items-center gap-2.5">
              <span className="block w-6 h-px bg-white/40" />
              The Problem
            </div>
            <h2 className="font-display text-display-md text-white mt-5">The current model was built for a world that no longer exists.</h2>
            <div className="mt-10 flex flex-col gap-5">
              {[
                { icon: "⚡", title: "40–70% overhead", desc: "Traditional charities absorb the majority of your donation before it reaches anyone." },
                { icon: "📄", title: "Self-reported impact", desc: "Annual reports written by the organizations themselves. No independent verification." },
                { icon: "🔇", title: "Communities have no voice", desc: "The people receiving help rarely decide what help they get — or own the story of their community." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-terra/20 flex items-center justify-center text-sm flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-[15px] font-semibold mb-1">{item.title}</h4>
                    <p className="text-white/60 text-[13px] leading-[1.6]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* The Firsthand Difference */}
          <div className="bg-terra-pale p-16 md:p-20">
            <EyebrowLabel>The Firsthand Difference</EyebrowLabel>
            <h2 className="font-display text-display-md mt-5">Trust built into the architecture.</h2>
            <div className="mt-10 flex flex-col gap-5">
              {[
                { icon: "✓", title: "5–8% platform fee. That's it.", desc: "The rest goes directly to the verified need — released milestone by milestone." },
                { icon: "🛰", title: "AI-powered independent verification", desc: "Satellite imagery, GPS data, photo evidence — cross-referenced, not taken on faith." },
                { icon: "🎙", title: "Community owns their story", desc: "Firsthand gives communities the tools to tell their own story — in their own language." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-sm flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-[15px] font-semibold mb-1">{item.title}</h4>
                    <p className="text-ink-soft text-[13px] leading-[1.6]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Portal CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0.5">
          <div className="bg-sage text-white py-[72px] px-14 flex flex-col gap-6">
            <EyebrowLabel className="text-white/50" withLine={false}>
              <span className="block w-6 h-px bg-white/50" />
              For Donors
            </EyebrowLabel>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-black leading-[1.05] tracking-[-0.02em]">
              Give with certainty.<br />For the first time.
            </h2>
            <p className="text-base leading-[1.75] opacity-85 max-w-[400px]">
              Build a verified giving portfolio. Follow every project you fund. Hear directly from the communities you support.
            </p>
            <div>
              <Link href="/for-donors">
                <Button variant="white" arrow>Join the Waitlist</Button>
              </Link>
            </div>
          </div>
          <div className="bg-terra text-white py-[72px] px-14 flex flex-col gap-6">
            <EyebrowLabel className="text-white/50" withLine={false}>
              <span className="block w-6 h-px bg-white/50" />
              For Communities
            </EyebrowLabel>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-black leading-[1.05] tracking-[-0.02em]">
              Your need.<br />Your story.<br />Your terms.
            </h2>
            <p className="text-base leading-[1.75] opacity-85 max-w-[400px]">
              Firsthand connects verified community needs directly to aligned donors — with full ownership of your data and narrative.
            </p>
            <div>
              <Link href="/for-communities">
                <Button variant="white" arrow>Learn More</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
