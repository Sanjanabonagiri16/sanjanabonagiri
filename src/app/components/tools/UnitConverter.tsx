import { useState } from 'react';
import { Ruler } from 'lucide-react';
import { ToolsLayout } from './ToolsLayout';

type Category = 'length' | 'weight' | 'volume' | 'temperature' | 'area' | 'speed' | 'time';

interface Unit {
  name: string;
  symbol: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

interface CategoryData {
  name: string;
  baseUnit: string;
  units: Record<string, Unit>;
}

const categories: Record<Category, CategoryData> = {
  length: {
    name: 'Length',
    baseUnit: 'm',
    units: {
      m: { name: 'Meters', symbol: 'm', toBase: (v) => v, fromBase: (v) => v },
      km: { name: 'Kilometers', symbol: 'km', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      cm: { name: 'Centimeters', symbol: 'cm', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      mm: { name: 'Millimeters', symbol: 'mm', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      in: { name: 'Inches', symbol: 'in', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
      ft: { name: 'Feet', symbol: 'ft', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      yd: { name: 'Yards', symbol: 'yd', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
      mi: { name: 'Miles', symbol: 'mi', toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
    },
  },
  weight: {
    name: 'Weight',
    baseUnit: 'kg',
    units: {
      g: { name: 'Grams', symbol: 'g', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      kg: { name: 'Kilograms', symbol: 'kg', toBase: (v) => v, fromBase: (v) => v },
      mg: { name: 'Milligrams', symbol: 'mg', toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
      lb: { name: 'Pounds', symbol: 'lb', toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
      oz: { name: 'Ounces', symbol: 'oz', toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
      t: { name: 'Tons', symbol: 't', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    },
  },
  volume: {
    name: 'Volume',
    baseUnit: 'L',
    units: {
      L: { name: 'Liters', symbol: 'L', toBase: (v) => v, fromBase: (v) => v },
      mL: { name: 'Milliliters', symbol: 'mL', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      m3: { name: 'Cubic Meters', symbol: 'm³', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      gal: { name: 'Gallons', symbol: 'gal', toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
      qt: { name: 'Quarts', symbol: 'qt', toBase: (v) => v * 0.946353, fromBase: (v) => v / 0.946353 },
      pt: { name: 'Pints', symbol: 'pt', toBase: (v) => v * 0.473176, fromBase: (v) => v / 0.473176 },
      cup: { name: 'Cups', symbol: 'c', toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
      floz: { name: 'Fluid Ounces', symbol: 'fl oz', toBase: (v) => v * 0.0295735, fromBase: (v) => v / 0.0295735 },
    },
  },
  temperature: {
    name: 'Temperature',
    baseUnit: '°C',
    units: {
      C: { 
        name: 'Celsius', 
        symbol: '°C', 
        toBase: (v) => v, 
        fromBase: (v) => v 
      },
      F: { 
        name: 'Fahrenheit', 
        symbol: '°F', 
        toBase: (v) => (v - 32) * 5/9, 
        fromBase: (v) => v * 9/5 + 32 
      },
      K: { 
        name: 'Kelvin', 
        symbol: 'K', 
        toBase: (v) => v - 273.15, 
        fromBase: (v) => v + 273.15 
      },
    },
  },
  area: {
    name: 'Area',
    baseUnit: 'm²',
    units: {
      m2: { name: 'Square Meters', symbol: 'm²', toBase: (v) => v, fromBase: (v) => v },
      km2: { name: 'Square Kilometers', symbol: 'km²', toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
      ft2: { name: 'Square Feet', symbol: 'ft²', toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
      acre: { name: 'Acres', symbol: 'acre', toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
    },
  },
  speed: {
    name: 'Speed',
    baseUnit: 'm/s',
    units: {
      mps: { name: 'Meters per Second', symbol: 'm/s', toBase: (v) => v, fromBase: (v) => v },
      kph: { name: 'Kilometers per Hour', symbol: 'km/h', toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
      mph: { name: 'Miles per Hour', symbol: 'mph', toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
    },
  },
  time: {
    name: 'Time',
    baseUnit: 's',
    units: {
      s: { name: 'Seconds', symbol: 's', toBase: (v) => v, fromBase: (v) => v },
      min: { name: 'Minutes', symbol: 'min', toBase: (v) => v * 60, fromBase: (v) => v / 60 },
      h: { name: 'Hours', symbol: 'h', toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
      d: { name: 'Days', symbol: 'd', toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
    },
  },
};

export const UnitConverter = () => {
  const [category, setCategory] = useState<Category>('length');
  const [fromUnit, setFromUnit] = useState<string>(categories[category].baseUnit);
  const [toUnit, setToUnit] = useState<string>(categories[category].baseUnit);
  const [value, setValue] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [precision, setPrecision] = useState<number>(4);

  const handleConvert = () => {
    setError('');
    const numValue = parseFloat(value);
    
    if (isNaN(numValue)) {
      setError('Please enter a valid number');
      setResult('');
      return;
    }

    try {
      const categoryData = categories[category];
      const fromUnitData = categoryData.units[fromUnit];
      const toUnitData = categoryData.units[toUnit];

      // Convert to base unit first
      const baseValue = fromUnitData.toBase(numValue);
      // Then convert from base unit to target unit
      const resultValue = toUnitData.fromBase(baseValue);

      setResult(resultValue.toFixed(precision));
    } catch (e) {
      setError('Conversion error occurred');
      setResult('');
    }
  };

  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
    setFromUnit(categories[newCategory].baseUnit);
    setToUnit(categories[newCategory].baseUnit);
    setResult('');
  };

  return (
    <ToolsLayout title="Unit Converter" icon={<Ruler className="w-5 h-5" />}>
      <div className="space-y-6">
        <div className="space-y-4">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-[#748D92] mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value as Category)}
              className="w-full bg-[#1A2127] text-[#E5E9E6] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1A6F94]"
            >
              {Object.entries(categories).map(([key, { name }]) => (
                <option key={key} value={key}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          {/* From Unit */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-[#748D92] mb-2">
                From
              </label>
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter value"
                className="w-full bg-[#1A2127] text-[#E5E9E6] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1A6F94] placeholder-[#748D92]/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#748D92] mb-2">
                Unit
              </label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full bg-[#1A2127] text-[#E5E9E6] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1A6F94]"
              >
                {Object.entries(categories[category].units).map(([key, { name }]) => (
                  <option key={key} value={key}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* To Unit */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-[#748D92] mb-2">
                Result
              </label>
              <input
                type="text"
                value={result}
                readOnly
                className="w-full bg-[#1A2127] text-[#E5E9E6] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1A6F94] font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#748D92] mb-2">
                Unit
              </label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full bg-[#1A2127] text-[#E5E9E6] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1A6F94]"
              >
                {Object.entries(categories[category].units).map(([key, { name }]) => (
                  <option key={key} value={key}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Precision Control */}
          <div>
            <label className="block text-sm font-medium text-[#748D92] mb-2">
              Decimal Places
            </label>
            <input
              type="number"
              min="0"
              max="10"
              value={precision}
              onChange={(e) => setPrecision(parseInt(e.target.value))}
              className="w-full bg-[#1A2127] text-[#E5E9E6] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1A6F94]"
            />
          </div>

          <button
            onClick={handleConvert}
            className="w-full bg-[#1A6F94] hover:bg-[#1A6F94]/90 text-white rounded-lg px-4 py-2 transition-colors"
          >
            Convert
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}
      </div>
    </ToolsLayout>
  );
}; 