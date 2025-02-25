import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Plus, Trash2, DollarSign } from 'lucide-react';

interface TimeEntry {
  id: string;
  date: string;
  clockIn: string;
  clockOut: string;
}

interface TimeCardCalculatorProps {
  alwaysShow?: boolean;
}

export const TimeCardCalculator = ({ alwaysShow = false }: TimeCardCalculatorProps) => {
  const [entries, setEntries] = useState<TimeEntry[]>([
    { id: '1', date: '', clockIn: '', clockOut: '' }
  ]);
  const [hourlyWage, setHourlyWage] = useState<string>('15.00');
  const [result, setResult] = useState<{
    totalHours: number;
    totalWages: number;
    dailyBreakdown: { [key: string]: number };
  } | null>(null);
  const [error, setError] = useState<string>('');

  const addEntry = () => {
    setEntries([
      ...entries,
      { id: Date.now().toString(), date: '', clockIn: '', clockOut: '' }
    ]);
  };

  const removeEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const updateEntry = (id: string, field: keyof TimeEntry, value: string) => {
    setEntries(entries.map(entry =>
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const calculateMinutesSinceMidnight = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const calculateDuration = (clockIn: string, clockOut: string): number => {
    let startMinutes = calculateMinutesSinceMidnight(clockIn);
    let endMinutes = calculateMinutesSinceMidnight(clockOut);
    
    // Handle overnight shifts
    if (endMinutes < startMinutes) {
      endMinutes += 24 * 60; // Add 24 hours
    }
    
    return endMinutes - startMinutes;
  };

  const calculateTotalHours = () => {
    setError('');
    setResult(null);

    try {
      // Validate entries
      for (const entry of entries) {
        if (!entry.date || !entry.clockIn || !entry.clockOut) {
          throw new Error('Please fill in all fields');
        }
        
        // Validate time format
        const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(entry.clockIn) || !timeRegex.test(entry.clockOut)) {
          throw new Error('Invalid time format. Please use HH:MM (24-hour format)');
        }
      }

      // Calculate hours by date
      const dailyBreakdown: { [key: string]: number } = {};
      let totalMinutes = 0;

      entries.forEach(entry => {
        const duration = calculateDuration(entry.clockIn, entry.clockOut);
        totalMinutes += duration;
        
        if (entry.date in dailyBreakdown) {
          dailyBreakdown[entry.date] += duration;
        } else {
          dailyBreakdown[entry.date] = duration;
        }
      });

      const totalHours = totalMinutes / 60;
      const wage = parseFloat(hourlyWage);
      
      if (isNaN(wage) || wage <= 0) {
        throw new Error('Please enter a valid hourly wage');
      }

      // Convert daily minutes to hours
      const dailyHours: { [key: string]: number } = {};
      Object.entries(dailyBreakdown).forEach(([date, minutes]) => {
        dailyHours[date] = minutes / 60;
      });

      setResult({
        totalHours,
        totalWages: totalHours * wage,
        dailyBreakdown: dailyHours
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error calculating hours');
    }
  };

  return (
    <div className="bg-[#1A2830] rounded-xl p-6 shadow-xl w-full max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-6 h-6 text-[#F59E0B]" />
        <h2 className="text-xl font-semibold text-[#E5E9E6]">Time Card Calculator</h2>
      </div>

      <div className="space-y-6">
        {/* Hourly Wage Input */}
        <div className="flex items-center gap-4">
          <span className="text-[#748D92] font-medium">Hourly Wage:</span>
          <div className="relative">
            <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#748D92]" />
            <input
              type="number"
              value={hourlyWage}
              onChange={(e) => setHourlyWage(e.target.value)}
              step="0.01"
              min="0"
              className="w-32 bg-[#2A363F] text-[#E5E9E6] rounded-lg px-9 py-2 border border-[#4A5A66]/20 focus:outline-none focus:border-[#F59E0B]"
            />
          </div>
        </div>

        {/* Time Entries */}
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry.id} className="grid grid-cols-4 gap-4">
              <input
                type="date"
                value={entry.date}
                onChange={(e) => updateEntry(entry.id, 'date', e.target.value)}
                className="bg-[#2A363F] text-[#E5E9E6] rounded-lg px-4 py-2 border border-[#4A5A66]/20 focus:outline-none focus:border-[#F59E0B]"
              />
              <input
                type="text"
                value={entry.clockIn}
                onChange={(e) => updateEntry(entry.id, 'clockIn', e.target.value)}
                placeholder="Clock In (HH:MM)"
                className="bg-[#2A363F] text-[#E5E9E6] rounded-lg px-4 py-2 border border-[#4A5A66]/20 focus:outline-none focus:border-[#F59E0B]"
              />
              <input
                type="text"
                value={entry.clockOut}
                onChange={(e) => updateEntry(entry.id, 'clockOut', e.target.value)}
                placeholder="Clock Out (HH:MM)"
                className="bg-[#2A363F] text-[#E5E9E6] rounded-lg px-4 py-2 border border-[#4A5A66]/20 focus:outline-none focus:border-[#F59E0B]"
              />
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => removeEntry(entry.id)}
                className="text-[#748D92] hover:text-[#EF4444] transition-colors"
                disabled={entries.length === 1}
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
            </div>
          ))}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addEntry}
            className="flex items-center gap-2 text-[#748D92] hover:text-[#E5E9E6] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Time Entry
          </motion.button>
        </div>

        {/* Calculate Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={calculateTotalHours}
          className="w-full bg-[#F59E0B] text-white py-3 rounded-lg font-medium hover:bg-[#D97706] transition-colors"
        >
          Calculate
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[#748D92] text-sm">Total Hours</span>
                <p className="text-[#E5E9E6] text-xl font-mono">
                  {result.totalHours.toFixed(2)}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[#748D92] text-sm">Total Wages</span>
                <p className="text-[#E5E9E6] text-xl font-mono">
                  ${result.totalWages.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Daily Breakdown */}
            <div className="mt-4 pt-4 border-t border-[#4A5A66]/20">
              <h3 className="text-[#748D92] text-sm mb-2">Daily Breakdown</h3>
              <div className="space-y-2">
                {Object.entries(result.dailyBreakdown).map(([date, hours]) => (
                  <div key={date} className="flex justify-between text-sm">
                    <span className="text-[#E5E9E6]">{date}</span>
                    <span className="text-[#748D92] font-mono">{hours.toFixed(2)} hours</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 