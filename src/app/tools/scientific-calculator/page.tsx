'use client';

import { motion } from 'framer-motion';
import { ScientificCalculator } from '../../components/tools/ScientificCalculator';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ScientificCalculatorPage() {
  return (
    <main className="min-h-screen bg-[#212A31] text-[#E5E9E6] p-8">
      <div className="max-w-4xl mx-auto">
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
          <h1 className="text-4xl font-bold mb-6">Scientific Calculator</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Calculator */}
            <div className="bg-[#2A363F] rounded-xl p-6 shadow-xl h-fit">
              <ScientificCalculator alwaysShow={true} />
            </div>

            {/* Documentation */}
            <div className="bg-[#2A363F] rounded-xl p-6 shadow-xl">
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl mb-4">Features</h2>
                <ul className="list-disc list-inside mb-6 space-y-2">
                  <li>Trigonometric Functions (sin, cos, tan, arcsin, arccos, arctan)</li>
                  <li>Logarithmic Functions (log₁₀, ln)</li>
                  <li>Exponentiation and Roots</li>
                  <li>Memory Functions (M+, M-, MR, MC)</li>
                  <li>Basic Arithmetic Operations</li>
                  <li>Clear and Memory Functions</li>
                </ul>

                <h2 className="text-2xl mb-4">How to Use</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl mb-2">Basic Operations</h3>
                    <p>Enter numbers and use operators (+, -, ×, ÷) for basic calculations.</p>
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">Scientific Functions</h3>
                    <p>Use sin, cos, tan, and other functions for advanced calculations.</p>
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">Memory Functions</h3>
                    <p>Store and recall numbers using M+, M-, MR, and MC buttons.</p>
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