'use client';

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Skill {
  name: string;
  icon: string;
  color: string;
}

const skills: Skill[] = [
  { name: 'React', icon: '/icons/react.svg', color: '#61DAFB' },
  { name: 'Next.js', icon: '/icons/nextjs.svg', color: '#000000' },
  { name: 'Node.js', icon: '/icons/nodejs.svg', color: '#339933' },
  { name: 'TypeScript', icon: '/icons/typescript.svg', color: '#3178C6' },
  { name: 'Tailwind', icon: '/icons/tailwind.svg', color: '#06B6D4' },
  { name: 'Express', icon: '/icons/express.svg', color: '#ffffff' },
  { name: 'PHP', icon: '/icons/php.svg', color: '#777BB4' },
  { name: 'Python', icon: '/icons/python.svg', color: '#3776AB' },
];

export function CircularSkills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const radius = 200; // Radius of the circle
  const totalSkills = skills.length;
  const angleStep = (2 * Math.PI) / totalSkills;

  return (
    <div className="relative w-[500px] h-[500px] flex items-center justify-center">
      {/* Background glow effect */}
      <div 
        className="absolute inset-0 rounded-full blur-[100px] opacity-20"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, rgba(97, 218, 251, 0.3) 0%, transparent 70%),
            radial-gradient(circle at 70% 70%, rgba(6, 182, 212, 0.3) 0%, transparent 70%),
            radial-gradient(circle at 50% 50%, rgba(55, 118, 171, 0.2) 0%, transparent 70%)
          `
        }}
      />

      {skills.map((skill, index) => {
        const angle = index * angleStep;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        return (
          <motion.div
            key={skill.name}
            className="absolute"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: x,
              y: y,
              rotateX: [0, 10, 0],
              rotateY: [0, 15, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: index * 0.2,
            }}
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
            onHoverStart={() => setHoveredSkill(skill.name)}
            onHoverEnd={() => setHoveredSkill(null)}
          >
            <motion.div
              className="relative group cursor-pointer"
              animate={{
                rotateZ: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {/* Icon container with glow effect */}
              <div 
                className="relative w-16 h-16 rounded-full flex items-center justify-center bg-[#2E3944] border border-[#748D92]/20"
                style={{
                  boxShadow: hoveredSkill === skill.name 
                    ? `0 0 20px ${skill.color}40, inset 0 0 20px ${skill.color}40` 
                    : 'none',
                  transition: 'box-shadow 0.3s ease'
                }}
              >
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  width={32}
                  height={32}
                  className="transform transition-transform group-hover:scale-125"
                />
              </div>

              {/* Skill name with glow effect */}
              <motion.div
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: hoveredSkill === skill.name ? 1 : 0,
                  y: hoveredSkill === skill.name ? 0 : 10,
                }}
                style={{ color: skill.color }}
              >
                {skill.name}
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Center glow */}
      <div 
        className="absolute w-32 h-32 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(18, 78, 102, 0.2) 0%, transparent 70%)',
        }}
      />
    </div>
  );
} 