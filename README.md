# 🎲 Axelrod's Iterated Prisoner's Dilemma (IPD)

[![Live Demo](https://img.shields.io/badge/Live_Demo-View_Here-brightgreen?style=for-the-badge)]([https://sssplash6.github.io/Axelrod-s-Iterated-Prisoner-s-Dilemma-IPD-/](https://axelrod-s-iterated-prisoner-s-dilemma-ipd-q3r6-psf3mnzqj.vercel.app/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Python](https://img.shields.io/badge/Python-3.9+-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.95+-green?logo=fastapi)
![React](https://img.shields.io/badge/React-18.2+-informational?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-blue?logo=typescript)

An interactive web simulator for the **Iterated Prisoner's Dilemma (IPD)**, a foundational concept in game theory. This project allows users to explore how cooperation can evolve among self-interested agents by pitting various strategies against each other.

The simulator is inspired by political scientist Robert Axelrod's famous tournaments and Nicky Case's modern classic, [**The Evolution of Trust**](https://ncase.me/trust/).

## 🌟 Features

- **Multiple Strategies**: Implement and compare 15 classic game theory strategies:

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

### 🛠️ Technology Stack

**Backend**

![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Pydantic](https://img.shields.io/badge/Pydantic-E92063?style=for-the-badge&logo=pydantic&logoColor=white)
![Uvicorn](https://img.shields.io/badge/Uvicorn-009688?style=for-the-badge&logo=python&logoColor=white)

**Frontend**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)




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

## 📋 Prerequisites

- **Python** 3.8 or higher
- **Node.js** 18 or higher
- **npm** or **yarn**


## 🔬 Interesting Experiments

Try these simulations to explore game theory concepts:

1. **Nice vs Nasty**: `TitForTat` vs `AlwaysDefect` - See how retaliation works
2. **Forgiving vs Unforgiving**: `TitForTat` vs `GrimTrigger` - Compare forgiveness strategies
3. **Effect of Noise**: Run any simulation with 0% noise, then 10%, then 20% - See how mistakes affect cooperation
4. **Tournament Style**: Run every strategy against every other strategy and record scores

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

**Samandar Norboev**
- Email: samandarinnie@gmail.com

## 🙏 Acknowledgments

- Inspired by Nicky Case's ["The Evolution of Trust"](https://ncase.me/trust/)
- Based on Robert Axelrod's groundbreaking research on cooperation
- Game theory concepts from John Nash, John Maynard Smith, and others

---

**⭐ If you find this project useful, please consider giving it a star on GitHub!**


