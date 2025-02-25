'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FunctionSquare, Calculator, Plus, X, Equal } from 'lucide-react';

interface EquationSolverProps {
  alwaysShow?: boolean;
}

type EquationType = 'linear' | 'quadratic' | 'cubic' | 'system-linear' | 'system-nonlinear';

interface Equation {
  expression: string;
  variables: string[];
}

export const EquationSolver = ({ alwaysShow = false }: EquationSolverProps) => {
  const [equationType, setEquationType] = useState<EquationType>('linear');
  const [equations, setEquations] = useState<Equation[]>([{ expression: '', variables: ['x'] }]);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  const solveLinearEquation = (equation: string): string | null => {
    try {
      // Simple linear equation solver (ax + b = c)
      const normalized = equation.replace(/\s/g, '').toLowerCase();
      const sides = normalized.split('=');
      if (sides.length !== 2) throw new Error('Invalid equation format');

      let leftSide = sides[0];
      let rightSide = sides[1];

      // Move all terms with x to left side and numbers to right side
      const terms = [...leftSide.split('+'), ...rightSide.split('+')];
      let coefficient = 0;
      let constant = 0;

      terms.forEach(term => {
        if (term.includes('x')) {
          const coef = term.replace('x', '') || '1';
          coefficient += parseFloat(coef);
        } else {
          constant -= parseFloat(term);
        }
      });

      if (coefficient === 0) throw new Error('Not a valid linear equation');
      const solution = -constant / coefficient;
      return `x = ${solution.toFixed(4)}`;
    } catch (err) {
      setError('Invalid equation format');
      return null;
    }
  };

  const solveQuadraticEquation = (equation: string): string | null => {
    try {
      // Quadratic equation solver (ax² + bx + c = 0)
      const normalized = equation.replace(/\s/g, '').toLowerCase();
      
      // Extract coefficients (simplified for demonstration)
      const match = normalized.match(/(-?\d*)?x\^2([-+]\d*)?x?([-+]\d+)?=0/);
      if (!match) throw new Error('Invalid quadratic equation format');

      const a = match[1] ? parseFloat(match[1]) : 1;
      const b = match[2] ? parseFloat(match[2]) : 0;
      const c = match[3] ? parseFloat(match[3]) : 0;

      const discriminant = b * b - 4 * a * c;
      
      if (discriminant < 0) {
        return 'No real solutions';
      } else if (discriminant === 0) {
        const x = -b / (2 * a);
        return `x = ${x.toFixed(4)}`;
      } else {
        const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        return `x₁ = ${x1.toFixed(4)}, x₂ = ${x2.toFixed(4)}`;
      }
    } catch (err) {
      setError('Invalid quadratic equation format');
      return null;
    }
  };

  const solveSystemOfLinearEquations = (equations: Equation[]): string | null => {
    try {
      if (equations.length !== 2) throw new Error('Currently supports 2x2 systems only');

      // Simplified 2x2 system solver using Cramer's rule
      // ax + by = c
      // dx + ey = f
      const eq1 = equations[0].expression.replace(/\s/g, '').split('=');
      const eq2 = equations[1].expression.replace(/\s/g, '').split('=');

      // Extract coefficients (simplified parsing)
      const [a, b, c] = parseCoefficients(eq1[0], eq1[1]);
      const [d, e, f] = parseCoefficients(eq2[0], eq2[1]);

      const determinant = a * e - b * d;
      if (determinant === 0) throw new Error('No unique solution exists');

      const x = (c * e - b * f) / determinant;
      const y = (a * f - c * d) / determinant;

      return `x = ${x.toFixed(4)}, y = ${y.toFixed(4)}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid system of equations');
      return null;
    }
  };

  const parseCoefficients = (left: string, right: string): number[] => {
    // Simplified coefficient extraction
    const terms = left.split('+');
    let a = 0, b = 0;
    terms.forEach(term => {
      if (term.includes('x')) a = parseFloat(term.replace('x', '') || '1');
      if (term.includes('y')) b = parseFloat(term.replace('y', '') || '1');
    });
    const c = parseFloat(right);
    return [a, b, c];
  };

  const handleSolve = () => {
    setError('');
    setResult(null);

    try {
      let solution: string | null = null;

      switch (equationType) {
        case 'linear':
          solution = solveLinearEquation(equations[0].expression);
          break;
        case 'quadratic':
          solution = solveQuadraticEquation(equations[0].expression);
          break;
        case 'system-linear':
          solution = solveSystemOfLinearEquations(equations);
          break;
        default:
          setError('This equation type is not yet supported');
          return;
      }

      if (solution) {
        setResult(solution);
      }
    } catch (err) {
      setError('Error solving equation');
    }
  };

  const handleEquationChange = (index: number, value: string) => {
    const newEquations = [...equations];
    newEquations[index] = { ...newEquations[index], expression: value };
    setEquations(newEquations);
  };

  const addEquation = () => {
    if (equations.length < 3) {
      setEquations([...equations, { expression: '', variables: ['x', 'y'] }]);
    }
  };

  return (
    <div className="bg-[#1A2830] rounded-xl p-6 shadow-xl w-full max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <FunctionSquare className="w-6 h-6 text-[#8B5CF6]" />
        <h2 className="text-xl font-semibold text-[#E5E9E6]">Equation Solver</h2>
      </div>

      <div className="space-y-6">
        {/* Equation Type Selection */}
        <div className="flex flex-wrap gap-3">
          {[
            { type: 'linear' as EquationType, label: 'Linear', icon: Calculator },
            { type: 'quadratic' as EquationType, label: 'Quadratic', icon: FunctionSquare },
            { type: 'system-linear' as EquationType, label: 'System of Linear', icon: Plus },
          ].map(({ type, label, icon: Icon }) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setEquationType(type);
                setEquations(type.includes('system') ? 
                  [
                    { expression: '', variables: ['x', 'y'] },
                    { expression: '', variables: ['x', 'y'] }
                  ] : 
                  [{ expression: '', variables: ['x'] }]
                );
                setResult(null);
                setError('');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                equationType === type
                  ? 'bg-[#8B5CF6] text-white'
                  : 'bg-[#2A363F] text-[#748D92] hover:text-[#E5E9E6]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </motion.button>
          ))}
        </div>

        {/* Equation Inputs */}
        <div className="space-y-4">
          {equations.map((eq, index) => (
            <div key={index} className="flex items-center gap-4">
              <span className="text-[#748D92] font-medium">
                {equations.length > 1 ? `Equation ${index + 1}:` : 'Enter equation:'}
              </span>
              <input
                type="text"
                value={eq.expression}
                onChange={(e) => handleEquationChange(index, e.target.value)}
                placeholder={equationType === 'quadratic' ? 
                  'Format: ax² + bx + c = 0' : 
                  equationType === 'system-linear' ?
                  'Format: ax + by = c' :
                  'Format: ax + b = c'}
                className="flex-1 bg-[#2A363F] text-[#E5E9E6] rounded-lg px-4 py-2 border border-[#4A5A66]/20 focus:outline-none focus:border-[#8B5CF6]"
              />
            </div>
          ))}

          {equationType.includes('system') && equations.length < 3 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addEquation}
              className="flex items-center gap-2 text-[#748D92] hover:text-[#E5E9E6] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Equation
            </motion.button>
          )}
        </div>

        {/* Solve Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSolve}
          className="w-full bg-[#8B5CF6] text-white py-3 rounded-lg font-medium hover:bg-[#7C3AED] transition-colors"
        >
          Solve
        </motion.button>

        {/* Result */}
        {error && (
          <div className="bg-[#EF4444]/10 text-[#EF4444] p-4 rounded-lg">
            {error}
          </div>
        )}

        {result && !error && (
          <div className="bg-[#2A363F] p-4 rounded-lg">
            <div className="flex items-center gap-2 text-[#E5E9E6]">
              <Equal className="w-4 h-4" />
              <span className="font-mono">{result}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 