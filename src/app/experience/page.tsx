'use client';

import { motion } from "framer-motion";
import { Playfair_Display } from 'next/font/google';
import { DockNavigation } from '../components/layout/DockNavigation';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  Code,
  Globe,
  Users,
  Building,
  GraduationCap,
  Star,
  ArrowRight
} from 'lucide-react';

const playfair = Playfair_Display({ subsets: ['latin'] });

const experiences = [
  {
    role: "Python Developer",
    company: "InnoByte Services",
    type: "Internship",
    duration: "Sep 2024 - Oct 2024 · 2 mos",
    location: "New Delhi, Delhi, India · Remote",
    icon: <Code className="w-8 h-8 text-[#1A6F94]" />,
    skills: ["Python (Programming Language)", "Program Creation"],
    description: "Python development internship focusing on software development and programming.",
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    role: "Student Ambassador",
    company: "LetsUpgrade",
    type: "Part-time",
    duration: "Mar 2024 - Sep 2024 · 7 mos",
    location: "India · Remote",
    icon: <Users className="w-8 h-8 text-[#1A6F94]" />,
    skills: ["Community Outreach", "Student Leadership"],
    description: "Represented and promoted LetsUpgrade as a student ambassador. Engaged with new students, provided guidance, and facilitated community building. Helped students learn new skills and build connections within the educational community.",
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    role: "Co-Founder",
    company: "VirtuAlly Solutions",
    type: "Self-employed",
    duration: "Sep 2023 - Sep 2024 · 1 yr 1 mo",
    location: "Hyderabad, Telangana, India · Remote",
    icon: <Building className="w-8 h-8 text-[#1A6F94]" />,
    skills: ["Full-Stack Development", "Python (Programming Language)"],
    description: "Led web development initiatives, delivering high-quality, responsive websites that surpassed client expectations.",
    gradient: "from-amber-500/20 to-red-500/20"
  },
  {
    role: "Student Partner",
    company: "Internshala",
    type: "Internship",
    duration: "Mar 2024 - Jun 2024 · 4 mos",
    location: "India · Remote",
    icon: <Star className="w-8 h-8 text-[#1A6F94]" />,
    skills: ["Leadership", "Student Leadership"],
    description: "Served as a student partner, developing leadership skills and contributing to the student community.",
    gradient: "from-green-500/20 to-emerald-500/20"
  }
];

export default function Experience() {
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
          <div className="absolute w-[500px] h-[500px] -top-20 -right-20 bg-[#124E66]/20 rounded-full blur-3xl" />
          <div className="absolute w-[500px] h-[500px] top-1/2 -left-20 bg-[#124E66]/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto">
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
                  Experience
                </span>
              </motion.div>
            </div>
            
            <h1 className={`${playfair.className} text-4xl lg:text-5xl font-bold mt-6 mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent`}>
              Professional Journey
            </h1>
            <p className="text-lg text-[#748D92] max-w-2xl mx-auto">
              Building expertise in technology and leadership through diverse roles and responsibilities.
            </p>
          </motion.div>

          {/* Experience Timeline */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company + exp.role}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="relative group"
              >
                {/* Timeline Line */}
                {index !== experiences.length - 1 && (
                  <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-[#124E66] to-transparent" />
                )}

                <div className="bg-[#2A363F]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#4A5A66] hover:border-[#748D92] transition-all duration-500 group-hover:shadow-[0_0_2rem_0_rgba(26,111,148,0.1)] relative overflow-hidden">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${exp.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative flex items-start gap-6">
                    {/* Icon */}
                    <motion.div 
                      className="w-16 h-16 rounded-xl bg-[#124E66]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {exp.icon}
                    </motion.div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold text-[#E5E9E6] group-hover:text-white transition-colors duration-300">
                          {exp.role}
                        </h2>
                        <span className="text-[#748D92] text-sm px-3 py-1.5 rounded-full bg-[#124E66]/20 group-hover:bg-[#124E66]/40 transition-colors duration-300">
                          {exp.type}
                        </span>
                      </div>
                      
                      <h3 className="text-lg text-[#748D92] mb-3 group-hover:text-[#E5E9E6] transition-colors duration-300">
                        {exp.company}
                      </h3>

                      <div className="flex flex-wrap gap-4 mb-4 text-sm">
                        <span className="flex items-center gap-2 text-[#748D92] group-hover:text-[#E5E9E6] transition-colors duration-300">
                          <Calendar className="w-4 h-4" />
                          {exp.duration}
                        </span>
                        <span className="flex items-center gap-2 text-[#748D92] group-hover:text-[#E5E9E6] transition-colors duration-300">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </span>
                      </div>

                      <p className="text-[#E5E9E6] mb-4 group-hover:text-white transition-colors duration-300">
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="flex items-center gap-1 bg-[#124E66]/20 text-[#E5E9E6] px-3 py-1.5 rounded-full text-sm group-hover:bg-[#124E66]/40 group-hover:text-white transition-all duration-300"
                          >
                            <Briefcase className="w-3 h-3" />
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Hover Arrow */}
                      <div className="absolute top-1/2 -right-10 -translate-y-1/2 opacity-0 group-hover:right-6 group-hover:opacity-100 transition-all duration-500">
                        <ArrowRight className="w-6 h-6 text-[#1A6F94]" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </main>
  );
} 