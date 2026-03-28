import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EyebrowLabel, Button } from "@/components/ui";

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <div className="bg-paper py-24 px-6 md:px-12 text-center">
          <div className="flex flex-col items-center gap-5 max-w-[640px] mx-auto">
            <EyebrowLabel className="justify-center">The Model</EyebrowLabel>
            <h1 className="font-display text-display-lg">How Firsthand works</h1>
            <p className="text-lg leading-[1.75] text-ink-soft max-w-[560px]">
              Every dollar has a journey. For the first time, you can follow it — verified at every step.
            </p>
          </div>
        </div>

        {/* Flow blocks */}
        <div className="max-w-[800px] mx-auto py-20 px-6 md:px-12">
          {[
            {
              num: "01",
              eyebrow: "Community Layer",
              title: "A need is identified and submitted",
              paragraphs: [
                "Verified local partners — community leaders, cooperatives, and pre-screened field organizations — submit specific, human-scale needs through the Firsthand platform.",
                "Every submission includes location data, photographs, community context, and a defined scope with milestone breakpoints. No vague program descriptions. No institutional wish lists.",
              ],
              detail: "Partners are vetted through a multi-step verification process including community references, field visits, and organizational history review.",
            },
            {
              num: "02",
              eyebrow: "Donor Layer",
              title: "Donors fund what they actually care about",
              paragraphs: [
                "Individuals, family offices, and corporate partners browse real projects and fund them directly. Donors can search by region, cause type, or community — and see exactly what their money will do before committing.",
                "Funds are held in escrow and released in milestone tranches — not transferred to organizations upfront. If a milestone isn't verified, funds do not release.",
              ],
              detail: "Corporate partners receive branded campaign assets and a verified impact narrative for CSR reporting and social communications.",
            },
            {
              num: "03",
              eyebrow: "AI Verification Layer",
              title: "AI independently verifies completion",
              paragraphs: [
                "At each milestone, the community partner submits field evidence. Our AI verification engine cross-references photo metadata, GPS coordinates, timestamped documentation, and community testimony.",
                "Verification is entirely independent — no self-reporting, no assumed completion. If evidence is insufficient, the system flags it for human review before any funds are released.",
              ],
              detail: "Where available, satellite imagery and sensor data provide an additional independent verification layer beyond submitted evidence.",
            },
            {
              num: "04",
              eyebrow: "Story Layer",
              title: "The story returns to the donor — and the world",
              paragraphs: [
                "Donors receive a verified, living impact record — including before-and-after documentation, community voice recordings (translated where needed), and a permanent verification certificate.",
                "Stories are built for authentic social sharing — because a verified story is the most powerful fundraising tool ever created, and the community deserves credit for what they built.",
              ],
              detail: "All community stories are owned by the community. Firsthand provides the platform and the distribution — communities retain their narrative rights.",
            },
          ].map((block, i) => (
            <div
              key={block.num}
              className={`grid grid-cols-1 sm:grid-cols-[80px_1fr] gap-8 py-12 ${
                i < 3 ? "border-b border-rule" : ""
              } items-start`}
            >
              <div className="font-display text-[64px] font-black text-dust leading-none pt-1 hidden sm:block">
                {block.num}
              </div>
              <div>
                <EyebrowLabel className="mb-4">{block.eyebrow}</EyebrowLabel>
                <h3 className="font-display text-[28px] font-bold mb-3">{block.title}</h3>
                {block.paragraphs.map((p, j) => (
                  <p key={j} className="text-[15px] leading-[1.75] text-ink-soft mb-4">
                    {p}
                  </p>
                ))}
                <div className="bg-paper border-l-[3px] border-terra py-4 px-5 text-[13px] text-ink-soft leading-[1.65] mt-2 font-mono">
                  {block.detail}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-paper py-20 px-6 md:px-12">
          <div className="max-w-[900px] mx-auto">
            <div className="flex flex-col gap-5 mb-16">
              <EyebrowLabel>The Difference</EyebrowLabel>
              <h2 className="font-display text-display-md">Firsthand vs. Traditional Philanthropy</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="p-4 text-left font-mono text-[10px] tracking-[0.2em] uppercase border-b-2 border-rule">Category</th>
                    <th className="p-4 text-left font-mono text-[10px] tracking-[0.2em] uppercase border-b-2 border-rule">Traditional Charity</th>
                    <th className="p-4 text-left font-mono text-[10px] tracking-[0.2em] uppercase border-b-2 border-rule text-terra">Firsthand</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Overhead", "40–70% of donation", "5–8% platform fee"],
                    ["Impact reporting", "Self-reported, annually", "AI-verified, real-time"],
                    ["Fund release", "Upfront to organization", "Escrow, milestone-gated"],
                    ["Donor visibility", "Annual newsletter", "Live project feed + verified record"],
                    ["Community voice", "Filtered through organization", "Direct, translated, community-owned"],
                    ["Data ownership", "Owned by NGO", "Owned by community"],
                    ["Trust model", "Assumed", "Architecturally built-in"],
                  ].map(([cat, trad, fh]) => (
                    <tr key={cat}>
                      <td className="p-4 border-b border-rule text-ink-muted text-[13px]">{cat}</td>
                      <td className="p-4 border-b border-rule text-ink-soft">{trad}</td>
                      <td className="p-4 border-b border-rule text-terra font-medium">{fh}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-20 px-6 md:px-12">
          <h2 className="font-display text-display-md mb-5">Ready to give differently?</h2>
          <p className="text-lg leading-[1.75] text-ink-soft mb-10 max-w-[480px] mx-auto">
            Join the waitlist and be among the first to experience verified giving.
          </p>
          <Link href="/for-donors">
            <Button variant="primary" arrow>Join the Donor Waitlist</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
