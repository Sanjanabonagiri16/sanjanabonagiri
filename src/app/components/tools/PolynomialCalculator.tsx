import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Info } from 'lucide-react';

interface PolynomialCalculatorProps {
  alwaysShow?: boolean;
}

interface Polynomial {
  coefficients: number[];
  variable: string;
}

export const PolynomialCalculator = ({ alwaysShow = false }: PolynomialCalculatorProps) => {
  const [firstPolynomial, setFirstPolynomial] = useState<string>('');
  const [secondPolynomial, setSecondPolynomial] = useState<string>('');
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply' | 'divide' | 'factor'>('add');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const parsePolynomial = (input: string): Polynomial | null => {
    try {
      // Basic parsing for format like "2x^2 + 3x - 1"
      const terms = input.toLowerCase().replace(/\s/g, '').match(/[+-]?\d*x?\^?\d*|\d+/g) || [];
      const coefficients: number[] = [];
      let maxDegree = 0;
      
      terms.forEach(term => {
        const hasX = term.includes('x');
        const hasPower = term.includes('^');
        let coefficient = 1;
        let degree = 0;

        if (hasX) {
          const parts = term.split('x');
          coefficient = parts[0] ? (parts[0] === '-' ? -1 : parseFloat(parts[0])) : 1;
          degree = hasPower ? parseInt(parts[1].substring(1)) : 1;
        } else {
          coefficient = parseFloat(term);
          degree = 0;
        }

        maxDegree = Math.max(maxDegree, degree);
        coefficients[degree] = (coefficients[degree] || 0) + coefficient;
      });

      // Fill gaps with zeros and reverse to have highest degree first
      const fullCoefficients = Array(maxDegree + 1).fill(0);
      coefficients.forEach((coef, idx) => {
        if (coef) fullCoefficients[idx] = coef;
      });
      
      return {
        coefficients: fullCoefficients.reverse(), // Reverse to have highest degree first
        variable: 'x'
      };
    } catch (e) {
      setError('Invalid polynomial format');
      return null;
    }
  };

  const polynomialToString = (poly: Polynomial): string => {
    if (!poly.coefficients.length) return '0';

    return poly.coefficients
      .map((coef, idx) => {
        if (coef === 0) return '';
        const degree = poly.coefficients.length - 1 - idx;
        const sign = coef > 0 ? (idx === 0 ? '' : '+') : '';
        const coefficient = Math.abs(coef) === 1 && degree > 0 ? '' : Math.abs(coef).toString();
        const variable = degree > 0 ? poly.variable : '';
        const power = degree > 1 ? `^${degree}` : '';
        return `${sign}${coef < 0 ? '-' : ''}${coefficient}${variable}${power}`;
      })
      .filter(term => term)
      .join('') || '0';
  };

  const addPolynomials = (p1: Polynomial, p2: Polynomial): Polynomial => {
    const maxLength = Math.max(p1.coefficients.length, p2.coefficients.length);
    const result = Array(maxLength).fill(0);
    
    for (let i = 0; i < maxLength; i++) {
      result[i] = (p1.coefficients[i] || 0) + (p2.coefficients[i] || 0);
    }
    
    return { coefficients: result, variable: p1.variable };
  };

  const subtractPolynomials = (p1: Polynomial, p2: Polynomial): Polynomial => {
    const maxLength = Math.max(p1.coefficients.length, p2.coefficients.length);
    const result = Array(maxLength).fill(0);
    
    for (let i = 0; i < maxLength; i++) {
      result[i] = (p1.coefficients[i] || 0) - (p2.coefficients[i] || 0);
    }
    
    return { coefficients: result, variable: p1.variable };
  };

  const multiplyPolynomials = (p1: Polynomial, p2: Polynomial): Polynomial => {
    const resultLength = p1.coefficients.length + p2.coefficients.length - 1;
    const result = Array(resultLength).fill(0);
    
    for (let i = 0; i < p1.coefficients.length; i++) {
      for (let j = 0; j < p2.coefficients.length; j++) {
        result[i + j] += p1.coefficients[i] * p2.coefficients[j];
      }
    }
    
    return { coefficients: result, variable: p1.variable };
  };

  const handleCalculate = () => {
    setError('');
    const p1 = parsePolynomial(firstPolynomial);
    const p2 = parsePolynomial(secondPolynomial);

    if (!p1 || !p2) {
      setError('Invalid polynomial format');
      return;
    }

    let resultPoly: Polynomial | null = null;

    switch (operation) {
      case 'add':
        resultPoly = addPolynomials(p1, p2);
        break;
      case 'subtract':
        resultPoly = subtractPolynomials(p1, p2);
        break;
      case 'multiply':
        resultPoly = multiplyPolynomials(p1, p2);
        break;
      case 'divide':
        setError('Division not implemented yet');
        return;
      case 'factor':
        setError('Factoring not implemented yet');
        return;
    }

    if (resultPoly) {
      setResult(polynomialToString(resultPoly));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#2A363F] rounded-xl p-6 shadow-lg"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-[#E5E9E6] flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Polynomial Calculator
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="text-[#748D92] hover:text-[#E5E9E6] transition-colors"
            >
              <Info className="w-4 h-4" />
            </button>
          </h3>
        </div>

        {showInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#1A2127] rounded-lg p-4 text-sm text-[#748D92]"
          >
            <p>Enter polynomials in the format: ax^n + bx^(n-1) + ... + k</p>
            <p>Example: 2x^2 + 3x - 1</p>
          </motion.div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#748D92] mb-1">
              First Polynomial
            </label>
            <input
              type="text"
              value={firstPolynomial}
              onChange={(e) => setFirstPolynomial(e.target.value)}
              placeholder="e.g., 2x^2 + 3x - 1"
              className="w-full bg-[#1A2127] text-[#E5E9E6] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1A6F94]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#748D92] mb-1">
              Operation
            </label>
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value as any)}
              className="w-full bg-[#1A2127] text-[#E5E9E6] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1A6F94]"
            >
              <option value="add">Add (+)</option>
              <option value="subtract">Subtract (-)</option>
              <option value="multiply">Multiply (×)</option>
              <option value="divide">Divide (÷)</option>
              <option value="factor">Factor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#748D92] mb-1">
              Second Polynomial
            </label>
            <input
              type="text"
              value={secondPolynomial}
              onChange={(e) => setSecondPolynomial(e.target.value)}
              placeholder="e.g., x^2 - 4x + 5"
              className="w-full bg-[#1A2127] text-[#E5E9E6] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1A6F94]"
            />
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-[#1A6F94] hover:bg-[#1A6F94]/90 text-white rounded-lg px-4 py-2 transition-colors"
          >
            Calculate
          </button>

          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error}
            </div>
          )}

          {result && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-[#748D92] mb-1">
                Result
              </label>
              <div className="w-full bg-[#1A2127] text-[#E5E9E6] rounded-lg px-4 py-2">
                {result}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}; 