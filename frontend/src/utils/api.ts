import { SimulationRequest, SimulationResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = {
  async getStrategies(): Promise<string[]> {
    const response = await fetch(`${API_BASE_URL}/api/strategies`);
    if (!response.ok) {
      throw new Error('Failed to fetch strategies');
    }
    const data = await response.json();
    return data.strategies;
  },

  async runSimulation(request: SimulationRequest): Promise<SimulationResponse> {
    const response = await fetch(`${API_BASE_URL}/api/simulate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to run simulation');
    }

    return response.json();
  },
};
