import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/forms/ContactForm";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="min-h-[calc(100vh-64px)] grid grid-cols-1 lg:grid-cols-2">
          {/* Left */}
          <div className="bg-terra text-white p-16 md:p-20 flex flex-col justify-center gap-8">
            <div>
              <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/50 flex items-center gap-2.5">
                <span className="block w-6 h-px bg-white/50" />
                Get In Touch
              </div>
              <h1 className="font-display text-[clamp(36px,4vw,56px)] font-black leading-[1.05] tracking-[-0.02em] mt-4">
                Let&apos;s build this together.
              </h1>
            </div>
            <p className="text-base leading-[1.75] opacity-85 max-w-[380px]">
              Whether you&apos;re a potential donor partner, a corporate CSR team, a community organization, or an aligned investor — we want to hear from you.
            </p>
            <div className="flex flex-col gap-4 pt-4 border-t border-white/20">
              <div className="flex items-center gap-3 text-sm opacity-80">
                <span className="text-lg">✉</span>
                hello@firsthand-foundation.com
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="bg-white p-16 md:p-20 flex flex-col justify-center">
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
