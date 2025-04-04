import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

/**
 * Root layout component that wraps all pages
 */
export const metadata: Metadata = {
  title: 'Sirjan Singh | Portfolio',
  description: 'Personal portfolio website showcasing my projects, skills, and experience.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
