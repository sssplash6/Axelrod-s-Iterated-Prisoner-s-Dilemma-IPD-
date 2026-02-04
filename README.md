# 🎮 Evolution of Cooperation Simulator

An interactive web application that simulates the **repeated Prisoner's Dilemma** game, allowing you to pit different strategies against each other and visualize the evolution of cooperation over time.

Built as a portfolio project demonstrating full-stack development with modern technologies, game theory implementation, and data visualization.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.8+-blue.svg)
![React](https://img.shields.io/badge/react-18.2-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.2-blue.svg)

## 🌟 Features

- **Multiple Strategies**: Implement and compare classic game theory strategies:
  - AlwaysCooperate
  - AlwaysDefect
  - Tit-for-Tat
  - Grim Trigger
  - Pavlov (Win-Stay, Lose-Shift)
  - Random
  - Grudger

- **Interactive Visualization**: Real-time charts showing cumulative scores over rounds using Chart.js

- **Configurable Parameters**:
  - Number of rounds (10-1000)
  - Noise level (0-100%) - simulates communication errors or mistakes
  - Any strategy vs any strategy matchups

- **Detailed Statistics**:
  - Total and average scores
  - Cooperation rates
  - Round-by-round history
  - Winner determination

## 🎯 Game Theory Background

### The Prisoner's Dilemma

The Prisoner's Dilemma is a fundamental problem in game theory that demonstrates why two rational individuals might not cooperate, even if cooperation leads to the best collective outcome.

**Payoff Matrix:**

|                | **Cooperate** | **Defect** |
|----------------|---------------|------------|
| **Cooperate**  | 3, 3          | 0, 5       |
| **Defect**     | 5, 0          | 1, 1       |

- Both cooperate: Both get 3 points (mutual benefit)
- Both defect: Both get 1 point (mutual punishment)
- One defects, one cooperates: Defector gets 5, cooperator gets 0 (exploitation)

### Why This Matters

The repeated Prisoner's Dilemma shows how cooperation can emerge through:
- **Reciprocity**: Strategies like Tit-for-Tat succeed by rewarding cooperation and punishing defection
- **Forgiveness**: Some strategies recover from mistakes (important when noise is present)
- **Clarity**: Simple, predictable strategies often outperform complex ones
- **Robustness**: Good strategies work well against many different opponents

## 🏗️ Architecture

### Backend (Python + FastAPI)
- **FastAPI**: Modern, fast web framework with automatic API documentation
- **Game Logic**: Clean, extensible strategy pattern implementation
- **RESTful API**: Single endpoint with comprehensive validation

### Frontend (React + TypeScript)
- **React 18**: Modern UI with hooks and functional components
- **TypeScript**: Type-safe development for reliability
- **Chart.js**: Beautiful, responsive data visualizations
- **Vite**: Lightning-fast build tool and dev server

## 📋 Prerequisites

- **Python** 3.8 or higher
- **Node.js** 18 or higher
- **npm** or **yarn**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/evolution-of-cooperation.git
cd evolution-of-cooperation
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file (optional)
cp .env.example .env
```

## 🎮 Running the Application

### Start the Backend

```bash
cd backend
python main.py
```

The API will be available at `http://localhost:8000`

Interactive API docs: `http://localhost:8000/docs`

### Start the Frontend

In a new terminal:

```bash
cd frontend
npm run dev
```

The application will open automatically at `http://localhost:3000`

## 📡 API Documentation

### GET `/api/strategies`

Get list of available strategies.

**Response:**
```json
{
  "strategies": [
    "AlwaysCooperate",
    "AlwaysDefect",
    "TitForTat",
    "GrimTrigger",
    "Pavlov",
    "Random",
    "Grudger"
  ],
  "count": 7
}
```

### POST `/api/simulate`

Run a simulation between two strategies.

**Request Body:**
```json
{
  "strategy1": "TitForTat",
  "strategy2": "AlwaysDefect",
  "rounds": 200,
  "noise": 0.05
}
```

**Response:**
```json
{
  "metadata": {
    "strategy1": "TitForTat",
    "strategy2": "AlwaysDefect",
    "rounds": 200,
    "noise": 0.05
  },
  "results": {
    "strategy1_total_score": 250,
    "strategy2_total_score": 450,
    "history": [
      {
        "round": 1,
        "strategy1_move": "Cooperate",
        "strategy2_move": "Defect",
        "strategy1_score": 0,
        "strategy2_score": 5,
        "strategy1_cumulative": 0,
        "strategy2_cumulative": 5
      }
      // ... more rounds
    ]
  }
}
```

## 🧪 Adding New Strategies

To add a new strategy to the simulation:

1. Open `backend/game_logic.py`
2. Create a new class inheriting from `Strategy`:

```python
class YourStrategy(Strategy):
    """Description of your strategy."""
    
    def decide(self, opponent_history: List[str]) -> str:
        # Your logic here
        if not opponent_history:
            return "Cooperate"  # First move
        
        # Implement your decision logic
        return "Cooperate" or "Defect"
    
    def reset(self):
        # Reset any internal state if needed
        pass
```

3. Register your strategy in the `STRATEGIES` dictionary:

```python
STRATEGIES = {
    # ... existing strategies
    "YourStrategy": YourStrategy(),
}
```

4. Restart the backend server

## 🎨 Project Structure

```
evolution-of-cooperation/
├── backend/
│   ├── game_logic.py          # Core game and strategy implementations
│   ├── main.py                # FastAPI application
│   └── requirements.txt       # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Controls.tsx   # Simulation controls UI
│   │   │   ├── Controls.css
│   │   │   ├── Chart.tsx      # Data visualization
│   │   │   └── Chart.css
│   │   ├── types/
│   │   │   └── index.ts       # TypeScript type definitions
│   │   ├── utils/
│   │   │   └── api.ts         # API client functions
│   │   ├── App.tsx            # Main application component
│   │   ├── App.css
│   │   ├── main.tsx           # Application entry point
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── README.md
```

## 🔬 Interesting Experiments

Try these simulations to explore game theory concepts:

1. **Nice vs Nasty**: `TitForTat` vs `AlwaysDefect` - See how retaliation works
2. **Forgiving vs Unforgiving**: `TitForTat` vs `GrimTrigger` - Compare forgiveness strategies
3. **Effect of Noise**: Run any simulation with 0% noise, then 10%, then 20% - See how mistakes affect cooperation
4. **Tournament Style**: Run every strategy against every other strategy and record scores

## 🎓 Educational Use

This project is perfect for:
- **Game Theory Courses**: Visualize theoretical concepts
- **Computer Science Education**: Demonstrate OOP, APIs, and frontend-backend integration
- **Research**: Experiment with new strategies and parameters
- **Portfolio Projects**: Showcase full-stack development skills

## 🛠️ Technology Stack

### Backend
- **FastAPI**: High-performance web framework
- **Pydantic**: Data validation and settings management
- **Uvicorn**: ASGI server

### Frontend
- **React**: UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Build tool and dev server
- **Chart.js**: Data visualization
- **CSS3**: Modern styling with gradients and animations

## 🚀 Deployment

### Backend (Python)

Deploy to platforms like:
- **Heroku**: `Procfile` with `web: uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Railway**: Auto-detects Python and FastAPI
- **DigitalOcean App Platform**: Python worker
- **AWS Lambda**: Using Mangum adapter

### Frontend (React)

Deploy to:
- **Vercel**: Optimal for Vite/React apps
- **Netlify**: Simple static site hosting
- **GitHub Pages**: Free hosting for public repos
- **Cloudflare Pages**: Fast global CDN

## 🤝 Contributing

Contributions are welcome! Here are some ideas:

1. **New Strategies**: Implement additional game theory strategies
2. **Tournament Mode**: Run round-robin tournaments
3. **Strategy Evolution**: Genetic algorithms to evolve strategies
4. **Multiplayer**: Support more than two players
5. **Analysis Tools**: Add statistical analysis features
6. **Visualizations**: Additional chart types or animations

## 📚 Further Reading

- [The Evolution of Cooperation](https://en.wikipedia.org/wiki/The_Evolution_of_Cooperation) by Robert Axelrod
- [Prisoner's Dilemma](https://plato.stanford.edu/entries/prisoner-dilemma/)
- [The Evolution of Trust](https://ncase.me/trust/) - Interactive game that inspired this project
- [Game Theory 101](https://www.coursera.org/learn/game-theory-1)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

Built with ❤️ for MBZUAI and the open-source community

## 🙏 Acknowledgments

- Inspired by Nicky Case's ["The Evolution of Trust"](https://ncase.me/trust/)
- Based on Robert Axelrod's groundbreaking research on cooperation
- Game theory concepts from John Nash, John Maynard Smith, and others

---

**⭐ If you find this project useful, please consider giving it a star on GitHub!**
