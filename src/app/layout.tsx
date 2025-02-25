import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sanjana Bonagiri - Full Stack Developer",
  description: "Full Stack Developer, SaaS Innovator, & Python Developer. Building scalable web applications and tools for developers and financial planning.",
  keywords: ["Full Stack Developer", "SaaS", "Python", "Web Development", "Portfolio"],
  authors: [{ name: "Sanjana Bonagiri" }],
  creator: "Sanjana Bonagiri",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} antialiased bg-[#212A31] text-[#D3D9D4] selection:bg-gray-900 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
