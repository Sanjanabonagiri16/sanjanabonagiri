'use client';

import { motion } from "framer-motion";
import { Playfair_Display } from 'next/font/google';
import { DockNavigation } from '../components/layout/DockNavigation';
import Image from 'next/image';
import { 
  Code, 
  ExternalLink, 
  Github, 
  Star, 
  GitFork, 
  ArrowRight,
  Globe,
  Sparkles,
  Layers
} from 'lucide-react';
import Link from 'next/link';

const playfair = Playfair_Display({ subsets: ['latin'] });

const featuredProject = {
  title: "HopeFund",
  description: "A crowdfunding platform built with Next.js and Solidity, enabling transparent and decentralized fundraising for social causes.",
  image: "/hopefund.png",
  liveUrl: "https://hopefund.vercel.app",
  githubUrl: "https://github.com/sanjana-19o8/hopefund",
  technologies: ["Next.js", "Solidity", "Ethereum", "Web3.js", "Tailwind CSS"],
  gradient: "from-blue-500/20 to-cyan-500/20"
};

const otherProjects = [
  {
    title: "Subscription & Expense Manager",
    description: "A comprehensive web application for tracking subscriptions and managing expenses with analytics and reminders.",
    githubUrl: "https://github.com/sanjana-19o8/Subscription-Manager",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Chart.js"],
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    title: "Small Hospital Management System",
    description: "A hospital management system with patient records, appointment scheduling, and billing management.",
    githubUrl: "https://github.com/sanjana-19o8/Small-Hospital-Management-System",
    technologies: ["Python", "MySQL", "Tkinter"],
    gradient: "from-amber-500/20 to-red-500/20"
  },
  {
    title: "Esports Tournament Management",
    description: "A platform for organizing and managing esports tournaments with team registration and bracket generation.",
    githubUrl: "https://github.com/sanjana-19o8/Esports-Tournament-Management",
    technologies: ["PHP", "MySQL", "Bootstrap", "jQuery"],
    gradient: "from-green-500/20 to-emerald-500/20"
  },
  {
    title: "AI-Powered Code Comment Generator",
    description: "An AI tool that automatically generates meaningful comments for code using natural language processing.",
    githubUrl: "https://github.com/sanjana-19o8/Code-Comment-Generator",
    technologies: ["Python", "OpenAI API", "NLP", "Flask"],
    gradient: "from-indigo-500/20 to-violet-500/20"
  }
];

const openSourceContributions = [
  {
    title: "NeuroLink-AI",
    description: "Contributed to an open-source AI project focused on neural network visualization and analysis.",
    githubUrl: "https://github.com/sanjana-19o8/NeuroLink-AI",
    technologies: ["Python", "TensorFlow", "D3.js", "React"],
    stars: 45,
    forks: 12,
    gradient: "from-rose-500/20 to-orange-500/20"
  },
  {
    title: "AestheticaVerse",
    description: "An open-source project for AI-powered image generation and style transfer.",
    githubUrl: "https://github.com/sanjana-19o8/AestheticaVerse",
    technologies: ["Python", "PyTorch", "FastAPI", "React"],
    stars: 32,
    forks: 8,
    gradient: "from-teal-500/20 to-cyan-500/20"
  }
];

export default function Projects() {
  return (
    <main className="flex min-h-screen flex-col bg-[#212A31] text-[#E5E9E6] overflow-hidden">
      <DockNavigation />
      
      <motion.section 
        className="py-12 px-6 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute w-[500px] h-[500px] -top-20 -right-20 bg-[#124E66]/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute w-[500px] h-[500px] top-1/2 -left-20 bg-[#124E66]/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.2, 0.3]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-block">
              <motion.div
                className="relative inline-block"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl" />
                <span className="relative bg-[#1A6F94] text-white px-4 py-1 rounded-full text-sm font-medium">
                  Projects
                </span>
              </motion.div>
            </div>
            
            <h1 className={`${playfair.className} text-4xl lg:text-5xl font-bold mt-6 mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent`}>
              Featured Work
            </h1>
            <p className="text-lg text-[#748D92] max-w-2xl mx-auto">
              Showcasing innovative projects and contributions to the developer community.
            </p>
          </motion.div>

          {/* Featured Project */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-20"
          >
            <div className={`bg-[#2A363F]/80 backdrop-blur-sm rounded-2xl p-8 border border-[#4A5A66] hover:border-[#748D92] transition-all duration-500 group hover:shadow-[0_0_2rem_0_rgba(26,111,148,0.1)] relative overflow-hidden`}>
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-r ${featuredProject.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative flex flex-col lg:flex-row gap-8">
                {/* Project Image */}
                <div className="lg:w-1/2">
                  <div className="relative aspect-video rounded-xl overflow-hidden">
                    <Image 
                      src={featuredProject.image} 
                      alt={featuredProject.title}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                    <div className="absolute inset-0 bg-[#124E66]/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                </div>

                {/* Project Info */}
                <div className="lg:w-1/2">
                  <h2 className="text-3xl font-bold text-[#E5E9E6] group-hover:text-white transition-colors duration-300 mb-4 flex items-center gap-3">
                    {featuredProject.title}
                    <Sparkles className="w-6 h-6 text-[#1A6F94]" />
                  </h2>

                  <p className="text-[#E5E9E6] mb-6 group-hover:text-white transition-colors duration-300">
                    {featuredProject.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {featuredProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="flex items-center gap-1 bg-[#124E66]/20 text-[#E5E9E6] px-3 py-1.5 rounded-full text-sm group-hover:bg-[#124E66]/40 group-hover:text-white transition-all duration-300"
                      >
                        <Code className="w-3 h-3" />
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Link
                      href={featuredProject.liveUrl}
                      target="_blank"
                      className="flex items-center gap-2 bg-[#1A6F94] hover:bg-[#124E66] text-white px-4 py-2 rounded-lg transition-colors duration-300"
                    >
                      <Globe className="w-4 h-4" />
                      Live Demo
                    </Link>
                    <Link
                      href={featuredProject.githubUrl}
                      target="_blank"
                      className="flex items-center gap-2 bg-[#2A363F] hover:bg-[#212A31] text-[#E5E9E6] px-4 py-2 rounded-lg border border-[#4A5A66] transition-colors duration-300"
                    >
                      <Github className="w-4 h-4" />
                      View Code
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Other Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-20"
          >
            <h2 className={`${playfair.className} text-2xl font-bold mb-8 flex items-center gap-3`}>
              <Layers className="w-6 h-6 text-[#1A6F94]" />
              Other Notable Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="group relative"
                >
                  <div className={`h-full bg-[#2A363F]/80 backdrop-blur-sm rounded-xl p-6 border border-[#4A5A66] hover:border-[#748D92] transition-all duration-500 hover:shadow-[0_0_2rem_0_rgba(26,111,148,0.1)] relative overflow-hidden`}>
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    <div className="relative">
                      <h3 className="text-xl font-bold text-[#E5E9E6] group-hover:text-white transition-colors duration-300 mb-3">
                        {project.title}
                      </h3>

                      <p className="text-[#748D92] group-hover:text-[#E5E9E6] transition-colors duration-300 mb-4">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="flex items-center gap-1 bg-[#124E66]/20 text-[#E5E9E6] px-2 py-1 rounded-full text-xs group-hover:bg-[#124E66]/40 group-hover:text-white transition-all duration-300"
                          >
                            <Code className="w-3 h-3" />
                            {tech}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        className="inline-flex items-center gap-2 text-[#E5E9E6] group-hover:text-white transition-colors duration-300"
                      >
                        <Github className="w-4 h-4" />
                        View on GitHub
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Open Source Contributions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className={`${playfair.className} text-2xl font-bold mb-8 flex items-center gap-3`}>
              <Github className="w-6 h-6 text-[#1A6F94]" />
              Open Source Contributions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {openSourceContributions.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="group relative"
                >
                  <div className={`h-full bg-[#2A363F]/80 backdrop-blur-sm rounded-xl p-6 border border-[#4A5A66] hover:border-[#748D92] transition-all duration-500 hover:shadow-[0_0_2rem_0_rgba(26,111,148,0.1)] relative overflow-hidden`}>
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    <div className="relative">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-[#E5E9E6] group-hover:text-white transition-colors duration-300">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-4 text-[#748D92] group-hover:text-[#E5E9E6] transition-colors duration-300">
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            {project.stars}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork className="w-4 h-4" />
                            {project.forks}
                          </span>
                        </div>
                      </div>

                      <p className="text-[#748D92] group-hover:text-[#E5E9E6] transition-colors duration-300 mb-4">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="flex items-center gap-1 bg-[#124E66]/20 text-[#E5E9E6] px-2 py-1 rounded-full text-xs group-hover:bg-[#124E66]/40 group-hover:text-white transition-all duration-300"
                          >
                            <Code className="w-3 h-3" />
                            {tech}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        className="inline-flex items-center gap-2 text-[#E5E9E6] group-hover:text-white transition-colors duration-300"
                      >
                        <Github className="w-4 h-4" />
                        View Repository
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
} 