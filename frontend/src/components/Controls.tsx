import React from 'react';
import { SimulationRequest } from '../types';
import './Controls.css';

interface ControlsProps {
  strategies: string[];
  request: SimulationRequest;
  onRequestChange: (request: SimulationRequest) => void;
  onRunSimulation: () => void;
  isLoading: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  strategies,
  request,
  onRequestChange,
  onRunSimulation,
  isLoading,
}) => {
  const handleChange = (field: keyof SimulationRequest, value: string | number) => {
    onRequestChange({ ...request, [field]: value });
  };

  const roundsPercent = ((request.rounds - 10) / (1000 - 10)) * 100;
  const noisePercent = request.noise * 100;

  const presets = [
    {
      label: 'Nice vs Nasty',
      strategy1: 'TitForTat',
      strategy2: 'AlwaysDefect',
      rounds: 200,
      noise: 0.05,
    },
    {
      label: 'Forgiving vs Unforgiving',
      strategy1: 'TitForTat',
      strategy2: 'GrimTrigger',
      rounds: 200,
      noise: 0.02,
    },
    {
      label: 'Trusting Duel',
      strategy1: 'AlwaysCooperate',
      strategy2: 'TitForTat',
      rounds: 200,
      noise: 0.0,
    },
  ];

  return (
    <div className="controls">
      <h2>Simulation Controls</h2>
      
      <div className="control-group">
        <label htmlFor="strategy1">Strategy 1:</label>
        <select
          id="strategy1"
          value={request.strategy1}
          onChange={(e) => handleChange('strategy1', e.target.value)}
          disabled={isLoading}
        >
          <option value="">Select Strategy</option>
          {strategies.map((strategy) => (
            <option key={strategy} value={strategy}>
              {strategy}
            </option>
          ))}
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="strategy2">Strategy 2:</label>
        <select
          id="strategy2"
          value={request.strategy2}
          onChange={(e) => handleChange('strategy2', e.target.value)}
          disabled={isLoading}
        >
          <option value="">Select Strategy</option>
          {strategies.map((strategy) => (
            <option key={strategy} value={strategy}>
              {strategy}
            </option>
          ))}
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="rounds">
          Rounds: <span className="value">{request.rounds}</span>
        </label>
        <input
          type="range"
          id="rounds"
          min="10"
          max="1000"
          step="10"
          value={request.rounds}
          onChange={(e) => handleChange('rounds', parseInt(e.target.value))}
          disabled={isLoading}
          style={
            {
              '--value': `${roundsPercent}%`,
            } as React.CSSProperties
          }
        />
        <div className="range-labels">
          <span>10</span>
          <span>1000</span>
        </div>
      </div>

      <div className="control-group">
        <label htmlFor="noise">
          Noise: <span className="value">{(request.noise * 100).toFixed(0)}%</span>
        </label>
        <input
          type="range"
          id="noise"
          min="0"
          max="1"
          step="0.01"
          value={request.noise}
          onChange={(e) => handleChange('noise', parseFloat(e.target.value))}
          disabled={isLoading}
          style={
            {
              '--value': `${noisePercent}%`,
            } as React.CSSProperties
          }
        />
        <div className="range-labels">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>

      <div className="preset-group" aria-label="Quick matchups">
        <div className="preset-header">Quick matchups</div>
        <div className="preset-row">
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              className="preset-chip"
              onClick={() =>
                onRequestChange({
                  ...request,
                  strategy1: preset.strategy1,
                  strategy2: preset.strategy2,
                  rounds: preset.rounds,
                  noise: preset.noise,
                })
              }
              disabled={isLoading}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <button
        className="run-button"
        onClick={onRunSimulation}
        disabled={isLoading || !request.strategy1 || !request.strategy2}
      >
        {isLoading ? 'Running...' : 'Run Simulation'}
      </button>

      <div className="info-box">
        <h3>Payoff Matrix</h3>
        <table className="payoff-table">
          <thead>
            <tr>
              <th></th>
              <th>Cooperate</th>
              <th>Defect</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Cooperate</th>
              <td>3, 3</td>
              <td>0, 5</td>
            </tr>
            <tr>
              <th>Defect</th>
              <td>5, 0</td>
              <td>1, 1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Controls;
