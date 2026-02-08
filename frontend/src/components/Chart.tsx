import { useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { SimulationResponse } from '../types';
import './Chart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  data: SimulationResponse | null;
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  const chartRef = useRef<ChartJS<'line'>>(null);

  if (!data) {
    return (
      <div className="chart-container">
        <div className="empty-state">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 90L35 70L50 80L65 50L80 60L95 30"
              stroke="#cbd5e0"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="35" cy="70" r="4" fill="#cbd5e0" />
            <circle cx="50" cy="80" r="4" fill="#cbd5e0" />
            <circle cx="65" cy="50" r="4" fill="#cbd5e0" />
            <circle cx="80" cy="60" r="4" fill="#cbd5e0" />
            <circle cx="95" cy="30" r="4" fill="#cbd5e0" />
          </svg>
          <h3>no simulation results</h3>
          <p>run a simulation to see the results visualized here!</p>
        </div>
      </div>
    );
  }

  const { metadata, results } = data;

  const labels = results.history.map((round) => round.round);
  const strategy1Data = results.history.map((round) => round.strategy1_cumulative);
  const strategy2Data = results.history.map((round) => round.strategy2_cumulative);

  const chartData = {
    labels,
    datasets: [
      {
        label: metadata.strategy1,
        data: strategy1Data,
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 5,
        tension: 0.1,
      },
      {
        label: metadata.strategy2,
        data: strategy2Data,
        borderColor: '#e74c3c',
        backgroundColor: 'rgba(231, 76, 60, 0.1)',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 5,
        tension: 0.1,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 14,
            weight: 500,
          },
        },
      },
      title: {
        display: true,
        text: 'Cumulative Scores Over Time',
        font: {
          size: 18,
          weight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          title: (context) => `Round ${context[0].label}`,
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${value} points`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Round',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        ticks: {
          maxTicksLimit: 10,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Cumulative Score',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        beginAtZero: true,
      },
    },
  };

  const cooperationRate1 = (
    (results.history.filter((r) => r.strategy1_move === 'Cooperate').length /
      results.history.length) *
    100
  ).toFixed(1);

  const cooperationRate2 = (
    (results.history.filter((r) => r.strategy2_move === 'Cooperate').length /
      results.history.length) *
    100
  ).toFixed(1);

  const avgScore1 = (results.strategy1_total_score / results.history.length).toFixed(2);
  const avgScore2 = (results.strategy2_total_score / results.history.length).toFixed(2);

  const winner =
    results.strategy1_total_score > results.strategy2_total_score
      ? metadata.strategy1
      : results.strategy2_total_score > results.strategy1_total_score
      ? metadata.strategy2
      : 'Tie';

  const scoreDiff = results.strategy1_total_score - results.strategy2_total_score;
  const absDiff = Math.abs(scoreDiff);
  const avgDiff = (absDiff / results.history.length).toFixed(2);
  const summary =
    winner === 'Tie'
      ? `It's a tie. Both average ${avgScore1} points per round.`
      : `${winner} wins by ${absDiff} points (avg +${avgDiff}/round).`;

  return (
    <div className="chart-container">
      <div className="summary-banner">
        <div className="summary-title">Result Snapshot</div>
        <div className="summary-text">{summary}</div>
      </div>

      <div className="chart-wrapper">
        <Line ref={chartRef} data={chartData} options={options} />
      </div>

      <div className="stats-grid">
        <div className="stat-card winner-card">
          <h3>Winner</h3>
          <div className="stat-value winner">
            {winner === 'Tie' ? '🤝 Tie' : `🏆 ${winner}`}
          </div>
        </div>

        <div className="stat-card">
          <h3>{metadata.strategy1}</h3>
          <div className="stat-value">{results.strategy1_total_score}</div>
          <div className="stat-detail">
            Avg: {avgScore1} per round
            <br />
            Cooperation: {cooperationRate1}%
          </div>
        </div>

        <div className="stat-card">
          <h3>{metadata.strategy2}</h3>
          <div className="stat-value">{results.strategy2_total_score}</div>
          <div className="stat-detail">
            Avg: {avgScore2} per round
            <br />
            Cooperation: {cooperationRate2}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
