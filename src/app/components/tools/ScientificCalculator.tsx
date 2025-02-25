'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, X, Database } from 'lucide-react';

interface CalculatorProps {
  alwaysShow?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

interface CalculatorState {
  display: string;
  memory: number | null;
  previousValue: number | null;
  operation: string | null;
  clearOnNext: boolean;
  history: string[];
}

type UnaryFunction = (a: number) => number;
type BinaryFunction = (a: number, b: number) => number;

interface CalculatorFunctions {
  [key: string]: UnaryFunction | BinaryFunction;
}

interface BinaryOperators {
  [key: string]: BinaryFunction;
}

interface UnaryOperators {
  [key: string]: UnaryFunction;
}

export const ScientificCalculator = ({ 
  alwaysShow = false,
  isOpen = false,
  onClose
}: CalculatorProps) => {
  const [localIsOpen, setLocalIsOpen] = useState(alwaysShow || isOpen);
  const [state, setState] = useState<CalculatorState>({
    display: '0',
    memory: null,
    previousValue: null,
    operation: null,
    clearOnNext: false,
    history: [],
  });

  // Binary operations
  const binaryOperations: BinaryOperators = {
    '+': (a: number, b: number) => a + b,
    '-': (a: number, b: number) => a - b,
    '*': (a: number, b: number) => a * b,
    '/': (a: number, b: number) => a / b,
  };

  // Unary operations
  const unaryOperations: UnaryOperators = {
    'sin': Math.sin,
    'cos': Math.cos,
    'tan': Math.tan,
    'asin': Math.asin,
    'acos': Math.acos,
    'atan': Math.atan,
    'log': Math.log10,
    'ln': Math.log,
    'sqrt': Math.sqrt,
    'x²': (a: number) => Math.pow(a, 2),
    'x³': (a: number) => Math.pow(a, 3),
    '1/x': (a: number) => 1 / a,
  };

  const handleNumber = (num: string) => {
    setState(prev => ({
      ...prev,
      display: prev.clearOnNext ? num : prev.display === '0' ? num : prev.display + num,
      clearOnNext: false,
    }));
  };

  const handleOperation = (op: string) => {
    if (!(op in binaryOperations)) return;
    
    const currentValue = parseFloat(state.display);
    
    if (state.operation) {
      const result = binaryOperations[state.operation](state.previousValue!, currentValue);
      setState(prev => ({
        ...prev,
        display: result.toString(),
        previousValue: result,
        operation: op,
        clearOnNext: true,
        history: [...prev.history, `${prev.previousValue} ${state.operation} ${currentValue} = ${result}`],
      }));
    } else {
      setState(prev => ({
        ...prev,
        previousValue: currentValue,
        operation: op,
        clearOnNext: true,
        history: [...prev.history, `${currentValue} ${op}`],
      }));
    }
  };

  const handleEquals = () => {
    if (!state.operation || !(state.operation in binaryOperations)) return;
    
    const currentValue = parseFloat(state.display);
    const result = binaryOperations[state.operation](state.previousValue!, currentValue);
    
    setState(prev => ({
      ...prev,
      display: result.toString(),
      previousValue: null,
      operation: null,
      clearOnNext: true,
      history: [...prev.history, `${prev.previousValue} ${state.operation} ${currentValue} = ${result}`],
    }));
  };

  const handleFunction = (func: string) => {
    if (!(func in unaryOperations)) return;
    
    const currentValue = parseFloat(state.display);
    const result = unaryOperations[func](currentValue);
    setState(prev => ({
      ...prev,
      display: result.toString(),
      clearOnNext: true,
      history: [...prev.history, `${func}(${currentValue}) = ${result}`],
    }));
  };

  const handleMemory = (action: 'M+' | 'M-' | 'MR' | 'MC') => {
    const currentValue = parseFloat(state.display);
    switch (action) {
      case 'M+':
        setState(prev => ({ 
          ...prev, 
          memory: (prev.memory || 0) + currentValue,
          history: [...prev.history, `Memory + ${currentValue}`],
        }));
        break;
      case 'M-':
        setState(prev => ({ 
          ...prev, 
          memory: (prev.memory || 0) - currentValue,
          history: [...prev.history, `Memory - ${currentValue}`],
        }));
        break;
      case 'MR':
        if (state.memory !== null) {
          setState(prev => ({ 
            ...prev, 
            display: prev.memory!.toString(), 
            clearOnNext: true,
            history: [...prev.history, `Memory Recall: ${prev.memory}`],
          }));
        }
        break;
      case 'MC':
        setState(prev => ({ 
          ...prev, 
          memory: null,
          history: [...prev.history, 'Memory Clear'],
        }));
        break;
    }
  };

  const handleClear = () => {
    setState(prev => ({
      ...prev,
      display: '0',
      previousValue: null,
      operation: null,
      clearOnNext: false,
      history: [...prev.history, 'Clear'],
    }));
  };

  useEffect(() => {
    if (!alwaysShow) {
      setLocalIsOpen(isOpen);
    }
  }, [isOpen, alwaysShow]);

  useEffect(() => {
    if (alwaysShow) {
      setLocalIsOpen(true);
    }
  }, [alwaysShow]);

  const handleClose = () => {
    if (!alwaysShow) {
      setLocalIsOpen(false);
      onClose?.();
    }
  };

  const calculatorContent = (
    <div className="bg-transparent w-[320px]">
      <div className="relative">
        {!alwaysShow && (
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[#E5E9E6] text-lg font-semibold flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Scientific Calculator
            </h3>
            <button
              onClick={handleClose}
              className="text-[#748D92] hover:text-[#E5E9E6] transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        )}

        <div className="calc-display relative">
          {state.memory !== null && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="memory-indicator"
            >
              <Database className="w-3 h-3 inline-block mr-1" />
              M: {state.memory}
            </motion.div>
          )}
          <motion.div
            key={state.display}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="calc-display-text"
          >
            {state.display}
          </motion.div>
        </div>

        <div className="calc-grid">
          {/* Memory Functions */}
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleMemory('MC')} className="calc-btn memory">MC</motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleMemory('MR')} className="calc-btn memory">MR</motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleMemory('M+')} className="calc-btn memory">M+</motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleMemory('M-')} className="calc-btn memory">M-</motion.button>

          {/* Scientific Functions */}
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleFunction('sin')} className="calc-btn function">sin</motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleFunction('cos')} className="calc-btn function">cos</motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleFunction('tan')} className="calc-btn function">tan</motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleFunction('log')} className="calc-btn function">log</motion.button>

          <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleFunction('asin')} className="calc-btn function">asin</motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleFunction('acos')} className="calc-btn function">acos</motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleFunction('atan')} className="calc-btn function">atan</motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleFunction('ln')} className="calc-btn function">ln</motion.button>

          {/* Numbers and Basic Operations */}
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleNumber('7')} className="calc-btn">7</motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleNumber('8')} className="calc-btn">8</motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleNumber('9')} className="calc-btn">9</motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleOperation('/')} className="calc-btn operator">÷</motion.button>

          <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleNumber('4')} className="calc-btn">4</motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleNumber('5')} className="calc-btn">5</motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleNumber('6')} className="calc-btn">6</motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleOperation('*')} className="calc-btn operator">×</motion.button>

          <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleNumber('1')} className="calc-btn">1</motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleNumber('2')} className="calc-btn">2</motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleNumber('3')} className="calc-btn">3</motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleOperation('-')} className="calc-btn operator">−</motion.button>

          <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleNumber('0')} className="calc-btn">0</motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleNumber('.')} className="calc-btn">.</motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleEquals} className="calc-btn equals">=</motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleOperation('+')} className="calc-btn operator">+</motion.button>

          {/* Clear Button */}
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleClear} className="calc-btn memory col-span-4">Clear</motion.button>
        </div>

        {/* Operation History */}
        <AnimatePresence>
          {state.history.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-3 bg-[#0A1A20]/50 rounded-lg border border-[#4A5A66]/20"
            >
              <div className="text-xs text-[#748D92] max-h-24 overflow-y-auto">
                {state.history.slice(-5).map((entry, index) => (
                  <div key={index} className="mb-1 last:mb-0">
                    {entry}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  if (alwaysShow) {
    return calculatorContent;
  }

  return (
    <motion.div
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ 
        y: localIsOpen ? 0 : 100,
        opacity: localIsOpen ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {calculatorContent}
    </motion.div>
  );
};

// Add this to your global CSS or as a styled component
const styles = `
.calc-btn {
  @apply bg-[#124E66] text-[#E5E9E6] p-3 rounded-lg hover:bg-[#1A6F94] transition-colors;
}

.calc-btn.memory {
  @apply bg-[#2A363F] text-[#748D92];
}

.calc-btn.function {
  @apply bg-[#1A6F94] font-semibold;
}

.calc-btn.operator {
  @apply bg-[#1A6F94] font-bold;
}

.calc-btn.equals {
  @apply bg-[#1A6F94] font-bold;
}
`; 