import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EyebrowLabel } from "@/components/ui";

export default function PressPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <div className="py-24 px-6 md:px-12 max-w-[900px] mx-auto">
          <EyebrowLabel>Press &amp; Media</EyebrowLabel>
          <h1 className="font-display text-display-lg my-6">For press inquiries</h1>
        </div>

        {/* About Firsthand boilerplate */}
        <div className="max-w-[900px] mx-auto px-6 md:px-12 pb-16">
          <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-terra flex items-center gap-2.5 mb-5">
            <span className="block w-6 h-px bg-terra" />
            About Firsthand
          </div>
          <p className="text-[15px] leading-[1.85] text-ink-soft max-w-[720px]">
            Firsthand Foundation is a verified impact giving platform that connects donors directly to community-identified projects using AI-powered milestone verification and escrow-gated fund release. Founded in 2025 by Jesse O&apos;Brien — a humanitarian field worker, documentary photographer, and television host with over a decade of experience in Kenya and India — Firsthand is built on the premise that technology has made it possible to eliminate the trust gap in philanthropy entirely. The platform is currently in its founding phase, launching its first pilot cohort in 2026.
          </p>
        </div>

        {/* Key Facts */}
        <div className="bg-paper py-20 px-6 md:px-12">
          <div className="max-w-[900px] mx-auto">
            <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-terra flex items-center gap-2.5 mb-10">
              <span className="block w-6 h-px bg-terra" />
              Key Facts
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { label: "Founded", value: "2025" },
                { label: "Status", value: "Founding phase, pilot launch Q2 2026" },
                { label: "Structure", value: "Wyoming nonprofit corporation (501(c)(3) pending)" },
                { label: "Pilot Regions", value: "Los Angeles, CA | Eldoret & Nakuru, Kenya | Rajasthan, India" },
                { label: "Platform Fee", value: "5\u20138% (vs industry standard 20\u201340%)" },
                { label: "Contact", value: "hello@firsthand-foundation.com" },
              ].map((fact) => (
                <div key={fact.label} className="p-6 bg-white border-t-[3px] border-terra">
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted mb-2">{fact.label}</div>
                  <p className="text-[15px] font-semibold text-ink leading-[1.4]">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Downloads */}
        <div className="max-w-[900px] mx-auto px-6 md:px-12 py-20">
          <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-terra flex items-center gap-2.5 mb-5">
            <span className="block w-6 h-px bg-terra" />
            Downloads
          </div>
          <p className="text-[15px] leading-[1.85] text-ink-soft max-w-[600px]">
            Media kit and brand assets available on request. Email{" "}
            <a href="mailto:hello@firsthand-foundation.com" className="text-terra hover:text-terra-light transition-colors">
              hello@firsthand-foundation.com
            </a>{" "}
            with subject line: Press Inquiry.
          </p>
        </div>

        {/* Press Contact */}
        <div className="bg-ink py-20 px-6 md:px-12">
          <div className="max-w-[900px] mx-auto">
            <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40 flex items-center gap-2.5 mb-5">
              <span className="block w-6 h-px bg-white/40" />
              Press Contact
            </div>
            <div className="mt-6">
              <h3 className="font-display text-[22px] font-bold text-white mb-1">Jesse O&apos;Brien</h3>
              <p className="text-sm text-white/60 mb-4">Founder &amp; Executive Director</p>
              <a
                href="mailto:hello@firsthand-foundation.com"
                className="text-terra hover:text-terra-light transition-colors text-sm"
              >
                hello@firsthand-foundation.com
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
