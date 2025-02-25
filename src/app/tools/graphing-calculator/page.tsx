'use client';

import { motion } from 'framer-motion';
import { GraphingCalculator } from '../../components/tools/GraphingCalculator';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function GraphingCalculatorPage() {
  return (
    <main className="min-h-screen bg-[#212A31] text-[#E5E9E6] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/tools" className="group">
            <motion.div
              className="flex items-center gap-2 text-[#748D92] hover:text-[#E5E9E6] transition-colors"
              whileHover={{ x: -4 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Tools</span>
            </motion.div>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-6">Graphing Calculator</h1>
          
          <div className="space-y-8">
            {/* Calculator */}
            <GraphingCalculator alwaysShow={true} />

            {/* Documentation */}
            <div className="bg-[#2A363F] rounded-xl p-6 shadow-xl">
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl mb-4">Features</h2>
                <ul className="list-disc list-inside mb-6 space-y-2">
                  <li>Plot multiple functions simultaneously</li>
                  <li>Support for various function types:
                    <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                      <li>Linear functions (e.g., y = mx + b)</li>
                      <li>Quadratic functions (e.g., y = ax² + bx + c)</li>
                      <li>Trigonometric functions (sin, cos, tan)</li>
                      <li>Exponential functions</li>
                      <li>Logarithmic functions</li>
                      <li>Rational functions</li>
                    </ul>
                  </li>
                  <li>Customizable view window</li>
                  <li>Interactive graph manipulation</li>
                  <li>Function visibility toggling</li>
                </ul>

                <h2 className="text-2xl mb-4">How to Use</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl mb-2">Adding Functions</h3>
                    <p>Click the "Add Function" button to create a new function. Enter your mathematical expression using standard notation:</p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-[#748D92]">
                      <li>Basic operators: +, -, *, /, ^ (for exponents)</li>
                      <li>Functions: sin(x), cos(x), tan(x), log(x), ln(x), sqrt(x)</li>
                      <li>Constants: π (pi), e</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl mb-2">Example Functions</h3>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-[#748D92]">
                      <li>Linear: x + 2</li>
                      <li>Quadratic: x^2 - 4</li>
                      <li>Trigonometric: sin(x)</li>
                      <li>Combined: 2*sin(x) + 1</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl mb-2">View Window</h3>
                    <p>Adjust the view window settings to zoom in/out or pan the graph:</p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-[#748D92]">
                      <li>X Min/Max: Set the horizontal range</li>
                      <li>Y Min/Max: Set the vertical range</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl mb-2">Function Controls</h3>
                    <p>Each function has the following controls:</p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-[#748D92]">
                      <li>Toggle visibility (eye icon)</li>
                      <li>Delete function (trash icon)</li>
                      <li>Edit expression (input field)</li>
                      <li>Color indicator (dot)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
} 