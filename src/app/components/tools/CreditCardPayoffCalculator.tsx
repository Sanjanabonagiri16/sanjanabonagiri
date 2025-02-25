'use client';

import { useState } from 'react';
import { CreditCard } from 'lucide-react';

interface Props {
  alwaysShow?: boolean;
}

export const CreditCardPayoffCalculator = ({ alwaysShow = false }: Props) => {
  const [balance, setBalance] = useState<string>('');
  const [apr, setApr] = useState<string>('');
  const [mode, setMode] = useState<'payment' | 'timeframe'>('payment');
  const [monthlyPayment, setMonthlyPayment] = useState<string>('');
  const [months, setMonths] = useState<string>('');
  const [result, setResult] = useState<{
    months?: number;
    payment?: number;
    totalInterest: number;
  } | null>(null);

  const calculatePayoff = () => {
    const balanceNum = parseFloat(balance);
    const aprNum = parseFloat(apr) / 100;
    const monthlyRate = aprNum / 12;

    if (mode === 'payment') {
      const paymentNum = parseFloat(monthlyPayment);
      
      // Check if payment is sufficient
      const minPayment = balanceNum * monthlyRate;
      if (paymentNum <= minPayment) {
        alert('Monthly payment is too low to pay off the debt. It should be higher than the monthly interest.');
        return;
      }

      let currentBalance = balanceNum;
      let monthCount = 0;
      let totalInterest = 0;

      while (currentBalance > 0) {
        const monthlyInterest = currentBalance * monthlyRate;
        totalInterest += monthlyInterest;
        
        if (currentBalance + monthlyInterest <= paymentNum) {
          // Last payment
          monthCount++;
          break;
        }
        
        currentBalance = currentBalance + monthlyInterest - paymentNum;
        monthCount++;

        if (monthCount > 1200) { // 100 years safety check
          alert('The calculation exceeded reasonable limits. Please check your inputs.');
          return;
        }
      }

      setResult({
        months: monthCount,
        totalInterest: Math.round(totalInterest * 100) / 100
      });
    } else {
      const monthsNum = parseInt(months);
      
      if (monthsNum <= 0) {
        alert('Please enter a valid number of months.');
        return;
      }

      // Calculate required monthly payment using the amortization formula
      const payment = monthlyRate === 0
        ? balanceNum / monthsNum
        : (balanceNum * monthlyRate * Math.pow(1 + monthlyRate, monthsNum)) / (Math.pow(1 + monthlyRate, monthsNum) - 1);
      
      const totalInterest = (payment * monthsNum) - balanceNum;

      setResult({
        payment: Math.round(payment * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100
      });
    }
  };

  return (
    <div className="bg-[#2A363F] rounded-xl p-6 shadow-xl">
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Current Balance ($)</label>
            <input
              type="number"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              className="w-full px-3 py-2 bg-[#1F2937] rounded-md border border-[#374151] focus:outline-none focus:ring-2 focus:ring-[#1A6F94]"
              placeholder="Enter current balance"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Annual Percentage Rate (APR %)</label>
            <input
              type="number"
              value={apr}
              onChange={(e) => setApr(e.target.value)}
              className="w-full px-3 py-2 bg-[#1F2937] rounded-md border border-[#374151] focus:outline-none focus:ring-2 focus:ring-[#1A6F94]"
              placeholder="Enter APR"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Calculation Mode</label>
            <div className="flex gap-4">
              <button
                onClick={() => setMode('payment')}
                className={`px-4 py-2 rounded-md ${
                  mode === 'payment'
                    ? 'bg-[#1A6F94] text-white'
                    : 'bg-[#1F2937] text-[#748D92] hover:bg-[#1A6F94]/20'
                }`}
              >
                Fixed Payment
              </button>
              <button
                onClick={() => setMode('timeframe')}
                className={`px-4 py-2 rounded-md ${
                  mode === 'timeframe'
                    ? 'bg-[#1A6F94] text-white'
                    : 'bg-[#1F2937] text-[#748D92] hover:bg-[#1A6F94]/20'
                }`}
              >
                Fixed Timeframe
              </button>
            </div>
          </div>

          {mode === 'payment' ? (
            <div>
              <label className="block text-sm font-medium mb-1">Monthly Payment ($)</label>
              <input
                type="number"
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(e.target.value)}
                className="w-full px-3 py-2 bg-[#1F2937] rounded-md border border-[#374151] focus:outline-none focus:ring-2 focus:ring-[#1A6F94]"
                placeholder="Enter monthly payment"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-1">Number of Months</label>
              <input
                type="number"
                value={months}
                onChange={(e) => setMonths(e.target.value)}
                className="w-full px-3 py-2 bg-[#1F2937] rounded-md border border-[#374151] focus:outline-none focus:ring-2 focus:ring-[#1A6F94]"
                placeholder="Enter number of months"
              />
            </div>
          )}
        </div>

        <button
          onClick={calculatePayoff}
          className="w-full bg-[#1A6F94] text-white py-2 rounded-md hover:bg-[#1A6F94]/90 transition-colors"
        >
          Calculate
        </button>

        {result && (
          <div className="mt-6 p-4 bg-[#1F2937] rounded-lg">
            <h4 className="text-lg font-medium mb-3">Results</h4>
            <div className="space-y-2 text-[#748D92]">
              {result.months && (
                <p>Time to pay off: <span className="text-white">{result.months} months</span></p>
              )}
              {result.payment && (
                <p>Required monthly payment: <span className="text-white">${result.payment}</span></p>
              )}
              <p>Total interest paid: <span className="text-white">${result.totalInterest}</span></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 