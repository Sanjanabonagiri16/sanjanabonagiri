'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const skills = [
  { name: 'React', description: 'Frontend Development', color: '#61DAFB' },
  { name: 'Next.js', description: 'Full Stack Framework', color: '#0070f3' },
  { name: 'Node.js', description: 'Backend Runtime', color: '#339933' },
  { name: 'TypeScript', description: 'Type-Safe Development', color: '#3178C6' },
  { name: 'Tailwind CSS', description: 'Utility-First CSS', color: '#06B6D4' },
  { name: 'Express.js', description: 'Backend Framework', color: '#ffffff' },
  { name: 'PHP', description: 'Server-Side Scripting', color: '#777BB4' },
  { name: 'Python', description: 'Versatile Programming', color: '#3776AB' },
];

const generateRandomPosition = () => ({
  x: Math.random() * 800 - 400, // Wider spread
  y: Math.random() * 500 - 250, // Taller spread
});

export function SkillsCloud() {
  const [positions] = useState(() => 
    skills.map(() => generateRandomPosition())
  );

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
      {/* Floating skills */}
      {skills.map((skill, i) => (
        <motion.div
          key={skill.name}
          className="absolute left-1/2 top-1/2"
          initial={{ 
            opacity: 0,
            x: positions[i].x,
            y: positions[i].y,
            scale: 0
          }}
          animate={{ 
            opacity: 1,
            scale: 1,
            x: positions[i].x,
            y: positions[i].y,
            transition: {
              duration: 1,
              delay: i * 0.15,
              ease: 'easeOut'
            }
          }}
        >
          <motion.div
            className="relative cursor-pointer"
            animate={{
              y: [0, 20, 0],
              x: [0, 10, -10, 0],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.3,
              transition: { duration: 0.2 }
            }}
          >
            <motion.div
              className="relative group"
              style={{
                textShadow: `0 0 20px ${skill.color}66`,
              }}
            >
              <motion.span
                className="text-2xl font-medium block"
                style={{ color: skill.color }}
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {skill.name}
              </motion.span>
              <motion.span
                className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
                style={{ color: 'rgba(211, 217, 212, 0.8)' }}
              >
                {skill.description}
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}

      {/* Subtle ambient glow */}
      <div 
        className="absolute inset-0 blur-[120px] opacity-20 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              circle at 20% 20%,
              rgba(97, 218, 251, 0.2) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 80% 80%,
              rgba(49, 120, 198, 0.2) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 50% 50%,
              rgba(6, 182, 212, 0.1) 0%,
              transparent 50%
            )
          `,
        }}
      />
    </div>
  );
} 