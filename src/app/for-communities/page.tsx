import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EyebrowLabel, Button } from "@/components/ui";

export default function ForCommunitiesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#8b3a1a] via-terra to-[#e87a4a] py-24 px-6 md:px-12 text-white text-center">
          <EyebrowLabel className="text-white/50 justify-center" withLine={false}>
            <span className="block w-6 h-px bg-white/50" />
            For Communities
          </EyebrowLabel>
          <h1 className="font-display text-[clamp(40px,6vw,80px)] font-black leading-none tracking-[-0.025em] my-6 text-white">
            Your need.<br />Your story.<br />Your terms.
          </h1>
          <p className="text-lg text-white/80 max-w-[520px] mx-auto mb-10 leading-[1.75]">
            Firsthand connects verified community needs directly to aligned donors — with full ownership of your data, your narrative, and your future.
          </p>
          <Link href="/contact">
            <Button variant="white" arrow>Become a Partner</Button>
          </Link>
        </div>

        {/* Principles */}
        <div className="max-w-[1200px] mx-auto py-24 px-6 md:px-12">
          <div className="flex flex-col gap-5 mb-16">
            <EyebrowLabel>Our Commitments</EyebrowLabel>
            <h2 className="font-display text-display-md">
              Built around communities.<br />Not about them.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 mt-16">
            {[
              { num: "01", title: "You define the need", desc: "Firsthand doesn't tell communities what they need. We provide the platform and infrastructure to surface needs that communities themselves identify and articulate — on their own terms." },
              { num: "02", title: "You own your story", desc: "All content, voice recordings, photographs, and documentation submitted through Firsthand remain the intellectual property of the community. We are a platform, not a publisher." },
              { num: "03", title: "You own your data", desc: "Community need data, outcome data, and any aggregate intelligence derived from your participation is owned by you. Firsthand never sells community data without explicit, ongoing consent." },
              { num: "04", title: "Verification works with you", desc: "Our AI verification system is designed to support communities — not audit them in a punitive way. The process is collaborative, transparent, and built with community partners from day one." },
              { num: "05", title: "Funds released on your milestones", desc: "Milestone structures are agreed upon with each community partner before launch. We don't impose arbitrary benchmarks — we build the verification structure around the reality of your project." },
              { num: "06", title: "Long-term relationship, not transaction", desc: "Firsthand isn't a one-time funding mechanism. We're building long-term relationships between communities and aligned donors — with the goal of sustained, self-directed development." },
            ].map((p) => (
              <div key={p.num} className="p-10 bg-paper border-l-4 border-transparent transition-colors duration-200 hover:border-terra">
                <div className="font-mono text-[10px] tracking-[0.2em] text-terra mb-4">{p.num}</div>
                <h3 className="font-display text-[22px] font-bold mb-3">{p.title}</h3>
                <p className="text-[13px] leading-[1.65] text-ink-muted">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Apply CTA */}
          <div className="mt-16 bg-terra-pale p-12 border-l-4 border-terra">
            <EyebrowLabel className="mb-5">Apply to Partner</EyebrowLabel>
            <h3 className="font-display text-[28px] font-bold mb-4">Is your organization a fit?</h3>
            <p className="text-[15px] leading-[1.7] text-ink-soft max-w-[600px] mb-7">
              We&apos;re onboarding our first cohort of community partners across Kenya, Canada, and India. If you&apos;re a local organization, cooperative, or community group with a verified need — we want to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link href="/apply">
                <Button variant="primary" arrow>Apply to Partner</Button>
              </Link>
              <Link href="/contact" className="text-[13px] text-terra font-semibold no-underline hover:text-terra-light transition-colors inline-flex items-center gap-1.5 py-3.5">
                Have questions? Get in touch &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
