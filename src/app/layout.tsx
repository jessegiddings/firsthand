import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Firsthand — Verified Impact Platform",
  description:
    "Firsthand connects donors directly to verified community needs. No opaque institutions. No self-reported impact. AI-verified, milestone-gated, community-owned.",
  openGraph: {
    title: "Firsthand — Verified Impact Platform",
    description:
      "Give with certainty. Funds held in escrow, released only when AI independently verifies milestone completion.",
    url: "https://www.firsthand-foundation.com",
    siteName: "Firsthand Foundation",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Firsthand — Verified Impact Platform",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Firsthand — Verified Impact Platform",
    description:
      "Give with certainty. Funds held in escrow, released only when AI independently verifies milestone completion.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
