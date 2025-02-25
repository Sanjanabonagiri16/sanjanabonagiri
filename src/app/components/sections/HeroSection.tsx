'use client';

import { motion } from "framer-motion";
import { Playfair_Display } from 'next/font/google';
import { Button } from '../ui/Button';
import Link from 'next/link';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const playfair = Playfair_Display({ subsets: ['latin'] });

const socialIcons = [
  { 
    Icon: Github, 
    href: 'https://github.com/Sanjanabonagiri16',
    className: 'bg-[#333333]/10 hover:bg-[#333333]/20' 
  },
  { 
    Icon: Linkedin, 
    href: 'https://linkedin.com/in/Sanjana-Bonagiri',
    className: 'bg-[#0077B5]/10 hover:bg-[#0077B5]/20' 
  },
  { 
    Icon: Mail, 
    href: 'mailto:bonagirisanjana1116@gmail.com',
    className: 'bg-[#EA4335]/10 hover:bg-[#EA4335]/20' 
  },
];

const allSkills = [
  // Programming Languages
  "Python", "Java", "HTML", "CSS", "JavaScript", "TypeScript",
  // Frameworks & Libraries
  "React.js", "Next.js", "Node.js", "Tailwind CSS", "Express.js",
  // AI & Machine Learning
  "Generative AI", "Natural Language Processing (NLP)", "Prompt Engineering",
  // Cloud Technologies
  "Microsoft Azure", "Cloud Computing", "AWS", "Firebase",
  // Databases
  "MongoDB", "PostgreSQL", "SQL", "DBMS", "Redis",
  // Tools & Technologies
  "Git", "Docker", "GraphQL", "Kubernetes", "Power BI",
  // Other Skills
  "Robotic Process Automation (RPA)", "Digital Marketing"
];

export function HeroSection() {
  return (
    <section className="min-h-[calc(100vh-7rem)] px-6 lg:px-20 flex flex-col justify-between relative">
      <div className="w-full flex-1 flex flex-col">
        {/* Welcome Message - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mx-auto max-w-3xl mb-20"
        >
          <h2 className={`${playfair.className} text-3xl lg:text-4xl font-bold mb-6 text-[#D3D9D4]`}>
            Welcome to my digital workspace
          </h2>
          <p className="text-lg lg:text-xl text-[#748D92] font-light leading-relaxed">
            Where innovation meets functionality. I specialize in developing scalable, high-performance solutions that drive business growth and enhance user experiences.
          </p>
        </motion.div>

        {/* Main Content - Left Aligned */}
        <div className="max-w-2xl mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-5">
              <h1 className={`${playfair.className} text-4xl lg:text-6xl font-bold tracking-tight text-[#D3D9D4] leading-[1.2]`}>
                Full Stack Developer 
                <span className="inline-flex items-center gap-x-4">
                  <span className="text-[#124E66] font-serif italic text-3xl lg:text-5xl">&</span>
                  Python Developer
                </span>
                <span className="block text-2xl lg:text-3xl font-normal text-[#748D92] mt-2">SaaS Innovator</span>
              </h1>
              <p className="text-base lg:text-lg text-[#748D92] leading-relaxed font-light">
                With expertise in full-stack development, SaaS solutions, and AI integration, I specialize in building scalable applications, optimizing performance, and delivering exceptional user experiences. From concept to deployment, I leverage cutting-edge technologies to create innovative and efficient digital solutions.
              </p>
            </div>
            
            {/* Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center gap-x-5"
            >
              <Button asChild size="lg" className="bg-[#124E66] text-[#D3D9D4] hover:bg-[#2E3944] transition-colors duration-300 text-base font-medium px-6 py-5 rounded-full">
                <Link href="#projects">View Projects →</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-[#748D92] text-[#D3D9D4] hover:bg-[#2E3944] transition-colors duration-300 text-base font-medium px-6 py-5 rounded-full">
                <Link href="#contact">Contact Me</Link>
              </Button>
            </motion.div>

            {/* Social Links - Icons Only */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center gap-4 mt-8"
            >
              {socialIcons.map(({ Icon, href, className }) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center justify-center p-3 rounded-full transition-all duration-300",
                    "backdrop-blur-sm",
                    className
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5 text-[#D3D9D4]" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Tech Stack Marquee - Full Width */}
      <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <div className="overflow-hidden py-6 bg-gradient-to-r from-[#1a1a1a]/80 via-[#2E3944]/80 to-[#1a1a1a]/80 backdrop-blur-sm">
          <motion.div
            className="whitespace-nowrap"
            animate={{
              x: [0, -4000],
            }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...Array(3)].map((_, i) => (
              <span key={i} className="inline-block">
                {allSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center text-[#D3D9D4] mx-4 text-base font-medium"
                  >
                    • {skill}
                  </span>
                ))}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Featured Project - New Style */}
      <div className="w-full flex flex-col items-center text-center mt-32 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-5xl"
        >
          {/* Featured Project Label */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2">
            <span className="bg-[#0047AB] text-white px-6 py-2 rounded-full text-sm font-medium uppercase tracking-wider">
              Featured Project
            </span>
          </div>

          {/* Project Content */}
          <div className="bg-black/20 backdrop-blur-sm text-white p-12 rounded-3xl border border-white/10">
            <h2 className="text-6xl font-bold mb-4">HopeFund</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              The #1 crowdfunding platform designed to connect donors with meaningful causes.
            </p>
            <p className="text-lg text-gray-400 mb-12">
              Transform your life with our intuitive progress tracking and powerful features.
            </p>

            {/* Project Image */}
            <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/portfolio-project.png"
                alt="HopeFund Project Screenshot"
                width={1200}
                height={675}
                className="w-full h-auto object-cover"
                priority
                quality={100}
                unoptimized={true}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-6">
              <motion.a
                href="https://hopefund.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try HopeFund Now!
              </motion.a>
              <motion.a
                href="https://github.com/Sanjanabonagiri16/hopefund"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all flex items-center gap-2 border border-white/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5" />
                View Source Code
              </motion.a>
            </div>
          </div>

          {/* Creator Info */}
          <div className="mt-6 text-gray-400 text-sm">
            Created by Sanjana Bonagiri. Open source and available on GitHub.
          </div>
        </motion.div>
      </div>

      {/* Trusted by Industry Leaders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl mx-auto text-center mt-16 mb-16"
      >
        <h2 className={`${playfair.className} text-3xl font-bold mb-4 text-[#D3D9D4]`}>
          Trusted by Industry Leaders
        </h2>
        <p className="text-lg text-[#748D92] mb-8">
          Partnering with forward-thinking companies to create exceptional digital experiences
        </p>

        {/* Company Logos */}
        <div className="flex justify-center items-center gap-12 mb-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-[#D3D9D4] text-xl font-semibold backdrop-blur-sm bg-white/5 px-8 py-4 rounded-xl border border-white/10"
          >
            DexproSolutions
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-[#D3D9D4] text-xl font-semibold backdrop-blur-sm bg-white/5 px-8 py-4 rounded-xl border border-white/10"
          >
            Innobytes Services
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Link 
            href="#contact"
            className="bg-[#124E66] text-[#D3D9D4] px-10 py-4 rounded-full text-lg font-medium hover:bg-[#2E3944] transition-all duration-300 inline-flex items-center gap-2"
          >
            Start Your Project
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Stay Updated Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl mx-auto text-center mt-16 mb-16"
      >
        <h2 className={`${playfair.className} text-3xl font-bold mb-4 text-[#D3D9D4]`}>
          Stay Updated
        </h2>
        <p className="text-lg text-[#748D92] mb-8">
          Subscribe to get notified about new tools and updates.
        </p>

        {/* Email Subscription Form */}
        <form className="flex gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-6 py-4 rounded-full bg-white/5 border border-white/10 text-[#D3D9D4] placeholder:text-[#748D92] focus:outline-none focus:ring-2 focus:ring-[#124E66] backdrop-blur-sm"
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-[#124E66] text-[#D3D9D4] px-8 py-4 rounded-full font-medium hover:bg-[#2E3944] transition-all duration-300"
          >
            Subscribe
          </motion.button>
        </form>
        <p className="text-sm text-[#748D92] mt-4">
          Your email will be kept confidential and secure.
        </p>
      </motion.div>

      {/* Footer Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-gradient-to-b from-transparent via-black/30 to-black/40 border-t border-white/10 mt-16 backdrop-blur-lg"
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#124E66]/10 to-transparent"/>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#124E66]/10 to-transparent"/>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            {/* Personal Info - Spans 5 columns */}
            <div className="md:col-span-5 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6"
              >
                <h3 className={`${playfair.className} text-3xl font-bold text-[#D3D9D4] mb-4`}>
                  Sanjana Bonagiri
                </h3>
                <p className="text-[#748D92] text-lg leading-relaxed">
                  Full Stack Developer & SaaS Specialist. Building scalable web applications and tools for developers and financial planning.
                </p>
                <div className="pt-6 border-t border-white/10">
                  <p className="text-[#D3D9D4] font-medium mb-2">Get in touch</p>
                  <a 
                    href="mailto:bonagirisanjana1116@gmail.com" 
                    className="text-[#748D92] hover:text-[#D3D9D4] transition-colors inline-flex items-center gap-2 group"
                  >
                    <Mail className="w-4 h-4 group-hover:text-[#EA4335]" />
                    bonagirisanjana1116@gmail.com
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Quick Links - Spans 4 columns */}
            <div className="md:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-8"
              >
                <h3 className={`${playfair.className} text-2xl font-bold text-[#D3D9D4] mb-6`}>
                  Quick Links
                </h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  {[
                    { name: 'About', href: '#about' },
                    { name: 'Projects', href: '#projects' },
                    { name: 'Services', href: '#services' },
                    { name: 'Blog', href: '#blog' },
                    { name: 'Contact', href: '#contact' },
                    { name: 'All Tools', href: '/tools' },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-[#748D92] hover:text-[#D3D9D4] transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2 group text-base"
                    >
                      <span className="h-px w-4 bg-[#748D92] group-hover:w-6 group-hover:bg-[#D3D9D4] transition-all duration-300"/>
                      {link.name}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Connect - Spans 3 columns */}
            <div className="md:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-8"
              >
                <h3 className={`${playfair.className} text-2xl font-bold text-[#D3D9D4] mb-6`}>
                  Connect
                </h3>
                <div className="flex gap-4">
                  {socialIcons.map(({ Icon, href, className }) => (
                    <motion.a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "flex items-center justify-center p-4 rounded-xl transition-all duration-300",
                        "backdrop-blur-sm hover:shadow-lg hover:shadow-white/10",
                        "border border-white/5 hover:border-white/20",
                        className
                      )}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-6 h-6 text-[#D3D9D4]" />
                    </motion.a>
                  ))}
                </div>
                <p className="text-[#748D92] text-sm leading-relaxed">
                  Follow me on social media for updates and insights into my latest projects and tech innovations.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-6">
                <p className="text-[#748D92] text-sm">
                  © {new Date().getFullYear()} Sanjana Bonagiri
                </p>
                <span className="h-4 w-px bg-white/10 hidden md:block"/>
                <p className="text-[#748D92] text-sm hidden md:block">
                  All rights reserved
                </p>
              </div>
              <div className="flex items-center gap-8 text-sm">
                <Link href="/privacy" className="text-[#748D92] hover:text-[#D3D9D4] transition-colors">Privacy Policy</Link>
                <span className="h-4 w-px bg-white/10"/>
                <Link href="/terms" className="text-[#748D92] hover:text-[#D3D9D4] transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
} 