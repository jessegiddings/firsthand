import Link from "next/link";

const platformLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/for-donors", label: "For Donors" },
  { href: "/for-communities", label: "For Communities" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/press", label: "Press" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

const involvedLinks = [
  { href: "/for-donors", label: "Donor Waitlist" },
  { href: "/for-communities", label: "Community Partners" },
  { href: "/contact", label: "Investors" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white pt-16 pb-10 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 pb-12 border-b border-white/10 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-display text-[28px] font-black text-white mb-3 tracking-[-0.02em]">
              First<span className="text-terra">hand</span>
            </h3>
            <p className="text-[13px] text-white/45 leading-[1.7] max-w-[240px]">
              A verified impact platform built on the belief that giving should
              be direct, transparent, and fully accountable.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://linkedin.com/company/firsthand-foundation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="mailto:hello@firsthand-foundation.com"
                className="text-white/40 hover:text-white transition-colors"
                aria-label="Email"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M22 4L12 13 2 4"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 mb-4">
              Platform
            </h4>
            <ul className="flex flex-col gap-2.5">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-white/60 no-underline transition-colors duration-150 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 mb-4">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map((link, i) => (
                <li key={`${link.label}-${i}`}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-white/60 no-underline transition-colors duration-150 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 mb-4">
              Get Involved
            </h4>
            <ul className="flex flex-col gap-2.5">
              {involvedLinks.map((link, i) => (
                <li key={`${link.label}-${i}`}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-white/60 no-underline transition-colors duration-150 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/30 font-mono">
            &copy; {new Date().getFullYear()} Firsthand. All rights reserved.
          </p>
          <p className="text-xs text-white/30 font-mono">
            <a href="mailto:hello@firsthand-foundation.com" className="text-white/30 no-underline hover:text-white/50 transition-colors">
              hello@firsthand-foundation.com
            </a>
          </p>
        </div>
        <p className="text-xs text-[#9A9690] mt-6 max-w-[680px] mx-auto text-center leading-[1.7]">
          Firsthand Foundation is a Wyoming nonprofit corporation. 501(c)(3) tax-exempt status is pending IRS determination. Donations may not be tax-deductible until the determination letter is received.
        </p>
      </div>
    </footer>
  );
}
