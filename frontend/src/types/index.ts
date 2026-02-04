export interface SimulationRequest {
  strategy1: string;
  strategy2: string;
  rounds: number;
  noise: number;
}

export interface RoundHistory {
  round: number;
  strategy1_move: string;
  strategy2_move: string;
  strategy1_score: number;
  strategy2_score: number;
  strategy1_cumulative: number;
  strategy2_cumulative: number;
}

export interface SimulationResults {
  strategy1_total_score: number;
  strategy2_total_score: number;
  history: RoundHistory[];
}

export interface SimulationResponse {
  metadata: SimulationRequest;
  results: SimulationResults;
}

export interface Strategy {
  name: string;
  description?: string;
}
