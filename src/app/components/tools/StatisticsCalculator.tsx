import { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { ToolsLayout } from './ToolsLayout';

interface StatisticsResult {
  mean: number | null;
  median: number | null;
  mode: number[] | string;
  standardDeviation: number | null;
}

export const StatisticsCalculator = () => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<StatisticsResult>({
    mean: null,
    median: null,
    mode: 'No mode',
    standardDeviation: null,
  });
  const [error, setError] = useState<string>('');

  const calculateStatistics = () => {
    setError('');
    
    // Parse input string into array of numbers
    const values = input
      .trim()
      .split(/\s+/)
      .filter(val => val !== '')
      .map(val => parseFloat(val));
    
    // Validate input
    if (values.length === 0) {
      setError('No data entered.');
      return;
    }
    
    if (values.some(val => isNaN(val))) {
      setError('Please enter valid numbers only.');
      return;
    }
    
    // Calculate mean
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    
    // Calculate median
    const sortedValues = [...values].sort((a, b) => a - b);
    let median: number;
    
    if (sortedValues.length % 2 === 0) {
      // Even number of values
      const midIndex = sortedValues.length / 2;
      median = (sortedValues[midIndex - 1] + sortedValues[midIndex]) / 2;
    } else {
      // Odd number of values
      median = sortedValues[Math.floor(sortedValues.length / 2)];
    }
    
    // Calculate mode
    const frequencyMap = new Map<number, number>();
    values.forEach(val => {
      frequencyMap.set(val, (frequencyMap.get(val) || 0) + 1);
    });
    
    let maxFrequency = 0;
    for (const frequency of frequencyMap.values()) {
      maxFrequency = Math.max(maxFrequency, frequency);
    }
    
    let mode: number[] | string = [];
    if (maxFrequency === 1) {
      mode = 'No mode';
    } else {
      for (const [value, frequency] of frequencyMap.entries()) {
        if (frequency === maxFrequency) {
          (mode as number[]).push(value);
        }
      }
    }
    
    // Calculate standard deviation (population)
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    const standardDeviation = Math.sqrt(variance);
    
    setResult({
      mean,
      median,
      mode,
      standardDeviation,
    });
  };

  const formatMode = (mode: number[] | string): string => {
    if (typeof mode === 'string') {
      return mode;
    }
    return mode.join(', ');
  };

  return (
    <ToolsLayout title="Statistics Calculator" icon={<BarChart3 className="w-5 h-5" />}>
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#748D92] mb-2">
              Enter numbers separated by spaces
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., 1 2 2 3 4.5"
              className="w-full bg-[#1A2127] text-[#E5E9E6] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1A6F94] placeholder-[#748D92]/50 min-h-[100px]"
            />
          </div>

          <button
            onClick={calculateStatistics}
            className="w-full bg-[#1A6F94] hover:bg-[#1A6F94]/90 text-white rounded-lg px-4 py-2 transition-colors"
          >
            Calculate
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        {result.mean !== null && (
          <div className="space-y-4 bg-[#1A2127] rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-[#748D92]">Mean</p>
                <p className="text-lg font-mono text-[#E5E9E6]">{result.mean.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-[#748D92]">Median</p>
                <p className="text-lg font-mono text-[#E5E9E6]">{result.median?.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-[#748D92]">Mode</p>
                <p className="text-lg font-mono text-[#E5E9E6]">{formatMode(result.mode)}</p>
              </div>
              <div>
                <p className="text-sm text-[#748D92]">Standard Deviation</p>
                <p className="text-lg font-mono text-[#E5E9E6]">{result.standardDeviation?.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolsLayout>
  );
}; 