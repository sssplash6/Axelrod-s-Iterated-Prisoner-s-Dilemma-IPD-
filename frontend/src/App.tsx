import { useState, useEffect } from 'react';
import Controls from './components/Controls';
import Chart from './components/Chart';
import { SimulationRequest, SimulationResponse } from './types';
import { api } from './utils/api';
import './App.css';

function App() {
  const [strategies, setStrategies] = useState<string[]>([]);
  const [request, setRequest] = useState<SimulationRequest>({
    strategy1: '',
    strategy2: '',
    rounds: 200,
    noise: 0.05,
  });
  const [results, setResults] = useState<SimulationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStrategies = async () => {
      try {
        const fetchedStrategies = await api.getStrategies();
        setStrategies(fetchedStrategies);
        
        if (fetchedStrategies.length >= 2) {
          setRequest((prev) => ({
            ...prev,
            strategy1: 'TitForTat',
            strategy2: 'AlwaysDefect',
          }));
        }
      } catch (err) {
        setError('Failed to load strategies. Please email me at samandarinnie@gmail.com so that I can fix the issue');
        console.error('Error fetching strategies:', err);
      }
    };

    fetchStrategies();
  }, []);

  const handleRunSimulation = async () => {
    if (!request.strategy1 || !request.strategy2) {
      setError('Please select both strategies');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await api.runSimulation(request);
      setResults(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to run simulation');
      console.error('Error running simulation:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎮 Iterated Prisoner's Dilemma simulator</h1>
        <p className="subtitle">
          understand Game Theory through the repeated Prisoner's Dilemma
        </p>
      </header>

      <main className="app-main">
        <div className="content-wrapper">
          {error && (
            <div className="error-banner">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
              <button
                className="error-close"
                onClick={() => setError(null)}
                aria-label="Close error"
              >
                ×
              </button>
            </div>
          )}

          <div className="layout">
            <aside className="sidebar">
              <Controls
                strategies={strategies}
                request={request}
                onRequestChange={setRequest}
                onRunSimulation={handleRunSimulation}
                isLoading={isLoading}
              />
            </aside>

            <section className="main-content">
              <Chart data={results} />
            </section>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>
          with React, TypeScript, FastAPI, and Chart.js by <a href="https://github.com/sssplash6" className="footer-link">sant1x</a>
          <br />
          <a 
            href="https://github.com/sssplash6/Axelrod-s-Iterated-Prisoner-s-Dilemma-IPD-" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            View on GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
