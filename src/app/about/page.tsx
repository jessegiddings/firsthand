import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EyebrowLabel } from "@/components/ui";

export const metadata: Metadata = {
  title: "About — Jesse Giddings & Firsthand Foundation",
  description:
    "Jesse Giddings spent a decade as a television host and humanitarian photographer before founding Firsthand — a verified impact giving platform built on the conviction that the tools to close the trust gap in philanthropy finally exist.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <div className="py-24 px-6 md:px-12 max-w-[900px] mx-auto">
          <EyebrowLabel>Our Story</EyebrowLabel>
          <h1 className="font-display text-[clamp(48px,7vw,88px)] font-black leading-[0.95] tracking-[-0.03em] my-6">
            We&apos;ve seen<br />what happens<br />when the system{" "}
            <em className="text-terra italic">fails.</em>
          </h1>
          <p className="text-xl leading-[1.8] text-ink-soft max-w-[640px]">
            Firsthand was founded by people who spent years inside the world&apos;s most ambitious humanitarian organizations — and watched structural failures consistently outpace individual generosity.
          </p>
        </div>

        {/* Organizational Status */}
        <div className="bg-paper py-16 px-6 md:px-12">
          <div className="max-w-[1200px] mx-auto">
            <EyebrowLabel className="mb-5">Status</EyebrowLabel>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: "Wyoming Nonprofit Corp.", status: "confirmed" },
                { label: "EIN Obtained", status: "confirmed" },
                { label: "501(c)(3) Pending", status: "pending" },
                { label: "Stripe Connect", status: "confirmed" },
                { label: "Supabase Live", status: "confirmed" },
                { label: "Gates Foundation App", note: "April 2026", status: "pending" },
              ].map((item) => (
                <div key={item.label} className="p-4 bg-white rounded-lg border border-rule">
                  <div
                    className={`inline-block w-2 h-2 rounded-full mb-2 ${
                      item.status === "confirmed" ? "bg-green" : "bg-amber"
                    }`}
                  />
                  <h4 className="text-[12px] font-semibold text-ink leading-tight">{item.label}</h4>
                  {item.note && <p className="text-[10px] text-ink-muted mt-0.5">{item.note}</p>}
                  <span
                    className={`inline-block font-mono text-[8px] tracking-[0.1em] uppercase mt-1.5 px-1.5 py-0.5 rounded ${
                      item.status === "confirmed" ? "bg-green-bg text-green" : "bg-amber-bg text-amber"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            {[
              "Over more than a decade building schools across Kenya and India, training educators in underserved communities, and documenting the human cost of the Syrian refugee crisis with a camera, our founding team developed a deep conviction: the problem with philanthropy isn't the people. It's the architecture.",
              "Traditional charitable structures were built in a pre-digital world — one without satellites, smartphones, AI, or the ability to transfer money to anyone on earth in seconds. Those structures haven't changed. The world has.",
              "Firsthand is built on a simple premise: technology now makes it possible to connect a donor in Vancouver to a community in Nairobi with complete transparency, real-time verification, and no institutional middleman absorbing 60 cents of every dollar. We're building that infrastructure.",
              "The trust crisis in philanthropy is real. Billions of dollars have been misallocated, misreported, and misused — not always through bad intent, but through bad systems. Firsthand is a systems answer to a systems problem.",
              "We are in the founding phase — onboarding our first community partners across Los Angeles, Kenya, and India, and assembling a founding cohort of donors and corporate partners who believe that giving should be direct, verified, and fully accountable. Our pilot cohort launches Q2 2026.",
            ].map((text, i) => (
              <p key={i} className="text-base leading-[1.85] text-ink-soft mb-6 last:mb-0">
                {text}
              </p>
            ))}
          </div>
          <div className="flex flex-col gap-8">
            {[
              { title: "Founded on the ground", desc: "Our founding experience spans Kenya, India, and the Syrian refugee crisis — over a decade of working inside humanitarian systems and understanding exactly where they break down." },
              { title: "Structure: Hybrid Social Enterprise", desc: "Firsthand operates as a hybrid — a nonprofit arm for grant eligibility and tax receipting, and a for-profit arm to build and operate the technology. The best of both models." },
              { title: "Currently: Founding Phase", desc: "Pilot cohort launching Q2 2026 — verified projects across Los Angeles, Kenya, and India. Founding donors, community partners, and aligned investors can apply to participate now." },
            ].map((block) => (
              <div key={block.title} className="p-8 bg-paper border-t-[3px] border-terra">
                <h4 className="font-display text-lg font-bold mb-2">{block.title}</h4>
                <p className="text-[13px] leading-[1.65] text-ink-soft">{block.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* The Founder */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-24">
          <EyebrowLabel className="mb-8">The Founder</EyebrowLabel>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 items-start">
            {/* Photo placeholder */}
            {/* Replace with headshot: /images/jesse-giddings.jpg */}
            <div
              className="aspect-[3/4] w-full rounded-[4px] bg-sage relative overflow-hidden"
              data-photo-slot="jesse-giddings"
            >
              <Image
                src="/IMG_4403.jpeg"
                alt="Jesse Giddings — Founder & Executive Director of Firsthand Foundation"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
            </div>

            {/* Content */}
            <div>
              <blockquote className="font-display text-[clamp(20px,2.5vw,28px)] italic text-terra leading-[1.35] mb-8">
                &ldquo;The communities I visited in Kenya and India were extraordinary — resourceful, visionary, deeply capable. What they lacked wasn&apos;t ability. It was a trust infrastructure that let the world see it.&rdquo;
              </blockquote>

              <h3 className="font-display text-[28px] font-bold mb-1">Jesse Giddings</h3>
              <p className="text-sm text-ink-muted mb-6">Founder &amp; Executive Director</p>

              <p className="text-[15px] leading-[1.85] text-ink-soft mb-5">
                A philanthropy strategist and connector with 15+ years bridging global humanitarian causes, high-profile donors, and mission-driven partnerships. Jesse hosted national WE Charity events for a decade, standing on stage in front of 20,000 people across Canada while cultivating major donor relationships and leading impact trips to Kenya and India. As a television personality on E! News and MuchMusic and with years in talent management and film production, he developed the storytelling and relationship skills that now drive Firsthand&apos;s model. His documentary photography from the Syrian refugee crisis gave him firsthand exposure to humanitarian work that no boardroom produces. Firsthand is the synthesis of all of it.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {["WE Charity", "10+ years", "E! News", "MuchMusic", "Kenya", "India fieldwork", "Syrian refugee crisis", "IMC", "Talent Management", "Film Production", "@jessegiddings"].map((tag) => (
                  <span key={tag} className="font-mono text-[9px] tracking-[0.1em] uppercase px-2.5 py-1 rounded bg-terra-pale text-terra">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6 pt-6 border-t border-rule">
                <a
                  href="https://instagram.com/jessegiddings"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] tracking-[0.1em] text-ink-muted hover:text-terra transition-colors no-underline flex items-center gap-1.5"
                >
                  @jessegiddings <span className="text-[10px]">&rarr;</span>
                </a>
                <a
                  href="mailto:hello@firsthand-foundation.com"
                  className="font-mono text-[11px] tracking-[0.1em] text-ink-muted hover:text-terra transition-colors no-underline flex items-center gap-1.5"
                >
                  hello@firsthand-foundation.com <span className="text-[10px]">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap Timeline */}
        <div className="bg-paper py-20 px-6 md:px-12">
          <div className="max-w-[800px] mx-auto">
            <EyebrowLabel className="mb-5">Roadmap</EyebrowLabel>
            <h2 className="font-display text-display-md mb-12">Where we are. Where we&apos;re going.</h2>
            <div className="flex flex-col gap-0">
              {[
                { year: "2025", title: "Founded & incorporated", desc: "Wyoming nonprofit, EIN obtained, initial stack deployed to Vercel.", status: "done" as const },
                { year: "Q1 2026", title: "Core platform built", desc: "Application portal, donor matching, Gate 1 AI screening, agent infrastructure.", status: "done" as const },
                { year: "Q2 2026", title: "Pilot partnerships confirmed", desc: "Los Angeles / Kenya / India — founding cohort of community partners onboarded.", status: "current" as const },
                { year: "Q3 2026", title: "Pilot launch", desc: "First live projects, first verified milestones, first community voice reports.", status: "upcoming" as const },
                { year: "2027", title: "Scale & licensing", desc: "AI module licensing, expanded geographies, Gates grant deployment.", status: "future" as const },
              ].map((item, i) => (
                <div key={item.year} className="flex gap-6 items-start">
                  {/* Timeline dot and line */}
                  <div className="flex flex-col items-center flex-shrink-0 w-6">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                        item.status === "done"
                          ? "bg-sage border-sage"
                          : item.status === "current"
                          ? "bg-terra border-terra"
                          : "bg-transparent border-rule"
                      }`}
                    />
                    {i < 4 && <div className="w-px h-16 bg-rule" />}
                  </div>
                  {/* Content */}
                  <div className="pb-8">
                    <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-muted mb-1">
                      {item.year}
                    </div>
                    <h4 className="text-[15px] font-semibold text-ink mb-1">{item.title}</h4>
                    <p className="text-[13px] text-ink-muted leading-[1.6]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-ink py-20 px-6 md:px-12 text-white">
          <div className="max-w-[1200px] mx-auto">
            <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40 flex items-center gap-2.5">
              <span className="block w-6 h-px bg-white/40" />
              What We Believe
            </div>
            <h2 className="font-display text-display-md text-white mt-5 mb-0">
              Our values aren&apos;t a wall poster.<br />They&apos;re the product.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-14">
              {[
                { num: "01", title: "Verification over trust", desc: "We don't ask anyone to take our word for it — or anyone else's. The verification layer exists precisely because trust, without proof, isn't good enough anymore." },
                { num: "02", title: "Community sovereignty", desc: "Communities own their stories, their data, and their needs. Firsthand is infrastructure — not a voice, not a gatekeeper, not a publisher." },
                { num: "03", title: "Radical transparency", desc: "Our fees are public. Our methodology is open. Our outcomes are independently verified. If we can't show our work, we won't make the claim." },
                { num: "04", title: "Systems over symptoms", desc: "Good intentions aren't enough. We're building infrastructure that makes accountability the default — not the exception." },
                { num: "05", title: "Direct over mediated", desc: "Every layer of institutional mediation costs money and loses signal. We're removing layers — not adding them." },
                { num: "06", title: "Sustainable by design", desc: "Firsthand is built to be financially self-sustaining — not dependent on grants or goodwill. Impact that can't sustain itself can't scale." },
              ].map((v) => (
                <div key={v.num}>
                  <div className="font-mono text-[11px] tracking-[0.2em] text-terra mb-3">{v.num}</div>
                  <h3 className="font-display text-[22px] font-bold text-white mb-3">{v.title}</h3>
                  <p className="text-sm leading-[1.7] text-white/55">{v.desc}</p>
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
