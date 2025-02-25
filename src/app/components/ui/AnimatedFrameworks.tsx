'use client'

import { motion } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface Framework {
  name: string
  icon: string
  color: string
}

const frameworks: Framework[] = [
  { name: 'React', icon: '/icons/react.svg', color: '#61DAFB' },
  { name: 'Next.js', icon: '/icons/nextjs.svg', color: '#000000' },
  { name: 'Node.js', icon: '/icons/nodejs.svg', color: '#339933' },
  { name: 'TypeScript', icon: '/icons/typescript.svg', color: '#3178C6' },
  { name: 'Tailwind', icon: '/icons/tailwind.svg', color: '#06B6D4' },
  { name: 'Express', icon: '/icons/express.svg', color: '#ffffff' },
  { name: 'PHP', icon: '/icons/php.svg', color: '#777BB4' },
  { name: 'Python', icon: '/icons/python.svg', color: '#3776AB' },
]

interface AnimatedFrameworksProps {
  className?: string
}

export function AnimatedFrameworks({ className }: AnimatedFrameworksProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className={cn("w-full grid grid-cols-4 gap-8", className)}>
      {frameworks.map((framework, index) => (
        <motion.div
          key={framework.name}
          className="relative flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: "easeOut"
          }}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
        >
          <motion.div
            className="relative w-16 h-16 lg:w-20 lg:h-20"
            animate={{
              y: hoveredIndex === index ? -10 : 0,
              scale: hoveredIndex === index ? 1.1 : 1,
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut"
            }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full blur-xl opacity-20"
              style={{
                backgroundColor: framework.color,
              }}
              animate={{
                scale: hoveredIndex === index ? 1.2 : 1,
                opacity: hoveredIndex === index ? 0.3 : 0.2,
              }}
            />
            
            {/* Icon */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={framework.icon}
                alt={framework.name}
                width={64}
                height={64}
                className="w-12 h-12 lg:w-16 lg:h-16 object-contain"
              />
            </div>
          </motion.div>

          {/* Framework name */}
          <motion.p
            className="mt-4 text-sm lg:text-base font-medium text-center"
            style={{ color: framework.color }}
            animate={{
              opacity: hoveredIndex === index ? 1 : 0.7,
            }}
          >
            {framework.name}
          </motion.p>
        </motion.div>
      ))}
    </div>
  )
} 