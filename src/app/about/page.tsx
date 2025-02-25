'use client';

import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useInView } from "framer-motion";
import { Playfair_Display } from 'next/font/google';
import { Mail, Github, Linkedin, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { DockNavigation } from '../components/layout/DockNavigation';
import { useRef, useEffect, useState } from 'react';

// Import Sparkles component
import { Sparkles } from 'lucide-react';

const playfair = Playfair_Display({ subsets: ['latin'] });

const highlights = [
  { title: '40+ GitHub Repositories', description: 'Active open-source contributor with a diverse portfolio of projects.' },
  { title: '20+ SaaS Products', description: 'Extensive experience in developing and optimizing SaaS solutions.' },
  { title: '3.5K+ Network', description: 'Growing professional network on LinkedIn.' },
  { title: '45+ Projects', description: 'Successfully delivered in 2025 while working with 2 clients.' },
];

const skills = {
  'Programming Languages': ['Python', 'Java', 'HTML', 'CSS', 'JavaScript', 'TypeScript'],
  'AI & Machine Learning': ['Generative AI', 'Natural Language Processing (NLP)', 'Data Analysis', 'Prompt Engineering', 'Machine Learning'],
  'Frameworks & Libraries': ['Next.js', 'React.js', 'Tailwind CSS', 'Express.js', 'Django', 'FastAPI', 'Redux'],
  'Databases & Cloud': ['SQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'Supabase', 'Azure'],
  'Tools & Practices': ['Git', 'Power BI', 'Docker', 'CI/CD', 'Agile Development', 'TDD (Test-Driven Development)', 'REST APIs', 'GraphQL'],
};

const specializations = [
  {
    title: 'SaaS Development',
    description: 'Expert in building scalable SaaS solutions with modern tech stacks. Successfully optimized 20+ SaaS products for better performance and user experience.'
  },
  {
    title: 'AI Integration',
    description: 'Proficient in integrating AI capabilities into applications, from chatbots to advanced data analysis and automation systems.'
  },
  {
    title: 'Cloud Architecture',
    description: 'Experienced in designing and implementing cloud-native solutions using Azure, Firebase, and modern cloud platforms.'
  },
  {
    title: 'Performance Optimization',
    description: 'Skilled in optimizing web applications for speed, scalability, and user experience using modern best practices.'
  },
];

const whyWorkWithMe = [
  'Full Stack Expertise – From frontend finesse to backend robustness, I deliver end-to-end solutions that work seamlessly.',
  'Rapid Development – Quick turnaround without compromising on quality – successfully delivered 45+ projects in 2025.',
  'Innovation Focus – Staying ahead with the latest technologies and best practices in web development.',
  'Freelancing & Consulting – Open to collaborating with businesses and individuals on impactful projects.',
  'Result-Oriented – Focused on delivering measurable results and exceeding client expectations.',
];

// Enhanced animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const cardHover = {
  rest: {
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 300
    }
  },
  hover: {
    scale: 1.05,
    rotateX: 10,
    rotateY: -10,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 300
    }
  }
};

const floatingAnimation = {
  initial: { y: 0 },
  animate: { 
    y: [-10, 10],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  }
};

function ParticleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#124E66]/20 rounded-full"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            x: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%"
            ],
            y: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%"
            ],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}

interface SkillCardProps {
  category: string;
  skillList: string[];
}

function SkillCard({ category, skillList }: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateY((x - centerX) / 20);
    setRotateX((centerY - y) / 20);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 transform-gpu"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.h3 
        className="text-xl font-bold text-[#D3D9D4] mb-4 relative"
        style={{ transform: "translateZ(20px)" }}
      >
        {category}
        <motion.span
          className="absolute -right-2 -top-2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="w-4 h-4 text-[#124E66]">
            <Sparkles size={16} />
          </span>
        </motion.span>
      </motion.h3>
      <motion.div 
        className="flex flex-wrap gap-2"
        style={{ transform: "translateZ(40px)" }}
      >
        {skillList.map((skill) => (
          <motion.span
            key={skill}
            className="bg-[#124E66]/20 text-[#D3D9D4] px-3 py-1 rounded-full text-sm cursor-pointer relative overflow-hidden group"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute inset-0 bg-[#124E66]/30"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10">{skill}</span>
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.5, 1]));
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.95, 1]));
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]));

  const combinedStyle = {
    opacity,
    scale,
  };

  return (
    <main className="flex min-h-screen flex-col pt-20 bg-[#212A31] text-[#E5E9E6] overflow-hidden" ref={containerRef}>
      <DockNavigation />
      <ParticleBackground />
      
      <motion.section 
        className="py-12 relative"
        style={combinedStyle}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Background Decorative Elements */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{ y }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle at 0% 0%, rgba(18, 78, 102, 0.2) 0%, transparent 50%)",
                "radial-gradient(circle at 100% 100%, rgba(18, 78, 102, 0.2) 0%, transparent 50%)",
                "radial-gradient(circle at 0% 100%, rgba(18, 78, 102, 0.2) 0%, transparent 50%)",
                "radial-gradient(circle at 100% 0%, rgba(18, 78, 102, 0.2) 0%, transparent 50%)"
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6">
          {/* Header with enhanced text visibility */}
          <motion.div
            variants={fadeInUp}
            className="text-center mb-12 relative"
          >
            <motion.div
              className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(18, 78, 102, 0.3) 0%, transparent 70%)"
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 0.9, 0.6]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.h1 
              className={`${playfair.className} text-3xl lg:text-4xl font-bold mb-4 relative drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]`}
              variants={floatingAnimation}
            >
              <motion.span
                className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#E5E9E6] via-[#1A6F94] to-[#E5E9E6] bg-[length:200%_auto]"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Open to Full-time Roles, Internships & Freelancing
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-[#E5E9E6] max-w-3xl mx-auto font-medium drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]"
              variants={fadeInUp}
            >
              Transforming Ideas into Digital Reality
            </motion.p>
          </motion.div>

          {/* Professional Highlights */}
          <motion.div
            variants={staggerContainer}
            className="mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className={`${playfair.className} text-2xl lg:text-3xl font-bold text-[#E5E9E6] mb-6 text-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]`}
            >
              Professional Highlights
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#2A363F]/80 backdrop-blur-sm rounded-2xl p-5 border border-[#4A5A66] shadow-xl hover:shadow-2xl transition-all"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <h3 className="text-xl font-bold text-[#E5E9E6] mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
                    {highlight.title}
                  </h3>
                  <p className="text-sm text-[#E5E9E6] font-medium">
                    {highlight.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* About Me */}
          <motion.div
            variants={fadeInUp}
            className="mb-16"
          >
            <h2 className={`${playfair.className} text-2xl lg:text-3xl font-bold text-[#E5E9E6] mb-6 text-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]`}>
              About Me
            </h2>
            <div className="bg-[#2A363F]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#4A5A66] shadow-xl">
              <p className="text-base text-[#E5E9E6] leading-relaxed mb-4 font-medium">
                Hello there! I'm Sanjana Bonagiri, a passionate and results-driven Full Stack Developer, SaaS Innovator, and Python Developer with expertise in modern web technologies, AI integration, and cloud computing. With a strong foundation in frontend and backend development, I specialize in turning complex problems into scalable and efficient solutions.
              </p>
              <p className="text-base text-[#E5E9E6] leading-relaxed font-medium">
                In 2025, I have successfully delivered 45+ projects, worked with 2 clients, and am actively open to freelancing to help businesses and startups bring their digital visions to life with cutting-edge technology.
              </p>
            </div>
          </motion.div>

          {/* Technical Expertise */}
          <motion.div
            variants={staggerContainer}
            className="mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className={`${playfair.className} text-2xl lg:text-3xl font-bold text-[#E5E9E6] mb-6 text-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]`}
            >
              Technical Expertise
            </motion.h2>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(skills).map(([category, skillList]) => (
                <motion.div
                  key={category}
                  className="bg-[#2A363F]/80 backdrop-blur-sm rounded-2xl p-5 border border-[#4A5A66] shadow-xl"
                  whileHover={{ scale: 1.02, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-lg font-bold text-[#E5E9E6] mb-3 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
                    {category}
                    <motion.span
                      className="inline-block ml-2"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="w-4 h-4 text-[#1A6F94]">
                        <Sparkles size={16} />
                      </span>
                    </motion.span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill) => (
                      <motion.span
                        key={skill}
                        className="bg-[#1A6F94]/30 text-[#E5E9E6] px-3 py-1.5 rounded-full text-xs font-medium shadow-inner"
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Specialized Skills */}
          <motion.div
            variants={staggerContainer}
            className="mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className={`${playfair.className} text-2xl lg:text-3xl font-bold text-[#E5E9E6] mb-6 text-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]`}
            >
              Specialized Skills
            </motion.h2>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {specializations.map((spec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#2A363F]/80 backdrop-blur-sm rounded-2xl p-5 border border-[#4A5A66] shadow-xl"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <h3 className="text-lg font-bold text-[#E5E9E6] mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
                    {spec.title}
                  </h3>
                  <p className="text-sm text-[#E5E9E6] font-medium">
                    {spec.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Why Work With Me */}
          <motion.div
            variants={fadeInUp}
            className="mb-16"
          >
            <h2 className={`${playfair.className} text-2xl lg:text-3xl font-bold text-[#E5E9E6] mb-6 text-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]`}>
              Why Work With Me?
            </h2>
            <p className="text-base text-[#E5E9E6] text-center mb-8 font-medium">
              In today's fast-paced digital world, businesses need more than just a developer—they need a strategic partner who understands their vision and can translate it into reality. Here's what sets me apart:
            </p>
            <div className="grid grid-cols-1 gap-4">
              {whyWorkWithMe.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-start gap-3 bg-[#2A363F]/80 backdrop-blur-sm rounded-xl p-4 border border-[#4A5A66] shadow-xl"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#1A6F94] flex-shrink-0 mt-0.5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]" />
                  <p className="text-sm text-[#E5E9E6] font-medium">{reason}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={fadeInUp}
            className="text-center"
            whileHover={{ scale: 1.02 }}
          >
            <motion.h2 
              className={`${playfair.className} text-2xl lg:text-3xl font-bold text-[#E5E9E6] mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]`}
            >
              Let's Build Something Amazing Together!
            </motion.h2>
            <motion.div className="flex flex-wrap items-center justify-center gap-4 mt-6">
              {[
                { Icon: Mail, href: "mailto:bonagirisanjana1116@gmail.com", label: "Email" },
                { Icon: Linkedin, href: "https://linkedin.com/in/Sanjana-Bonagiri", label: "LinkedIn" },
                { Icon: Github, href: "https://github.com/Sanjanabonagiri16", label: "GitHub" }
              ].map(({ Icon, href, label }) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#E5E9E6] hover:text-white bg-[#1A6F94]/20 hover:bg-[#1A6F94]/30 px-4 py-2 rounded-full transition-colors font-medium shadow-xl text-sm"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
} 