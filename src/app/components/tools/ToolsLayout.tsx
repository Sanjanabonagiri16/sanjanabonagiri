import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';

interface ToolsLayoutProps {
  children: ReactNode;
  title: string;
  icon?: ReactNode;
  onClose?: () => void;
}

export const ToolsLayout = ({ children, title, icon, onClose }: ToolsLayoutProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-gradient-to-b from-[#2A363F] to-[#1F2937] rounded-xl shadow-xl border border-[#3A4956]/20 backdrop-blur-sm"
    >
      <div className="p-4 border-b border-[#3A4956]/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-[#1A6F94]/10">
              {icon || <Wrench className="w-5 h-5 text-[#1A6F94]" />}
            </div>
            <h3 className="text-lg font-medium text-[#E5E9E6]">{title}</h3>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-[#3A4956]/20 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#748D92]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="p-6">{children}</div>
    </motion.div>
  );
}; 