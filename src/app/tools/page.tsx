'use client';

import { motion } from 'framer-motion';
import { Calculator, Search, Image, Code, ArrowLeft, LineChart, Grid, FunctionSquare, Clock, PiggyBank, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { ScientificCalculator } from '../components/tools/ScientificCalculator';
import { GraphingCalculator } from '../components/tools/GraphingCalculator';
import { MatrixCalculator } from '../components/tools/MatrixCalculator';
import { EquationSolver } from '../components/tools/EquationSolver';
import { TimeCardCalculator } from '../components/tools/TimeCardCalculator';
import { SavingsGoalCalculator } from '../components/tools/SavingsGoalCalculator';
import { CreditCardPayoffCalculator } from '../components/tools/CreditCardPayoffCalculator';
import { PolynomialCalculator } from '../components/tools/PolynomialCalculator';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
  children?: React.ReactNode;
}

const ToolCard = ({ title, description, icon, href, children }: ToolCardProps) => {
  const content = (
    <motion.div
      className="bg-[#2A363F] rounded-xl p-6 hover:bg-[#1A6F94]/20 transition-colors"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="bg-[#1A6F94] p-3 rounded-lg">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-[#748D92]">{description}</p>
        </div>
      </div>
      {children}
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
};

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#212A31] text-[#E5E9E6] p-8">
      {/* Back to Home Link */}
      <div className="max-w-6xl mx-auto mb-8">
        <Link href="/" className="inline-flex items-center text-[#748D92] hover:text-[#E5E9E6] transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-6">Tools</h1>
        <p className="text-[#748D92] mb-12">
          A collection of powerful mathematical tools designed to help with calculations and visualizations.
        </p>

        <div className="space-y-16">
          {/* Scientific Calculator Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#1A6F94] p-3 rounded-lg">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Scientific Calculator</h2>
                <p className="text-[#748D92]">Advanced calculator with scientific functions and memory operations</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator */}
              <div className="bg-[#2A363F] rounded-xl p-6 shadow-xl">
                <ScientificCalculator alwaysShow={true} />
              </div>

              {/* Documentation */}
              <div className="space-y-6">
                <div className="bg-[#2A363F] rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Features</h3>
                  <ul className="list-disc list-inside space-y-2 text-[#748D92]">
                    <li>Basic arithmetic operations</li>
                    <li>Scientific functions (sin, cos, tan, log)</li>
                    <li>Memory operations (M+, M-, MR, MC)</li>
                    <li>Constants (π, e) and power functions</li>
                    <li>Operation history tracking</li>
                  </ul>
                </div>

                <div className="bg-[#2A363F] rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">How to Use</h3>
                  <div className="space-y-4 text-[#748D92]">
                    <p><span className="text-[#E5E9E6] font-medium">Basic Operations:</span> Enter numbers and use operators for calculations</p>
                    <p><span className="text-[#E5E9E6] font-medium">Scientific Functions:</span> Click sin, cos, tan, etc. for advanced calculations</p>
                    <p><span className="text-[#E5E9E6] font-medium">Memory Functions:</span></p>
                    <ul className="list-none pl-4 space-y-1">
                      <li>• M+ : Add current number to memory</li>
                      <li>• M- : Subtract current number from memory</li>
                      <li>• MR : Recall number from memory</li>
                      <li>• MC : Clear memory</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Graphing Calculator Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#3B82F6] p-3 rounded-lg">
                <LineChart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Graphing Calculator</h2>
                <p className="text-[#748D92]">Interactive function plotter with support for multiple functions</p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Calculator */}
              <GraphingCalculator alwaysShow={true} />

              {/* Documentation */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#2A363F] rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Features</h3>
                  <ul className="list-disc list-inside space-y-2 text-[#748D92]">
                    <li>Plot multiple functions simultaneously</li>
                    <li>Support for various function types:
                      <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                        <li>Linear functions (e.g., y = mx + b)</li>
                        <li>Quadratic functions (e.g., y = ax² + bx + c)</li>
                        <li>Trigonometric functions (sin, cos, tan)</li>
                        <li>Exponential and logarithmic functions</li>
                      </ul>
                    </li>
                    <li>Customizable view window</li>
                    <li>Function visibility toggling</li>
                  </ul>
                </div>

                <div className="bg-[#2A363F] rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">How to Use</h3>
                  <div className="space-y-4 text-[#748D92]">
                    <div>
                      <p className="text-[#E5E9E6] font-medium mb-2">Adding Functions</p>
                      <p>Click "Add Function" and enter expressions using:</p>
                      <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                        <li>Basic operators: +, -, *, /, ^ (for exponents)</li>
                        <li>Functions: sin(x), cos(x), tan(x), log(x)</li>
                        <li>Constants: π (pi), e</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-[#E5E9E6] font-medium mb-2">Example Functions</p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>x + 2</li>
                        <li>x^2 - 4</li>
                        <li>sin(x)</li>
                        <li>2*sin(x) + 1</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Matrix Calculator Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#10B981] p-3 rounded-lg">
                <Grid className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Matrix Calculator</h2>
                <p className="text-[#748D92]">Perform matrix operations including addition, multiplication, and inversion</p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Calculator */}
              <MatrixCalculator alwaysShow={true} />

              {/* Documentation */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#2A363F] rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Features</h3>
                  <ul className="list-disc list-inside space-y-2 text-[#748D92]">
                    <li>Matrix addition and subtraction</li>
                    <li>Matrix multiplication</li>
                    <li>Scalar multiplication</li>
                    <li>Matrix inversion</li>
                    <li>Support for matrices up to 5x5</li>
                    <li>Real-time error checking</li>
                  </ul>
                </div>

                <div className="bg-[#2A363F] rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">How to Use</h3>
                  <div className="space-y-4 text-[#748D92]">
                    <div>
                      <p className="text-[#E5E9E6] font-medium mb-2">Matrix Operations</p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>Select the desired operation (Add, Multiply, Scalar, Invert)</li>
                        <li>Set matrix dimensions using the row/column inputs</li>
                        <li>Enter values in the matrix cells</li>
                        <li>Click Calculate to perform the operation</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-[#E5E9E6] font-medium mb-2">Requirements</p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>For addition: Matrices must have same dimensions</li>
                        <li>For multiplication: Number of columns in first matrix must equal rows in second</li>
                        <li>For inversion: Matrix must be square and non-singular</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Equation Solver Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#8B5CF6] p-3 rounded-lg">
                <FunctionSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Equation Solver</h2>
                <p className="text-[#748D92]">Solve linear and nonlinear equations with step-by-step solutions</p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Calculator */}
              <EquationSolver alwaysShow={true} />

              {/* Documentation */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#2A363F] rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Features</h3>
                  <ul className="list-disc list-inside space-y-2 text-[#748D92]">
                    <li>Linear equations (ax + b = c)</li>
                    <li>Quadratic equations (ax² + bx + c = 0)</li>
                    <li>Systems of linear equations</li>
                    <li>Real-time error checking</li>
                    <li>Step-by-step solutions</li>
                    <li>Support for multiple equation formats</li>
                  </ul>
                </div>

                <div className="bg-[#2A363F] rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">How to Use</h3>
                  <div className="space-y-4 text-[#748D92]">
                    <div>
                      <p className="text-[#E5E9E6] font-medium mb-2">Equation Types</p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>Linear: ax + b = c</li>
                        <li>Quadratic: ax² + bx + c = 0</li>
                        <li>System of Linear: ax + by = c</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-[#E5E9E6] font-medium mb-2">Example Inputs</p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>2x + 3 = 7</li>
                        <li>x² + 2x + 1 = 0</li>
                        <li>2x + y = 5, x - y = 1</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Time Card Calculator Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#F59E0B] p-3 rounded-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Time Card Calculator</h2>
                <p className="text-[#748D92]">Calculate work hours and wages from clock-in/out times</p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Calculator */}
              <TimeCardCalculator alwaysShow={true} />

              {/* Documentation */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#2A363F] rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Features</h3>
                  <ul className="list-disc list-inside space-y-2 text-[#748D92]">
                    <li>Multiple time entries per day</li>
                    <li>Support for overnight shifts</li>
                    <li>Daily hours breakdown</li>
                    <li>Automatic wage calculation</li>
                    <li>24-hour time format</li>
                    <li>Real-time validation</li>
                  </ul>
                </div>

                <div className="bg-[#2A363F] rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">How to Use</h3>
                  <div className="space-y-4 text-[#748D92]">
                    <div>
                      <p className="text-[#E5E9E6] font-medium mb-2">Time Entry</p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>Enter hourly wage rate</li>
                        <li>Select date for each entry</li>
                        <li>Enter clock-in time (HH:MM)</li>
                        <li>Enter clock-out time (HH:MM)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-[#E5E9E6] font-medium mb-2">Example</p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>Clock In: 09:00</li>
                        <li>Clock Out: 17:30</li>
                        <li>Overnight: 22:00 to 06:00</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Savings Goal Calculator Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#22C55E] p-3 rounded-lg">
                <PiggyBank className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Savings Goal Calculator</h2>
                <p className="text-[#748D92]">Plan your savings with compound interest and flexible schedules</p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Calculator */}
              <SavingsGoalCalculator alwaysShow={true} />

              {/* Documentation */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#2A363F] rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Features</h3>
                  <ul className="list-disc list-inside space-y-2 text-[#748D92]">
                    <li>Calculate required periodic savings</li>
                    <li>Support for multiple saving frequencies:
                      <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                        <li>Monthly savings</li>
                        <li>Weekly savings</li>
                        <li>Bi-weekly savings</li>
                      </ul>
                    </li>
                    <li>Compound interest calculations</li>
                    <li>Initial amount consideration</li>
                    <li>Flexible time frame options</li>
                    <li>Real-time error validation</li>
                  </ul>
                </div>

                <div className="bg-[#2A363F] rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">How to Use</h3>
                  <div className="space-y-4 text-[#748D92]">
                    <div>
                      <p className="text-[#E5E9E6] font-medium mb-2">Required Inputs</p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>Total savings goal amount</li>
                        <li>Initial amount (if any)</li>
                        <li>Saving frequency (monthly/weekly/bi-weekly)</li>
                        <li>Time frame in years</li>
                        <li>Annual interest rate (optional)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-[#E5E9E6] font-medium mb-2">Example</p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>Goal: $10,000</li>
                        <li>Initial: $1,000</li>
                        <li>Frequency: Monthly</li>
                        <li>Time: 2 years</li>
                        <li>Interest: 3% APR</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Credit Card Payoff Calculator Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#EC4899] p-3 rounded-lg">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Credit Card Payoff Calculator</h2>
                <p className="text-[#748D92]">Plan your credit card debt payoff strategy with detailed calculations</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator */}
              <CreditCardPayoffCalculator alwaysShow={true} />

              {/* Documentation */}
              <div className="space-y-6">
                <div className="bg-[#2A363F] rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Features</h3>
                  <ul className="list-disc list-inside space-y-2 text-[#748D92]">
                    <li>Two calculation modes:
                      <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                        <li>Fixed Monthly Payment</li>
                        <li>Fixed Time Frame</li>
                      </ul>
                    </li>
                    <li>Accurate interest calculations with APR</li>
                    <li>Total interest cost projection</li>
                    <li>Payment sufficiency validation</li>
                    <li>Amortization-based calculations</li>
                  </ul>
                </div>

                <div className="bg-[#2A363F] rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">How to Use</h3>
                  <div className="space-y-4 text-[#748D92]">
                    <div>
                      <p className="text-[#E5E9E6] font-medium mb-2">Fixed Monthly Payment Mode</p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>Enter your current balance</li>
                        <li>Input the APR from your credit card</li>
                        <li>Specify your planned monthly payment</li>
                        <li>See how long it will take to pay off</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-[#E5E9E6] font-medium mb-2">Fixed Time Frame Mode</p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>Enter your current balance</li>
                        <li>Input the APR from your credit card</li>
                        <li>Specify desired months to pay off</li>
                        <li>Calculate required monthly payment</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Polynomial Calculator Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#6366F1] p-3 rounded-lg">
                <FunctionSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Polynomial Calculator</h2>
                <p className="text-[#748D92]">Perform operations on polynomial expressions with step-by-step solutions</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator */}
              <PolynomialCalculator alwaysShow={true} />

              {/* Documentation */}
              <div className="space-y-6">
                <div className="bg-[#2A363F] rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Features</h3>
                  <ul className="list-disc list-inside space-y-2 text-[#748D92]">
                    <li>Addition and subtraction of polynomials</li>
                    <li>Polynomial multiplication</li>
                    <li>Support for various polynomial formats</li>
                    <li>Real-time error validation</li>
                    <li>Clear and readable output format</li>
                    <li>Coming soon: Division and factoring</li>
                  </ul>
                </div>

                <div className="bg-[#2A363F] rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">How to Use</h3>
                  <div className="space-y-4 text-[#748D92]">
                    <div>
                      <p className="text-[#E5E9E6] font-medium mb-2">Input Format</p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>Use standard polynomial notation</li>
                        <li>Example: 2x^2 + 3x - 1</li>
                        <li>Terms can be in any order</li>
                        <li>Spaces are optional</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-[#E5E9E6] font-medium mb-2">Example Operations</p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>Add: (2x^2 + 3x - 1) + (x^2 - 4x + 5)</li>
                        <li>Subtract: (2x^2 + 3x - 1) - (x^2 - 4x + 5)</li>
                        <li>Multiply: (x + 2)(x - 3)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </motion.div>
    </main>
  );
} 