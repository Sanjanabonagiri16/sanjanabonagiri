import { DockNavigation } from './components/layout/DockNavigation';
import { HeroSection } from './components/sections/HeroSection';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col bg-[#212A31] text-[#D3D9D4] ${inter.className}`}>
      <DockNavigation />
      <HeroSection />
    </main>
  );
}
