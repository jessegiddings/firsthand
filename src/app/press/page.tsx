import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EyebrowLabel } from "@/components/ui";

export const metadata: Metadata = {
  title: "Press — Firsthand Foundation",
  description:
    "Press resources, founder bio, and media contact for Firsthand Foundation. Founded by Jesse Giddings. Pilot launching Q2 2026.",
};

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
          <div className="flex flex-col gap-4 max-w-[720px]">
            <p className="text-[15px] leading-[1.85] text-ink-soft">
              Firsthand Foundation is a verified impact giving platform that connects donors directly to community-identified projects using AI-powered milestone verification and escrow-gated fund release.
            </p>
            <p className="text-[15px] leading-[1.85] text-ink-soft">
              Founded by Jesse Giddings — an international television host (E! News, MuchMusic), humanitarian photographer, and a decade-long collaborator with WE Charity across Kenya and India — Firsthand is built on the conviction that technology has made it possible to eliminate the trust gap in philanthropy entirely.
            </p>
            <p className="text-[15px] leading-[1.85] text-ink-soft">
              The platform is currently in its founding phase, launching its pilot cohort in Q2 2026.
            </p>
          </div>
        </div>

        {/* Founder Bio (short) */}
        <div className="max-w-[900px] mx-auto px-6 md:px-12 pb-16">
          <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-terra flex items-center gap-2.5 mb-5">
            <span className="block w-6 h-px bg-terra" />
            Founder Bio
          </div>
          <div className="flex flex-col gap-4 max-w-[720px]">
            <p className="text-[15px] leading-[1.85] text-ink-soft">
              Jesse Giddings is the Founder and Executive Director of Firsthand Foundation. A former international television host on E! News and MuchMusic, Jesse spent his holidays embedded with Syrian refugees as a humanitarian photographer and worked with WE Charity to facilitate celebrity partnerships and field programs across Kenya and India. He is based in Los Angeles.
            </p>
            <div className="flex items-center gap-6 mt-2">
              <a
                href="mailto:hello@firsthand-foundation.com"
                className="font-mono text-[11px] tracking-[0.1em] text-ink-muted hover:text-terra transition-colors no-underline"
              >
                hello@firsthand-foundation.com
              </a>
              <a
                href="https://instagram.com/jessegiddings"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] tracking-[0.1em] text-ink-muted hover:text-terra transition-colors no-underline"
              >
                @jessegiddings
              </a>
            </div>
          </div>
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
                { label: "Founder", value: "Jesse Giddings" },
                { label: "Founded", value: "2025" },
                { label: "Status", value: "Founding phase — pilot launch Q2 2026" },
                { label: "Structure", value: "Wyoming nonprofit corporation (501(c)(3) pending)" },
                { label: "Pilot Regions", value: "Los Angeles, CA | Eldoret & Nakuru, Kenya | Rajasthan, India" },
                { label: "Platform Fee", value: "5\u20138%" },
                { label: "Press Contact", value: "hello@firsthand-foundation.com" },
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
              <h3 className="font-display text-[22px] font-bold text-white mb-1">Jesse Giddings</h3>
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
