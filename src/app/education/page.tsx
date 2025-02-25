'use client';

import { motion } from "framer-motion";
import { Playfair_Display } from 'next/font/google';
import { DockNavigation } from '../components/layout/DockNavigation';
import { BookOpen, Calendar, Award, Code, GraduationCap, School, Calculator, ArrowRight } from 'lucide-react';

// Import Sparkles component
import { Sparkles } from 'lucide-react';

const playfair = Playfair_Display({ subsets: ['latin'] });

const education = [
  {
    school: "Malla Reddy Engineering College",
    degree: "Bachelor of Technology - BTech",
    field: "Computer Science Engineering in Artificial Intelligence and Machine Learning",
    duration: "2021 - 2025",
    grade: "8.41",
    icon: <GraduationCap className="w-8 h-8 text-[#1A6F94]" />,
    skills: ["C (Programming Language)", "Python", "Machine Learning", "Artificial Intelligence"],
    description: "Currently pursuing B.Tech in CSE with specialization in AI & ML, focusing on cutting-edge technologies and practical applications.",
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    school: "Sri Chaitanya Junior College",
    degree: "Intermediate",
    field: "MPC",
    duration: "2019 - 2021",
    grade: "90.8",
    icon: <Calculator className="w-8 h-8 text-[#1A6F94]" />,
    description: "Completed intermediate education with focus on Mathematics, Physics, and Chemistry.",
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    school: "Telangana Model School",
    degree: "SSC",
    duration: "2018 - 2019",
    grade: "9.0",
    icon: <School className="w-8 h-8 text-[#1A6F94]" />,
    description: "Completed secondary education with excellent academic performance.",
    gradient: "from-amber-500/20 to-red-500/20"
  }
];

export default function Education() {
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
                  Education
                </span>
              </motion.div>
            </div>
            
            <h1 className={`${playfair.className} text-4xl lg:text-5xl font-bold mt-6 mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent`}>
              Academic Journey
            </h1>
            <p className="text-lg text-[#748D92] max-w-2xl mx-auto">
              Building a strong foundation in technology and computer science through academic excellence.
            </p>
          </motion.div>

          {/* Education Timeline */}
          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={edu.school}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="relative group"
              >
                {/* Timeline Line */}
                {index !== education.length - 1 && (
                  <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-[#124E66] to-transparent" />
                )}

                <div className="bg-[#2A363F]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#4A5A66] hover:border-[#748D92] transition-all duration-500 group-hover:shadow-[0_0_2rem_0_rgba(26,111,148,0.1)] relative overflow-hidden">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${edu.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative flex items-start gap-6">
                    {/* Icon */}
                    <motion.div 
                      className="w-16 h-16 rounded-xl bg-[#124E66]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {edu.icon}
                    </motion.div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold text-[#E5E9E6] group-hover:text-white transition-colors duration-300">
                          {edu.school}
                        </h2>
                        {edu.grade && (
                          <div className="flex items-center gap-1 text-[#748D92] group-hover:text-[#E5E9E6] transition-colors duration-300">
                            <span className="w-4 h-4 inline-flex">
                              <Sparkles size={16} />
                            </span>
                            <span className="text-sm font-medium">Grade: {edu.grade}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-4 mb-4 text-sm">
                        <span className="flex items-center gap-2 text-[#748D92] group-hover:text-[#E5E9E6] transition-colors duration-300">
                          <Award className="w-4 h-4" />
                          {edu.degree} {edu.field && `in ${edu.field}`}
                        </span>
                        <span className="flex items-center gap-2 text-[#748D92] group-hover:text-[#E5E9E6] transition-colors duration-300">
                          <Calendar className="w-4 h-4" />
                          {edu.duration}
                        </span>
                      </div>

                      <p className="text-[#E5E9E6] mb-4 group-hover:text-white transition-colors duration-300">
                        {edu.description}
                      </p>

                      {edu.skills && (
                        <div className="flex flex-wrap gap-2">
                          {edu.skills.map((skill) => (
                            <span
                              key={skill}
                              className="flex items-center gap-1 bg-[#124E66]/20 text-[#E5E9E6] px-3 py-1.5 rounded-full text-sm group-hover:bg-[#124E66]/40 group-hover:text-white transition-all duration-300"
                            >
                              <Code className="w-3 h-3" />
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

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