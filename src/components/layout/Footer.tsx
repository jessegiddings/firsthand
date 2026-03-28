import Link from "next/link";

const platformLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/for-donors", label: "For Donors" },
  { href: "/for-communities", label: "For Communities" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/contact", label: "Partner With Us" },
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
            hello@firsthand-foundation.com
          </p>
        </div>
      </div>
    </footer>
  );
}
