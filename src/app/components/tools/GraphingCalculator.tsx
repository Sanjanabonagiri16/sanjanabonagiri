'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Settings, Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { line, curveMonotoneX } from 'd3-shape';
import { axisBottom, axisLeft } from 'd3-axis';

interface Function {
  id: string;
  expression: string;
  color: string;
  isVisible: boolean;
}

interface GraphingCalculatorProps {
  alwaysShow?: boolean;
}

export const GraphingCalculator = ({ alwaysShow = false }: GraphingCalculatorProps) => {
  const [functions, setFunctions] = useState<Function[]>([
    { id: '1', expression: 'x', color: '#3B82F6', isVisible: true },
  ]);
  const [viewWindow, setViewWindow] = useState({
    xMin: -10,
    xMax: 10,
    yMin: -10,
    yMax: 10,
  });
  const svgRef = useRef<SVGSVGElement>(null);

  const colors = [
    '#3B82F6', // Blue
    '#EF4444', // Red
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#8B5CF6', // Purple
    '#EC4899', // Pink
  ];

  const evaluateExpression = (expression: string, x: number): number => {
    try {
      // Replace common mathematical expressions with JavaScript equivalents
      const jsExpression = expression
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/log/g, 'Math.log10')
        .replace(/ln/g, 'Math.log')
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/\^/g, '**')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E');

      // Create a function from the expression
      const fn = new Function('x', `return ${jsExpression}`);
      return fn(x);
    } catch (error) {
      console.error('Error evaluating expression:', error);
      return NaN;
    }
  };

  const drawGraph = () => {
    if (!svgRef.current) return;

    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Clear previous content
    select(svgRef.current).selectAll('*').remove();

    // Create scales
    const xScale = scaleLinear()
      .domain([viewWindow.xMin, viewWindow.xMax])
      .range([0, innerWidth]);

    const yScale = scaleLinear()
      .domain([viewWindow.yMin, viewWindow.yMax])
      .range([innerHeight, 0]);

    // Create SVG
    const svg = select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Draw axes
    svg.append('g')
      .attr('transform', `translate(0,${yScale(0)})`)
      .call(axisBottom(xScale))
      .attr('class', 'text-[#748D92]');

    svg.append('g')
      .attr('transform', `translate(${xScale(0)},0)`)
      .call(axisLeft(yScale))
      .attr('class', 'text-[#748D92]');

    // Draw grid
    svg.append('g')
      .attr('class', 'grid')
      .selectAll('line')
      .data(xScale.ticks())
      .enter()
      .append('line')
      .attr('x1', (d: number) => xScale(d))
      .attr('x2', (d: number) => xScale(d))
      .attr('y1', 0)
      .attr('y2', innerHeight)
      .attr('stroke', '#2A363F')
      .attr('stroke-width', 0.5);

    svg.append('g')
      .attr('class', 'grid')
      .selectAll('line')
      .data(yScale.ticks())
      .enter()
      .append('line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', (d: number) => yScale(d))
      .attr('y2', (d: number) => yScale(d))
      .attr('stroke', '#2A363F')
      .attr('stroke-width', 0.5);

    // Plot functions
    functions.forEach(func => {
      if (!func.isVisible) return;

      const points: [number, number][] = [];
      const step = (viewWindow.xMax - viewWindow.xMin) / 200;

      for (let x = viewWindow.xMin; x <= viewWindow.xMax; x += step) {
        const y = evaluateExpression(func.expression, x);
        if (!isNaN(y) && isFinite(y)) {
          points.push([x, y]);
        }
      }

      const graphLine = line<[number, number]>()
        .x(d => xScale(d[0]))
        .y(d => yScale(d[1]))
        .curve(curveMonotoneX);

      svg.append('path')
        .datum(points)
        .attr('fill', 'none')
        .attr('stroke', func.color)
        .attr('stroke-width', 2)
        .attr('d', graphLine);
    });
  };

  useEffect(() => {
    drawGraph();
  }, [functions, viewWindow]);

  const addFunction = () => {
    const newId = (functions.length + 1).toString();
    const newColor = colors[functions.length % colors.length];
    setFunctions([...functions, { id: newId, expression: 'x', color: newColor, isVisible: true }]);
  };

  const updateFunction = (id: string, expression: string) => {
    setFunctions(functions.map(f => 
      f.id === id ? { ...f, expression } : f
    ));
  };

  const toggleFunction = (id: string) => {
    setFunctions(functions.map(f =>
      f.id === id ? { ...f, isVisible: !f.isVisible } : f
    ));
  };

  const deleteFunction = (id: string) => {
    setFunctions(functions.filter(f => f.id !== id));
  };

  return (
    <div className="bg-[#1A2830] rounded-xl p-6 shadow-xl w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <LineChart className="w-6 h-6 text-[#3B82F6]" />
          <h2 className="text-xl font-semibold text-[#E5E9E6]">Graphing Calculator</h2>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => addFunction()}
          className="flex items-center gap-2 px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Function
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Functions Panel */}
        <div className="space-y-4">
          {functions.map((func) => (
            <div key={func.id} className="bg-[#2A363F] rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: func.color }} />
                  <span className="text-[#E5E9E6] font-medium">f{func.id}(x) =</span>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleFunction(func.id)}
                    className="text-[#748D92] hover:text-[#E5E9E6] transition-colors"
                  >
                    {func.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => deleteFunction(func.id)}
                    className="text-[#748D92] hover:text-[#EF4444] transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
              <input
                type="text"
                value={func.expression}
                onChange={(e) => updateFunction(func.id, e.target.value)}
                className="w-full bg-[#1A2830] text-[#E5E9E6] rounded-lg px-3 py-2 border border-[#4A5A66]/20 focus:outline-none focus:border-[#3B82F6]"
                placeholder="Enter function (e.g., x^2)"
              />
            </div>
          ))}

          {/* View Window Settings */}
          <div className="bg-[#2A363F] rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Settings className="w-4 h-4 text-[#748D92]" />
              <span className="text-[#E5E9E6] font-medium">View Window</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-[#748D92] mb-1 block">X Min</label>
                <input
                  type="number"
                  value={viewWindow.xMin}
                  onChange={(e) => setViewWindow({ ...viewWindow, xMin: parseFloat(e.target.value) })}
                  className="w-full bg-[#1A2830] text-[#E5E9E6] rounded-lg px-3 py-2 border border-[#4A5A66]/20 focus:outline-none focus:border-[#3B82F6]"
                />
              </div>
              <div>
                <label className="text-xs text-[#748D92] mb-1 block">X Max</label>
                <input
                  type="number"
                  value={viewWindow.xMax}
                  onChange={(e) => setViewWindow({ ...viewWindow, xMax: parseFloat(e.target.value) })}
                  className="w-full bg-[#1A2830] text-[#E5E9E6] rounded-lg px-3 py-2 border border-[#4A5A66]/20 focus:outline-none focus:border-[#3B82F6]"
                />
              </div>
              <div>
                <label className="text-xs text-[#748D92] mb-1 block">Y Min</label>
                <input
                  type="number"
                  value={viewWindow.yMin}
                  onChange={(e) => setViewWindow({ ...viewWindow, yMin: parseFloat(e.target.value) })}
                  className="w-full bg-[#1A2830] text-[#E5E9E6] rounded-lg px-3 py-2 border border-[#4A5A66]/20 focus:outline-none focus:border-[#3B82F6]"
                />
              </div>
              <div>
                <label className="text-xs text-[#748D92] mb-1 block">Y Max</label>
                <input
                  type="number"
                  value={viewWindow.yMax}
                  onChange={(e) => setViewWindow({ ...viewWindow, yMax: parseFloat(e.target.value) })}
                  className="w-full bg-[#1A2830] text-[#E5E9E6] rounded-lg px-3 py-2 border border-[#4A5A66]/20 focus:outline-none focus:border-[#3B82F6]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Graph Panel */}
        <div className="lg:col-span-2 bg-[#2A363F] rounded-lg p-4">
          <svg ref={svgRef} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}; 