'use client';

import { motion } from "framer-motion";
import { Playfair_Display } from 'next/font/google';
import { Code2, Cloud, Layout, Database, Wrench, ArrowRight, ExternalLink } from 'lucide-react';
import { DockNavigation } from '../components/layout/DockNavigation';
import Link from 'next/link';

const playfair = Playfair_Display({ subsets: ['latin'] });

const services = [
  {
    icon: <Code2 className="w-8 h-8" />,
    title: "Full Stack Development",
    subtitle: "for Scalable Web Solutions",
    description: "Delivering end-to-end web development, from intuitive front-end designs to robust back-end architecture. With expertise in modern frameworks, databases, and APIs, I build scalable, secure, and high-performance applications tailored to business needs.",
    detailedFeatures: [
      "Responsive and mobile-first web applications",
      "RESTful API development and integration",
      "Database design and optimization",
      "Authentication and authorization systems",
      "Real-time features with WebSocket",
      "Performance optimization and caching"
    ],
    technologies: ["Next.js", "React.js", "Node.js", "Express.js", "Django", "FastAPI"],
    gradient: "from-[#3B82F6] to-[#2DD4BF]"
  },
  {
    icon: <Cloud className="w-8 h-8" />,
    title: "Custom SaaS Development",
    subtitle: "to Power Your Business Growth",
    description: "Transforming concepts into scalable SaaS platforms that enhance efficiency and user engagement. I specialize in cloud-based, multi-tenant, and subscription-based SaaS solutions, ensuring seamless performance and business growth.",
    detailedFeatures: [
      "Multi-tenant architecture design",
      "Subscription and billing management",
      "User analytics and reporting",
      "Automated deployment pipelines",
      "Scalable cloud infrastructure",
      "Data security and compliance"
    ],
    technologies: ["Firebase", "Supabase", "PostgreSQL", "MongoDB", "Azure"],
    gradient: "from-[#8B5CF6] to-[#EC4899]"
  },
  {
    icon: <Layout className="w-8 h-8" />,
    title: "Frontend Development",
    subtitle: "for Exceptional User Experiences",
    description: "Crafting responsive, pixel-perfect, and interactive user interfaces using the latest front-end technologies. My focus is on performance, accessibility, and modern UI/UX design to elevate digital experiences.",
    detailedFeatures: [
      "Modern and responsive UI design",
      "Interactive animations and transitions",
      "Accessibility (WCAG) compliance",
      "Cross-browser compatibility",
      "Performance optimization",
      "Component-based architecture"
    ],
    technologies: ["React.js", "Next.js", "Tailwind CSS"],
    gradient: "from-[#F59E0B] to-[#EF4444]"
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: "Backend Development",
    subtitle: "for Secure and Scalable Performance",
    description: "Building highly efficient, secure, and scalable back-end systems that ensure seamless data management and application performance. I specialize in API development, database management, and cloud infrastructure.",
    detailedFeatures: [
      "Microservices architecture",
      "API security and rate limiting",
      "Database optimization",
      "Caching strategies",
      "Load balancing",
      "Monitoring and logging"
    ],
    technologies: ["Python", "Node.js", "Django", "FastAPI", "SQL", "Firebase"],
    gradient: "from-[#10B981] to-[#3B82F6]"
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: "Custom Web Tools",
    subtitle: "& Automation Solutions",
    description: "Developing custom web-based tools and automation solutions to enhance workflow efficiency. Whether it's calculators, dashboards, analytics tools, or process automation, I design solutions tailored to your needs.",
    detailedFeatures: [
      "Custom dashboard development",
      "Data visualization tools",
      "Process automation scripts",
      "Integration with existing systems",
      "Reporting tools",
      "Task scheduling and monitoring"
    ],
    technologies: ["Business dashboards", "Data automation", "Workflow optimization"],
    gradient: "from-[#6366F1] to-[#8B5CF6]"
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Services() {
  return (
    <main className="flex min-h-screen flex-col pt-20 bg-[#212A31] text-[#E5E9E6] overflow-hidden">
      <DockNavigation />
      
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] -top-20 -right-20 bg-[#124E66]/20 rounded-full blur-3xl" />
        <div className="absolute w-[500px] h-[500px] top-1/2 -left-20 bg-[#124E66]/20 rounded-full blur-3xl" />
      </div>

      <motion.section 
        className="relative py-12 px-6"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h1 className={`${playfair.className} text-3xl lg:text-4xl font-bold mb-4`}>
              My Services
            </h1>
            <p className="text-lg text-[#748D92] max-w-3xl mx-auto">
              I offer a comprehensive range of development services designed to bring your ideas to life with scalable, efficient, and innovative solutions.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.1 }
                  }
                }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{ 
                    background: `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))`,
                    opacity: 0.1 
                  }} 
                />
                <div className="relative bg-[#2A363F]/80 backdrop-blur-sm rounded-2xl p-8 border border-[#4A5A66] hover:border-[#748D92] transition-colors duration-300">
                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${service.gradient} mb-6`}>
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-2 text-[#E5E9E6]">
                    {service.title}
                    <span className="block text-lg font-normal text-[#748D92] mt-1">
                      {service.subtitle}
                    </span>
                  </h3>

                  {/* Description */}
                  <p className="text-[#E5E9E6] mb-6">
                    {service.description}
                  </p>

                  {/* Detailed Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-[#748D92] mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {service.detailedFeatures.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-[#E5E9E6]">
                          <span className="text-[#1A6F94] mt-1">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-sm font-medium text-[#748D92] mb-3">📌 Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-[#124E66]/20 text-[#E5E9E6] px-3 py-1 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            variants={fadeInUp}
            className="text-center mt-16"
          >
            <h2 className={`${playfair.className} text-2xl font-bold mb-6`}>
              Looking for a reliable development partner?
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#124E66] text-[#E5E9E6] px-8 py-4 rounded-full hover:bg-[#1A6F94] transition-colors duration-300"
              >
                Let's discuss your project
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 bg-[#2A363F] text-[#E5E9E6] px-8 py-4 rounded-full hover:bg-[#2A363F]/80 transition-colors duration-300 border border-[#4A5A66]"
              >
                View All Projects
                <ExternalLink className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
} 