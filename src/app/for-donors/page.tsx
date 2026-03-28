import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EyebrowLabel } from "@/components/ui";
import { DonorWaitlistForm } from "@/components/forms/DonorWaitlistForm";

export default function ForDonorsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <div className="bg-gradient-to-br from-sage to-[#2a3d30] py-24 px-6 md:px-12 text-white text-center">
          <EyebrowLabel className="text-white/50 justify-center" withLine={false}>
            <span className="block w-6 h-px bg-white/50" />
            For Donors
          </EyebrowLabel>
          <h1 className="font-display text-[clamp(40px,6vw,80px)] font-black leading-none tracking-[-0.025em] my-6 text-white">
            Give with certainty.<br />For the first time.
          </h1>
          <p className="text-lg text-white/75 max-w-[520px] mx-auto mb-10 leading-[1.75]">
            Build a verified giving portfolio. Follow every project you fund. Hear directly from the communities your generosity supports.
          </p>
          <DonorWaitlistForm />
        </div>

        {/* Features */}
        <div className="max-w-[1200px] mx-auto py-24 px-6 md:px-12">
          <div className="flex flex-col gap-5 mb-16">
            <EyebrowLabel>What You Get</EyebrowLabel>
            <h2 className="font-display text-display-md">Your giving, transformed.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5 mt-16">
            {[
              { icon: "🗂", title: "Your Impact Portfolio", desc: "Every project you fund lives in your personal dashboard — tracked from first contribution to verified completion. Your giving, organized and alive." },
              { icon: "🛰", title: "Independent Verification", desc: "AI cross-references photo evidence, GPS data, and community testimony at every milestone. You'll know it happened — not because someone told you." },
              { icon: "🎙", title: "Direct Community Voice", desc: "Hear from the people your giving supports — in their own language, translated in real time. Not a spokesperson. Not a press release. Them." },
              { icon: "📍", title: "Browse by Cause & Region", desc: "Filter by geography, cause type, scale, or urgency. Find the projects that align with what you care about — and fund them directly." },
              { icon: "📊", title: "Verified Impact Record", desc: "Receive a permanent, shareable record of everything your giving built — with photos, GPS verification, and community stories attached." },
              { icon: "🤝", title: "For Families & Foundations", desc: "Premium accounts for family offices and foundations include curated portfolios, white-glove reporting, and dedicated community relationship management." },
            ].map((f) => (
              <div key={f.title} className="bg-paper p-8 border-t-[3px] border-rule transition-colors duration-200 hover:border-terra">
                <div className="w-11 h-11 bg-terra-pale rounded-[10px] flex items-center justify-center text-xl mb-5">{f.icon}</div>
                <h3 className="font-display text-xl font-bold mb-2.5">{f.title}</h3>
                <p className="text-[13px] leading-[1.65] text-ink-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
