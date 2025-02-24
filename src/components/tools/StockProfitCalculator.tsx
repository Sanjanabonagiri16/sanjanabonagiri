'use client';

import React, { useState } from 'react';

interface CalculatorInputs {
  buyingPrice: number;
  sellingPrice: number;
  numberOfShares: number;
  buyingFee: number;
  sellingFee: number;
}

interface CalculatorResults {
  totalBuyingCost: number;
  totalSellingRevenue: number;
  profitOrLoss: number;
  percentageGainOrLoss: number;
}

export const StockProfitCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    buyingPrice: 0,
    sellingPrice: 0,
    numberOfShares: 0,
    buyingFee: 0,
    sellingFee: 0,
  });

  const [results, setResults] = useState<CalculatorResults | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const calculateResults = () => {
    const totalBuyingCost = (inputs.buyingPrice * inputs.numberOfShares) + inputs.buyingFee;
    const totalSellingRevenue = (inputs.sellingPrice * inputs.numberOfShares) - inputs.sellingFee;
    const profitOrLoss = totalSellingRevenue - totalBuyingCost;
    const percentageGainOrLoss = (profitOrLoss / totalBuyingCost) * 100;

    setResults({
      totalBuyingCost,
      totalSellingRevenue,
      profitOrLoss,
      percentageGainOrLoss,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Stock Profit Calculator</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Buying Price per Share ($)</label>
          <input
            type="number"
            name="buyingPrice"
            value={inputs.buyingPrice || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Selling Price per Share ($)</label>
          <input
            type="number"
            name="sellingPrice"
            value={inputs.sellingPrice || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Shares</label>
          <input
            type="number"
            name="numberOfShares"
            value={inputs.numberOfShares || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Buying Transaction Fee ($)</label>
          <input
            type="number"
            name="buyingFee"
            value={inputs.buyingFee || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Selling Transaction Fee ($)</label>
          <input
            type="number"
            name="sellingFee"
            value={inputs.sellingFee || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="0"
            step="0.01"
          />
        </div>

        <button
          onClick={calculateResults}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Calculate
        </button>

        {results && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-semibold mb-3">Results</h3>
            <div className="space-y-2">
              <p className="text-sm">
                Total Buying Cost: <span className="font-medium">${results.totalBuyingCost.toFixed(2)}</span>
              </p>
              <p className="text-sm">
                Total Selling Revenue: <span className="font-medium">${results.totalSellingRevenue.toFixed(2)}</span>
              </p>
              <p className="text-sm">
                {results.profitOrLoss >= 0 ? 'Profit' : 'Loss'}:{' '}
                <span className={`font-medium ${results.profitOrLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${Math.abs(results.profitOrLoss).toFixed(2)}
                </span>
              </p>
              <p className="text-sm">
                Percentage {results.percentageGainOrLoss >= 0 ? 'Gain' : 'Loss'}:{' '}
                <span className={`font-medium ${results.percentageGainOrLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(results.percentageGainOrLoss).toFixed(2)}%
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 