import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter, Great_Vibes, Nothing_You_Could_Do } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
});

const nothing = Nothing_You_Could_Do({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-nothing",
});

export const metadata: Metadata = {
  title: "Our Story | Will You Be My Valentine? 💕",
  description: "I made something special for you. Click to see our story, one click at a time… 🍊❤️",
  openGraph: {
    title: "Someone special made this for you 💕",
    description: "A love letter wrapped in a little website. Open it… it's for you 🍊❤️",
    images: [
      {
        url: "/images/p1.jpeg",
        width: 1200,
        height: 630,
        alt: "Our Story",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Someone special made this for you 💕",
    description: "A love letter wrapped in a little website. Open it… it's for you 🍊❤️",
    images: ["/images/p1.jpeg"],
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
        suppressHydrationWarning
        className={cn(
          playfair.variable,
          cormorant.variable,
          inter.variable,
          greatVibes.variable,
          nothing.variable,
          "font-sans antialiased bg-cream-bg text-foreground overflow-x-hidden"
        )}
      >
        {children}
      </body>
    </html>
  );
}
