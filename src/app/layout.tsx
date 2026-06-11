import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
});

/**
 * Root layout component that wraps all pages
 */
export const metadata: Metadata = {
  title: "Sirjan Singh | Systems & ML Engineer",
  description:
    "CS @ University of Washington. Incoming SDE Intern @ AWS and ML Engineer Intern @ Expedia Group. Systems programming, distributed systems, and machine learning.",
  keywords: [
    "Sirjan Singh",
    "Software Engineer",
    "Systems Programming",
    "Machine Learning",
    "University of Washington",
    "Distributed Systems",
  ],
  openGraph: {
    title: "Sirjan Singh | Systems & ML Engineer",
    description:
      "CS @ University of Washington. Incoming SDE Intern @ AWS and ML Engineer Intern @ Expedia Group.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} ${jetbrainsMono.variable} bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
