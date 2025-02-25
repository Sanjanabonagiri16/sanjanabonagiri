'use client'

import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface Skill {
  name: string
  icon: string
  color: string
  href?: string
}

const skills: Skill[] = [
  { name: 'React', icon: '/icons/react.svg', color: '#61DAFB', href: 'https://reactjs.org' },
  { name: 'Next.js', icon: '/icons/nextjs.svg', color: '#000000', href: 'https://nextjs.org' },
  { name: 'Node.js', icon: '/icons/nodejs.svg', color: '#339933', href: 'https://nodejs.org' },
  { name: 'TypeScript', icon: '/icons/typescript.svg', color: '#3178C6', href: 'https://typescriptlang.org' },
  { name: 'Tailwind', icon: '/icons/tailwind.svg', color: '#06B6D4', href: 'https://tailwindcss.com' },
  { name: 'Express', icon: '/icons/express.svg', color: '#ffffff', href: 'https://expressjs.com' },
  { name: 'PHP', icon: '/icons/php.svg', color: '#777BB4', href: 'https://php.net' },
  { name: 'Python', icon: '/icons/python.svg', color: '#3776AB', href: 'https://python.org' },
]

interface AnimatedSkillsProps {
  className?: string
  iconSize?: number
}

export function AnimatedSkills({ 
  className,
  iconSize = 32
}: AnimatedSkillsProps) {
  const [active, setActive] = useState(false)

  const buttonSize = "size-16 sm:size-20" 

  return (
    <div className={cn("w-full relative flex items-center justify-center min-h-[600px]", className)}>
      <div className="flex items-center justify-center relative">
        <motion.button
          className={cn(
            buttonSize,
            "rounded-full flex items-center justify-center absolute z-10",
            "bg-[#124E66] hover:bg-[#124E66]/90 transition-colors"
          )}
          onClick={() => setActive(!active)}
          animate={{ rotate: active ? 45 : 0 }}
          transition={{
            type: "ease-in",
            duration: 0.5,
          }}
        >
          <Plus 
            size={iconSize} 
            strokeWidth={3} 
            className="text-[#D3D9D4]" 
          />
        </motion.button>
        
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className={cn(
              buttonSize,
              "rounded-full flex items-center justify-center absolute",
              "bg-[#2E3944] shadow-lg hover:shadow-xl",
              "border border-[#748D92]/20",
              "group"
            )}
            initial={{ 
              x: 0,
              y: 0,
              opacity: 0 
            }}
            animate={active ? {
              x: index % 3 === 0 ? 300 : // right
                  index % 3 === 1 ? -300 : // left
                  0, // center
              y: index % 3 === 0 ? 0 : // horizontal
                  index % 3 === 1 ? -300 : // up
                  300, // down
              scale: 1.1,
              opacity: 1,
              rotate: 0
            } : {
              x: [
                Math.cos(index * (2 * Math.PI / skills.length)) * 150,
                Math.cos((index + 1) * (2 * Math.PI / skills.length)) * 150,
                Math.cos((index + 2) * (2 * Math.PI / skills.length)) * 150,
                Math.cos((index + 3) * (2 * Math.PI / skills.length)) * 150
              ],
              y: [
                Math.sin(index * (2 * Math.PI / skills.length)) * 150,
                Math.sin((index + 1) * (2 * Math.PI / skills.length)) * 150,
                Math.sin((index + 2) * (2 * Math.PI / skills.length)) * 150,
                Math.sin((index + 3) * (2 * Math.PI / skills.length)) * 150
              ],
              scale: 1,
              opacity: 1,
              rotate: [0, 360]
            }}
            transition={active ? {
              type: "spring",
              stiffness: 120,
              damping: 20,
              duration: 0.8,
              delay: index * 0.1
            } : {
              duration: 10,
              repeat: Infinity,
              ease: "linear",
              rotate: {
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          >
            {skill.href ? (
              <a 
                href={skill.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center w-full h-full"
              >
                <Image 
                  src={skill.icon}
                  alt={skill.name}
                  width={iconSize}
                  height={iconSize}
                  className="transition-all group-hover:scale-110"
                />
                <motion.span
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium opacity-0 group-hover:opacity-100 whitespace-nowrap"
                  style={{ color: skill.color }}
                >
                  {skill.name}
                </motion.span>
              </a>
            ) : (
              <div className="relative flex items-center justify-center w-full h-full">
                <Image 
                  src={skill.icon}
                  alt={skill.name}
                  width={iconSize}
                  height={iconSize}
                  className="transition-all group-hover:scale-110"
                />
                <motion.span
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium opacity-0 group-hover:opacity-100 whitespace-nowrap"
                  style={{ color: skill.color }}
                >
                  {skill.name}
                </motion.span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
} 