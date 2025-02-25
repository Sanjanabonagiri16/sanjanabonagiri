import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Hash, Ruler, BarChart3, X } from 'lucide-react';
import { ScientificCalculator } from './ScientificCalculator';
import { PolynomialCalculator } from './PolynomialCalculator';
import { UnitConverter } from './UnitConverter';
import { StatisticsCalculator } from './StatisticsCalculator';

type Tool = 'scientific' | 'polynomial' | 'unit' | 'statistics' | null;

export const ToolsContainer = () => {
  const [activeTool, setActiveTool] = useState<Tool>(null);

  const tools = [
    {
      id: 'scientific',
      name: 'Scientific Calculator',
      icon: <Calculator className="w-5 h-5" />,
      component: <ScientificCalculator />,
    },
    {
      id: 'polynomial',
      name: 'Polynomial Calculator',
      icon: <Hash className="w-5 h-5" />,
      component: <PolynomialCalculator />,
    },
    {
      id: 'unit',
      name: 'Unit Converter',
      icon: <Ruler className="w-5 h-5" />,
      component: <UnitConverter />,
    },
    {
      id: 'statistics',
      name: 'Statistics Calculator',
      icon: <BarChart3 className="w-5 h-5" />,
      component: <StatisticsCalculator />,
    },
  ];

  return (
    <div className="fixed bottom-0 right-0 p-6 space-y-4 z-50">
      <AnimatePresence>
        {activeTool && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <button
              onClick={() => setActiveTool(null)}
              className="absolute -top-2 -right-2 p-1 rounded-full bg-[#2A363F] text-[#748D92] hover:text-[#E5E9E6] transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>
            {tools.find(tool => tool.id === activeTool)?.component}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{
          y: activeTool ? 20 : 0,
        }}
        className="flex items-center justify-end space-x-2"
      >
        {tools.map(tool => (
          <motion.button
            key={tool.id}
            onClick={() => setActiveTool(activeTool === tool.id ? null : tool.id as Tool)}
            className={`p-3 rounded-xl transition-all ${
              activeTool === tool.id
                ? 'bg-[#1A6F94] text-white'
                : 'bg-[#2A363F] text-[#748D92] hover:text-[#E5E9E6]'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={tool.name}
          >
            {tool.icon}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}; 