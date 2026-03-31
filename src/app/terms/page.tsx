import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EyebrowLabel } from "@/components/ui";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="py-24 px-6 md:px-12 max-w-[720px] mx-auto">
          <EyebrowLabel>Legal</EyebrowLabel>
          <h1 className="font-display text-display-lg my-6">Terms of Service</h1>
          <p className="text-sm text-ink-muted mb-12">Last updated: March 2026</p>

          <div className="flex flex-col gap-10">
            <section>
              <h2 className="font-display text-xl font-bold mb-3">1. Acceptance of terms</h2>
              <p className="text-[15px] leading-[1.85] text-ink-soft">
                By accessing or using the Firsthand platform, you agree to be bound by these terms. If you do not agree, please do not use the platform.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold mb-3">2. What Firsthand is</h2>
              <p className="text-[15px] leading-[1.85] text-ink-soft">
                Firsthand Foundation is a platform that facilitates direct giving between donors and verified community projects. We are infrastructure — not a charity that directly operates programs. We connect, verify, and facilitate. The projects themselves are owned and operated by community partners.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold mb-3">3. Donations</h2>
              <p className="text-[15px] leading-[1.85] text-ink-soft">
                Donations made through Firsthand are held as restricted funds pending our 501(c)(3) determination. Funds are held in escrow and released to community partners only upon verified completion of agreed-upon milestones. Our platform fee is 5–8%, disclosed before any transaction.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold mb-3">4. Refund policy</h2>
              <p className="text-[15px] leading-[1.85] text-ink-soft">
                If a project fails to meet its verified milestones, donors are entitled to a refund of any unreleased escrow funds. Funds that have already been released upon successful milestone verification are not refundable.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold mb-3">5. Partner obligations</h2>
              <p className="text-[15px] leading-[1.85] text-ink-soft">
                Community partners agree to milestone definitions, evidence submission requirements, and community data ownership terms before their projects are listed on the platform. Partners are responsible for accurate representation of their needs and timely submission of verification evidence.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold mb-3">6. No guarantees</h2>
              <p className="text-[15px] leading-[1.85] text-ink-soft">
                Firsthand verifies evidence of milestone completion. We do not guarantee project outcomes. International development and community work are inherently uncertain. Our verification system is designed to maximize accountability, not to eliminate the realities of complex work in challenging environments.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold mb-3">7. Intellectual property</h2>
              <p className="text-[15px] leading-[1.85] text-ink-soft">
                Community partners retain full ownership of their stories, photographs, voice recordings, and all content submitted through the platform. Firsthand is granted a license to display this content on the platform for the purpose of connecting communities with donors.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold mb-3">8. Governing law</h2>
              <p className="text-[15px] leading-[1.85] text-ink-soft">
                These terms are governed by the laws of the State of Wyoming, USA.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold mb-3">9. Contact</h2>
              <p className="text-[15px] leading-[1.85] text-ink-soft">
                Questions about these terms? Reach us at{" "}
                <a href="mailto:hello@firsthand-foundation.com" className="text-terra hover:text-terra-light transition-colors">
                  hello@firsthand-foundation.com
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
