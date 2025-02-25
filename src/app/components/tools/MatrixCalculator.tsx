'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid, Plus, X, Divide, RotateCcw, Calculator } from 'lucide-react';

interface MatrixCalculatorProps {
  alwaysShow?: boolean;
}

type Matrix = number[][];
type Operation = 'add' | 'multiply' | 'invert' | 'scalar';

export const MatrixCalculator = ({ alwaysShow = false }: MatrixCalculatorProps) => {
  const [operation, setOperation] = useState<Operation>('add');
  const [matrixA, setMatrixA] = useState<Matrix>([[0, 0], [0, 0]]);
  const [matrixB, setMatrixB] = useState<Matrix>([[0, 0], [0, 0]]);
  const [scalar, setScalar] = useState<number>(1);
  const [result, setResult] = useState<Matrix | null>(null);
  const [error, setError] = useState<string>('');
  const [rowsA, setRowsA] = useState(2);
  const [colsA, setColsA] = useState(2);
  const [rowsB, setRowsB] = useState(2);
  const [colsB, setColsB] = useState(2);

  const createEmptyMatrix = (rows: number, cols: number): Matrix => {
    return Array(rows).fill(0).map(() => Array(cols).fill(0));
  };

  const resizeMatrix = (matrix: Matrix, rows: number, cols: number): Matrix => {
    const newMatrix = createEmptyMatrix(rows, cols);
    for (let i = 0; i < Math.min(matrix.length, rows); i++) {
      for (let j = 0; j < Math.min(matrix[0].length, cols); j++) {
        newMatrix[i][j] = matrix[i][j];
      }
    }
    return newMatrix;
  };

  const handleMatrixChange = (
    matrix: Matrix,
    setMatrix: (m: Matrix) => void,
    row: number,
    col: number,
    value: string
  ) => {
    const newMatrix = matrix.map(r => [...r]);
    newMatrix[row][col] = value === '' ? 0 : Number(value);
    setMatrix(newMatrix);
  };

  const addMatrices = (a: Matrix, b: Matrix): Matrix | null => {
    if (a.length !== b.length || a[0].length !== b[0].length) {
      setError('Matrices must have the same dimensions for addition');
      return null;
    }

    return a.map((row, i) => row.map((val, j) => val + b[i][j]));
  };

  const multiplyMatrices = (a: Matrix, b: Matrix): Matrix | null => {
    if (a[0].length !== b.length) {
      setError('Number of columns in first matrix must equal number of rows in second matrix');
      return null;
    }

    const result = Array(a.length).fill(0).map(() => Array(b[0].length).fill(0));
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b[0].length; j++) {
        for (let k = 0; k < b.length; k++) {
          result[i][j] += a[i][k] * b[k][j];
        }
      }
    }
    return result;
  };

  const multiplyByScalar = (matrix: Matrix, k: number): Matrix => {
    return matrix.map(row => row.map(val => val * k));
  };

  const calculateDeterminant = (matrix: Matrix): number => {
    if (matrix.length !== matrix[0].length) return 0;
    if (matrix.length === 1) return matrix[0][0];
    if (matrix.length === 2) {
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    let det = 0;
    for (let i = 0; i < matrix[0].length; i++) {
      det += matrix[0][i] * getCofactor(matrix, 0, i) * (i % 2 === 0 ? 1 : -1);
    }
    return det;
  };

  const getCofactor = (matrix: Matrix, row: number, col: number): number => {
    const subMatrix = matrix
      .filter((_, index) => index !== row)
      .map(row => row.filter((_, index) => index !== col));
    return calculateDeterminant(subMatrix);
  };

  const invertMatrix = (matrix: Matrix): Matrix | null => {
    if (matrix.length !== matrix[0].length) {
      setError('Matrix must be square for inversion');
      return null;
    }

    const det = calculateDeterminant(matrix);
    if (det === 0) {
      setError('Matrix is not invertible (determinant is 0)');
      return null;
    }

    const n = matrix.length;
    const adjugate = Array(n).fill(0).map(() => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        adjugate[j][i] = getCofactor(matrix, i, j) * ((i + j) % 2 === 0 ? 1 : -1);
      }
    }

    return adjugate.map(row => row.map(val => val / det));
  };

  const calculate = () => {
    setError('');
    let result: Matrix | null = null;

    try {
      switch (operation) {
        case 'add':
          result = addMatrices(matrixA, matrixB);
          break;
        case 'multiply':
          result = multiplyMatrices(matrixA, matrixB);
          break;
        case 'scalar':
          result = multiplyByScalar(matrixA, scalar);
          break;
        case 'invert':
          result = invertMatrix(matrixA);
          break;
      }
      setResult(result);
    } catch (err) {
      setError('Error performing calculation');
    }
  };

  const renderMatrix = (
    matrix: Matrix,
    setMatrix: (m: Matrix) => void,
    label: string
  ) => (
    <div className="space-y-2">
      <span className="text-[#748D92] text-sm font-medium">{label}</span>
      <div className="grid gap-2 bg-[#2A363F] p-4 rounded-lg">
        {matrix.map((row, i) => (
          <div key={i} className="flex gap-2">
            {row.map((val, j) => (
              <input
                key={j}
                type="number"
                value={val}
                onChange={(e) => handleMatrixChange(matrix, setMatrix, i, j, e.target.value)}
                className="w-16 h-10 bg-[#1A2830] text-[#E5E9E6] rounded-lg px-2 text-center border border-[#4A5A66]/20 focus:outline-none focus:border-[#3B82F6]"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-[#1A2830] rounded-xl p-6 shadow-xl w-full max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Grid className="w-6 h-6 text-[#10B981]" />
        <h2 className="text-xl font-semibold text-[#E5E9E6]">Matrix Calculator</h2>
      </div>

      <div className="space-y-6">
        {/* Operation Selection */}
        <div className="flex flex-wrap gap-3">
          {[
            { op: 'add' as Operation, icon: Plus, label: 'Add' },
            { op: 'multiply' as Operation, icon: X, label: 'Multiply' },
            { op: 'scalar' as Operation, icon: Calculator, label: 'Scalar Multiply' },
            { op: 'invert' as Operation, icon: RotateCcw, label: 'Invert' },
          ].map(({ op, icon: Icon, label }) => (
            <motion.button
              key={op}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOperation(op)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                operation === op
                  ? 'bg-[#10B981] text-white'
                  : 'bg-[#2A363F] text-[#748D92] hover:text-[#E5E9E6]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </motion.button>
          ))}
        </div>

        {/* Matrix Dimensions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <span className="text-[#748D92] text-sm font-medium">Matrix A Dimensions</span>
            <div className="flex gap-4">
              <div className="space-y-1">
                <label className="text-xs text-[#748D92]">Rows</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={rowsA}
                  onChange={(e) => {
                    const newRows = Math.min(5, Math.max(1, parseInt(e.target.value)));
                    setRowsA(newRows);
                    setMatrixA(resizeMatrix(matrixA, newRows, colsA));
                  }}
                  className="w-20 h-10 bg-[#2A363F] text-[#E5E9E6] rounded-lg px-3 border border-[#4A5A66]/20 focus:outline-none focus:border-[#3B82F6]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-[#748D92]">Columns</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={colsA}
                  onChange={(e) => {
                    const newCols = Math.min(5, Math.max(1, parseInt(e.target.value)));
                    setColsA(newCols);
                    setMatrixA(resizeMatrix(matrixA, rowsA, newCols));
                  }}
                  className="w-20 h-10 bg-[#2A363F] text-[#E5E9E6] rounded-lg px-3 border border-[#4A5A66]/20 focus:outline-none focus:border-[#3B82F6]"
                />
              </div>
            </div>
          </div>

          {(operation === 'add' || operation === 'multiply') && (
            <div className="space-y-3">
              <span className="text-[#748D92] text-sm font-medium">Matrix B Dimensions</span>
              <div className="flex gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-[#748D92]">Rows</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={rowsB}
                    onChange={(e) => {
                      const newRows = Math.min(5, Math.max(1, parseInt(e.target.value)));
                      setRowsB(newRows);
                      setMatrixB(resizeMatrix(matrixB, newRows, colsB));
                    }}
                    className="w-20 h-10 bg-[#2A363F] text-[#E5E9E6] rounded-lg px-3 border border-[#4A5A66]/20 focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-[#748D92]">Columns</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={colsB}
                    onChange={(e) => {
                      const newCols = Math.min(5, Math.max(1, parseInt(e.target.value)));
                      setColsB(newCols);
                      setMatrixB(resizeMatrix(matrixB, rowsB, newCols));
                    }}
                    className="w-20 h-10 bg-[#2A363F] text-[#E5E9E6] rounded-lg px-3 border border-[#4A5A66]/20 focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Matrix Inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {renderMatrix(matrixA, setMatrixA, 'Matrix A')}
            {operation === 'scalar' && (
              <div className="space-y-2">
                <span className="text-[#748D92] text-sm font-medium">Scalar Value</span>
                <input
                  type="number"
                  value={scalar}
                  onChange={(e) => setScalar(Number(e.target.value))}
                  className="w-full h-10 bg-[#2A363F] text-[#E5E9E6] rounded-lg px-3 border border-[#4A5A66]/20 focus:outline-none focus:border-[#3B82F6]"
                />
              </div>
            )}
          </div>

          {(operation === 'add' || operation === 'multiply') && (
            <div className="space-y-4">
              {renderMatrix(matrixB, setMatrixB, 'Matrix B')}
            </div>
          )}
        </div>

        {/* Calculate Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={calculate}
          className="w-full bg-[#10B981] text-white py-3 rounded-lg font-medium hover:bg-[#059669] transition-colors"
        >
          Calculate
        </motion.button>

        {/* Result */}
        {error && (
          <div className="bg-[#EF4444]/10 text-[#EF4444] p-4 rounded-lg">
            {error}
          </div>
        )}

        {result && !error && (
          <div className="space-y-2">
            <span className="text-[#748D92] text-sm font-medium">Result</span>
            <div className="grid gap-2 bg-[#2A363F] p-4 rounded-lg">
              {result.map((row, i) => (
                <div key={i} className="flex gap-2">
                  {row.map((val, j) => (
                    <div
                      key={j}
                      className="w-16 h-10 bg-[#1A2830] text-[#E5E9E6] rounded-lg flex items-center justify-center border border-[#4A5A66]/20"
                    >
                      {val.toFixed(2)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 