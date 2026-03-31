import type { Metadata } from "next";
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

        {/* Body */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
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
            {/* Photo column */}
            {/* Replace with headshot: /images/jesse-giddings.jpg */}
            <div
              className="aspect-[3/4] w-full rounded-[4px] bg-sage flex items-center justify-center relative overflow-hidden"
              data-photo-slot="jesse-giddings"
            >
              <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "128px 128px" }} />
              <span className="font-mono text-white/50 text-xs tracking-[0.15em]">Jesse Giddings</span>
            </div>

            {/* Text column */}
            <div>
              <blockquote className="font-display text-[clamp(22px,2.5vw,32px)] italic text-terra leading-[1.3] mb-8">
                &ldquo;Nobody was watching. That was the point.&rdquo;
              </blockquote>

              <h3 className="font-display text-[28px] font-bold mb-1">Jesse Giddings</h3>
              <p className="text-sm text-ink-muted mb-8">Founder &amp; Executive Director</p>

              <div className="flex flex-col gap-5">
                <p className="text-[15px] leading-[1.85] text-ink-soft">
                  For a decade, Jesse Giddings stood on stages in front of 20,000 people.
                </p>
                <p className="text-[15px] leading-[1.85] text-ink-soft">
                  As an international television host on E! News and MuchMusic, he spent his working life in entertainment — red carpets, celebrity interviews, arenas full of fans. On his holidays, he went somewhere else entirely.
                </p>
                <p className="text-[15px] leading-[1.85] text-ink-soft">
                  While colleagues vacationed, Jesse embedded with Syrian refugees as a humanitarian photographer — traveling with families in migration, documenting what displacement actually looks like at ground level. No network. No crew. Just a camera and his own time.
                </p>
                <p className="text-[15px] leading-[1.85] text-ink-soft">
                  It was WE Charity that first took him to Kenya and India — not as a journalist, but as a guest who could see what donor dollars built. What he found there, and what he&apos;d already seen in Syria, confirmed the same thing: the gap between generosity and accountability wasn&apos;t a people problem. It was a systems problem. Good donors. Real needs. A broken pipe between them.
                </p>
                <p className="text-[15px] leading-[1.85] text-ink-soft">
                  He spent years inside that machinery — coordinating celebrity partnerships for WE Charity, hosting field trips, understanding from the inside exactly where the model fails. Firsthand is what he built when the tools finally existed to fix it.
                </p>
                <p className="text-[15px] leading-[1.85] text-ink-soft">
                  He is based in Los Angeles. He is still going back.
                </p>
              </div>

              {/* Social / Contact row */}
              <div className="flex items-center gap-6 mt-8 pt-6 border-t border-rule">
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
