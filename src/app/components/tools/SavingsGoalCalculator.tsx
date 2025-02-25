'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PiggyBank, Calculator, Info } from 'lucide-react';

interface SavingsGoalCalculatorProps {
  alwaysShow?: boolean;
}

type SavingFrequency = 'monthly' | 'weekly' | 'bi-weekly';

interface CalculationResult {
  regularSavings: number;
  totalPeriods: number;
  finalAmount: number;
  withInterest: boolean;
}

export const SavingsGoalCalculator = ({ alwaysShow = false }: SavingsGoalCalculatorProps) => {
  const [goal, setGoal] = useState<string>('10000');
  const [initial, setInitial] = useState<string>('0');
  const [frequency, setFrequency] = useState<SavingFrequency>('monthly');
  const [years, setYears] = useState<string>('2');
  const [interestRate, setInterestRate] = useState<string>('0');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string>('');

  const calculatePeriodsPerYear = (freq: SavingFrequency): number => {
    switch (freq) {
      case 'monthly': return 12;
      case 'weekly': return 52;
      case 'bi-weekly': return 26;
      default: return 12;
    }
  };

  const calculate = () => {
    setError('');
    setResult(null);

    try {
      const goalAmount = parseFloat(goal);
      const initialAmount = parseFloat(initial);
      const yearsToSave = parseFloat(years);
      const annualRate = parseFloat(interestRate) / 100;
      const periodsPerYear = calculatePeriodsPerYear(frequency);
      const totalPeriods = yearsToSave * periodsPerYear;

      if (isNaN(goalAmount) || goalAmount <= 0) throw new Error('Please enter a valid goal amount');
      if (isNaN(initialAmount) || initialAmount < 0) throw new Error('Initial amount cannot be negative');
      if (isNaN(yearsToSave) || yearsToSave <= 0) throw new Error('Please enter a valid time frame');
      if (isNaN(annualRate) || annualRate < 0) throw new Error('Interest rate cannot be negative');

      if (initialAmount >= goalAmount) {
        setResult({
          regularSavings: 0,
          totalPeriods,
          finalAmount: initialAmount,
          withInterest: annualRate > 0
        });
        return;
      }

      let regularSavings: number;
      if (annualRate === 0) {
        // Without interest
        regularSavings = (goalAmount - initialAmount) / totalPeriods;
      } else {
        // With interest
        const r = annualRate / periodsPerYear; // per-period rate
        const n = totalPeriods;
        const P = initialAmount;
        const F = goalAmount;

        // Using the formula for future value of annuity with initial principal
        const numerator = F - P * Math.pow(1 + r, n);
        const denominator = ((Math.pow(1 + r, n) - 1) / r);
        regularSavings = numerator / denominator;
      }

      setResult({
        regularSavings,
        totalPeriods,
        finalAmount: goalAmount,
        withInterest: annualRate > 0
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error calculating savings');
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="bg-[#1A2830] rounded-xl p-6 shadow-xl w-full max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <PiggyBank className="w-6 h-6 text-[#22C55E]" />
        <h2 className="text-xl font-semibold text-[#E5E9E6]">Savings Goal Calculator</h2>
      </div>

      <div className="space-y-6">
        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[#748D92] text-sm">Total Savings Goal</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#748D92]">$</span>
                <input
                  type="number"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full bg-[#2A363F] text-[#E5E9E6] rounded-lg pl-8 pr-4 py-2 border border-[#4A5A66]/20 focus:outline-none focus:border-[#22C55E]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[#748D92] text-sm">Initial Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#748D92]">$</span>
                <input
                  type="number"
                  value={initial}
                  onChange={(e) => setInitial(e.target.value)}
                  className="w-full bg-[#2A363F] text-[#E5E9E6] rounded-lg pl-8 pr-4 py-2 border border-[#4A5A66]/20 focus:outline-none focus:border-[#22C55E]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[#748D92] text-sm">Saving Frequency</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as SavingFrequency)}
                className="w-full bg-[#2A363F] text-[#E5E9E6] rounded-lg px-4 py-2 border border-[#4A5A66]/20 focus:outline-none focus:border-[#22C55E]"
              >
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="bi-weekly">Bi-Weekly</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[#748D92] text-sm">Time Frame (Years)</label>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                min="0.1"
                step="0.1"
                className="w-full bg-[#2A363F] text-[#E5E9E6] rounded-lg px-4 py-2 border border-[#4A5A66]/20 focus:outline-none focus:border-[#22C55E]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[#748D92] text-sm">Annual Interest Rate (%)</label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                min="0"
                step="0.1"
                className="w-full bg-[#2A363F] text-[#E5E9E6] rounded-lg px-4 py-2 border border-[#4A5A66]/20 focus:outline-none focus:border-[#22C55E]"
              />
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={calculate}
          className="w-full bg-[#22C55E] text-white py-3 rounded-lg font-medium hover:bg-[#16A34A] transition-colors"
        >
          Calculate Savings Plan
        </motion.button>

        {/* Error Message */}
        {error && (
          <div className="bg-[#EF4444]/10 text-[#EF4444] p-4 rounded-lg">
            {error}
          </div>
        )}

        {/* Results */}
        {result && !error && (
          <div className="space-y-4 bg-[#2A363F] p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[#748D92] text-sm">Required {frequency} Savings</span>
                <p className="text-[#22C55E] text-2xl font-mono">
                  {formatCurrency(result.regularSavings)}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[#748D92] text-sm">Total Periods</span>
                <p className="text-[#E5E9E6] text-xl font-mono">
                  {result.totalPeriods}
                </p>
              </div>
            </div>

            {result.withInterest && (
              <div className="mt-4 pt-4 border-t border-[#4A5A66]/20 flex items-start gap-2">
                <Info className="w-4 h-4 text-[#748D92] mt-1 flex-shrink-0" />
                <p className="text-[#748D92] text-sm">
                  This calculation includes compound interest at {interestRate}% APR, 
                  compounding at your selected {frequency} frequency.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}; 