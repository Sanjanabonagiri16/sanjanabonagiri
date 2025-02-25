'use client';

import { motion } from 'framer-motion';
import { Calculator, Github, Linkedin, Mail, Wrench } from 'lucide-react';
import { ScientificCalculator } from '../tools/ScientificCalculator';
import Link from 'next/link';
import { useState } from 'react';

interface DockItemProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  isInternal?: boolean;
  isActive?: boolean;
}

const DockItem = ({ icon, label, href, onClick, isInternal = false, isActive = false }: DockItemProps) => {
  const content = (
    <motion.div
      className="flex flex-col items-center group relative"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={`w-14 h-14 rounded-xl flex items-center justify-center 
                   transition-all duration-200 cursor-pointer
                   ${isActive 
                     ? 'bg-[#124E66] shadow-lg' 
                     : 'bg-[#1A6F94] hover:bg-[#124E66] hover:shadow-lg'
                   }`}
        onClick={onClick}
      >
        {icon}
      </motion.div>
      <motion.span
        className="absolute -top-10 bg-[#2A363F] text-white px-3 py-1.5 
                   rounded-lg text-sm font-medium shadow-lg
                   opacity-0 group-hover:opacity-100 transition-all duration-200
                   whitespace-nowrap"
      >
        {label}
      </motion.span>
    </motion.div>
  );

  if (href) {
    if (isInternal) {
      return <Link href={href}>{content}</Link>;
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
};

export const FooterDock = () => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      {/* Calculator Panel */}
      {isCalculatorOpen && (
        <motion.div
          className="fixed bottom-28 left-1/2 -translate-x-1/2 bg-[#2A363F] 
                     p-6 rounded-2xl shadow-2xl border-2 border-[#4A5A66] z-[9999]
                     w-[360px] max-w-[95vw]"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <ScientificCalculator alwaysShow={true} />
        </motion.div>
      )}

      {/* Footer Dock */}
      <div className="flex justify-center items-center w-full p-4">
        <motion.div
          className="bg-[#2A363F] backdrop-blur-lg p-4 rounded-2xl shadow-2xl 
                     border-2 border-[#4A5A66] z-[9998]"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <div className="flex items-center space-x-8">
            <DockItem
              icon={<Github className="w-7 h-7 text-white" />}
              label="GitHub"
              href="https://github.com/Sanjanabonagiri16"
            />
            <DockItem
              icon={<Linkedin className="w-7 h-7 text-white" />}
              label="LinkedIn"
              href="https://www.linkedin.com/in/sanjana-bonagiri-b2b6b0249/"
            />
            <DockItem
              icon={<Mail className="w-7 h-7 text-white" />}
              label="Email"
              href="mailto:sanjanabonagiri16@gmail.com"
            />
            <DockItem
              icon={<Calculator className="w-7 h-7 text-white" />}
              label="Scientific Calculator"
              onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}
              isActive={isCalculatorOpen}
            />
            <DockItem
              icon={<Wrench className="w-7 h-7 text-white" />}
              label="Tools"
              href="/tools"
              isInternal={true}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}; 