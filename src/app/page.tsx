import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-[#212A31] text-white">
      <h1 className="text-4xl font-bold mb-8">Sanjana Bonagiri</h1>
      <p className="text-xl mb-8">Full Stack Developer | SaaS Innovator | Python Developer</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <Link href="/about" className="p-6 bg-[#2A363F]/80 rounded-xl border border-[#4A5A66] hover:border-[#748D92] transition-all">
          <h2 className="text-2xl font-bold mb-2">About Me</h2>
          <p>Learn more about my background, skills, and expertise.</p>
        </Link>
        
        <Link href="/projects" className="p-6 bg-[#2A363F]/80 rounded-xl border border-[#4A5A66] hover:border-[#748D92] transition-all">
          <h2 className="text-2xl font-bold mb-2">Projects</h2>
          <p>Explore my portfolio of work and recent projects.</p>
        </Link>
        
        <Link href="/experience" className="p-6 bg-[#2A363F]/80 rounded-xl border border-[#4A5A66] hover:border-[#748D92] transition-all">
          <h2 className="text-2xl font-bold mb-2">Experience</h2>
          <p>My professional journey and work experience.</p>
        </Link>
        
        <Link href="/contact" className="p-6 bg-[#2A363F]/80 rounded-xl border border-[#4A5A66] hover:border-[#748D92] transition-all">
          <h2 className="text-2xl font-bold mb-2">Contact</h2>
          <p>Get in touch with me for collaborations or opportunities.</p>
        </Link>
      </div>
      
      <div className="mt-12">
        <p className="text-center text-gray-400">
          This site is deployed on Netlify
        </p>
      </div>
    </main>
  );
} 