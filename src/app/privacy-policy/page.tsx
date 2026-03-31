import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EyebrowLabel } from "@/components/ui";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="py-24 px-6 md:px-12 max-w-[720px] mx-auto">
          <EyebrowLabel>Legal</EyebrowLabel>
          <h1 className="font-display text-display-lg my-6">Privacy Policy</h1>
          <p className="text-sm text-ink-muted mb-12">Last updated: March 2026</p>

          <div className="flex flex-col gap-10">
            <section>
              <h2 className="font-display text-xl font-bold mb-3">1. Who we are</h2>
              <p className="text-[15px] leading-[1.85] text-ink-soft">
                Firsthand Foundation is a Wyoming nonprofit corporation building a verified impact giving platform. You can reach us at{" "}
                <a href="mailto:hello@firsthand-foundation.com" className="text-terra hover:text-terra-light transition-colors">
                  hello@firsthand-foundation.com
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold mb-3">2. What data we collect</h2>
              <ul className="text-[15px] leading-[1.85] text-ink-soft list-disc pl-5 flex flex-col gap-2">
                <li>Email addresses when you join our waitlist</li>
                <li>Application form data submitted by community partners</li>
                <li>Donation and transaction data (when live)</li>
                <li>Basic usage analytics to understand how visitors use the site</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold mb-3">3. How we use it</h2>
              <ul className="text-[15px] leading-[1.85] text-ink-soft list-disc pl-5 flex flex-col gap-2">
                <li>To match donors with verified community projects</li>
                <li>To process and review community partner applications</li>
                <li>To send milestone updates and platform notifications</li>
                <li>To improve the platform experience</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold mb-3">4. What we don&apos;t do</h2>
              <p className="text-[15px] leading-[1.85] text-ink-soft">
                We never sell your data. We never share community partner data without explicit consent. We do not monetize personal information in any way.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold mb-3">5. Cookies</h2>
              <p className="text-[15px] leading-[1.85] text-ink-soft">
                We use basic analytics cookies to understand site usage. We do not use advertising cookies, tracking pixels, or any third-party marketing tools.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold mb-3">6. Your rights</h2>
              <p className="text-[15px] leading-[1.85] text-ink-soft">
                You have the right to access, correct, or delete your personal data at any time. To make a request, email{" "}
                <a href="mailto:hello@firsthand-foundation.com" className="text-terra hover:text-terra-light transition-colors">
                  hello@firsthand-foundation.com
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold mb-3">7. Data retention</h2>
              <p className="text-[15px] leading-[1.85] text-ink-soft">
                Waitlist data is held until you unsubscribe. Donation records are retained per IRS requirements (7 years). All other data is deleted upon request.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold mb-3">8. Contact</h2>
              <p className="text-[15px] leading-[1.85] text-ink-soft">
                Questions about this policy? Reach us at{" "}
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
