"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/for-donors", label: "For Donors" },
  { href: "/for-partners", label: "For Partners" },
  { href: "/why-firsthand", label: "Why Firsthand" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] bg-white/95 backdrop-blur-[12px] border-b border-rule h-16 flex items-center px-6 md:px-12 justify-between">
      <Link
        href="/"
        className="font-display text-[22px] font-black text-ink tracking-[-0.02em] no-underline"
      >
        First<span className="text-terra">hand</span>
      </Link>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-1">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-[13px] font-medium text-ink-soft px-3 py-2 rounded-md transition-all duration-150 tracking-[0.01em] no-underline hover:text-ink hover:bg-paper",
              (pathname === link.href || pathname.startsWith(link.href + "/")) &&
                "text-terra font-semibold"
            )}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/for-donors"
          className="bg-terra text-white text-[13px] font-semibold px-5 py-2.5 rounded-md no-underline transition-colors duration-150 hover:bg-terra-light tracking-[0.01em] ml-2"
        >
          Join Waitlist
        </Link>
      </div>

      {/* Mobile toggle */}
      <button
        className="flex md:hidden flex-col gap-[5px] bg-transparent border-none cursor-pointer p-2"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span className={cn("block w-[22px] h-0.5 bg-ink rounded-sm transition-all duration-200", mobileOpen && "rotate-45 translate-y-[7px]")} />
        <span className={cn("block w-[22px] h-0.5 bg-ink rounded-sm transition-all duration-200", mobileOpen && "opacity-0")} />
        <span className={cn("block w-[22px] h-0.5 bg-ink rounded-sm transition-all duration-200", mobileOpen && "-rotate-45 -translate-y-[7px]")} />
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-rule p-4 flex flex-col gap-1 z-[999] md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "text-[13px] font-medium text-ink-soft px-3.5 py-2 rounded-md transition-all duration-150 no-underline hover:text-ink hover:bg-paper",
                (pathname === link.href || pathname.startsWith(link.href + "/")) &&
                  "text-terra font-semibold"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/for-donors"
            onClick={() => setMobileOpen(false)}
            className="bg-terra text-white text-[13px] font-semibold px-5 py-2.5 rounded-md no-underline transition-colors duration-150 hover:bg-terra-light tracking-[0.01em] mt-2 text-center"
          >
            Join Waitlist
          </Link>
        </div>
      )}
    </nav>
  );
}
