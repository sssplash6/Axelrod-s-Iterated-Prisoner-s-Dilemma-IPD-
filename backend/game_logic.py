from typing import List, Tuple, Dict
import random
from abc import ABC, abstractmethod


class Strategy(ABC):
    
    def __init__(self):
        self.name = self.__class__.__name__
        self.description = "No description available"
        
    @abstractmethod
    def decide(self, opponent_history: List[str], own_history: List[str]) -> str:

        pass
    
    def reset(self):
        """Reset any internal state."""
        pass

# ========== EXISTING STRATEGIES (UPDATED) ==========

class AlwaysCooperate(Strategy):
    """Always cooperates, regardless of opponent's actions."""
    def __init__(self):
        super().__init__()
        self.description = "Always cooperates, no matter what happens"
    
    def decide(self, opponent_history: List[str], own_history: List[str]) -> str:
        return "Cooperate"


class AlwaysDefect(Strategy):
    """Always defects, regardless of opponent's actions."""
    def __init__(self):
        super().__init__()
        self.description = "Always defects, pure selfishness"
    
    def decide(self, opponent_history: List[str], own_history: List[str]) -> str:
        return "Defect"


class TitForTat(Strategy):
    """
    Cooperates on first move, then copies opponent's previous move.
    The classic "nice" retaliatory strategy.
    """
    def __init__(self):
        super().__init__()
        self.description = "Starts with cooperation, then copies opponent's last move"

    def decide(self, opponent_history: List[str], own_history: List[str]) -> str:
        if not opponent_history:
            return "Cooperate"
        return opponent_history[-1]


class GrimTrigger(Strategy):

    
    def __init__(self):
        super().__init__()
        self.description = "Cooperates until opponent defects once, then defects forever"
        self.triggered = False
    
    def decide(self, opponent_history: List[str], own_history: List[str]) -> str:
        if self.triggered:
            return "Defect"
        
        if "Defect" in opponent_history:
            self.triggered = True
            return "Defect"
        
        return "Cooperate"
    
    def reset(self):
        self.triggered = False


class Pavlov(Strategy):

    def __init__(self):
        super().__init__()
        self.description = "Win-Stay, Lose-Shift - repeats successful moves, changes unsuccessful ones"

    def decide(self, opponent_history: List[str], own_history: List[str]) -> str:
        if not own_history:
            return "Cooperate"
        last_own = own_history[-1]
        last_opp = opponent_history[-1]
        if last_own == last_opp:
            return last_own
        return "Defect" if last_own == "Cooperate" else "Cooperate"
        

class Random(Strategy):
    def __init__(self):
        super().__init__()
        self.description = "Randomly cooperates or defects with 50% probability each"

    def decide(self, opponent_history: List[str], own_history: List[str]) -> str:
        return random.choice(["Cooperate", "Defect"])


class Grudger(Strategy):

    
    def __init__(self):
        super().__init__()
        self.description = "Holds grudges - one defection and cooperation ends forever"
        self.grudge = False
    
    def decide(self, opponent_history: List[str], own_history: List[str]) -> str:
        if self.grudge:
            return "Defect"
        
        if "Defect" in opponent_history:
            self.grudge = True
            return "Defect"
        
        return "Cooperate"
    
    def reset(self):
        self.grudge = False

class TitForTwoTats(Strategy):
    def __init__(self):
        super().__init__()
        self.description = "Only retaliates after opponent defects twice in a row"
    
    def decide(self, opponent_history: List[str], own_history: List[str]) -> str:
        if len(opponent_history) < 2:
            return "Cooperate"
        if opponent_history[-1] == "Defect" and opponent_history[-2] == "Defect":
            return "Defect"
        return "Cooperate"


class GenerousTitForTat(Strategy):
    def __init__(self):
        super().__init__()
        self.description = "Tit-for-Tat with a 30% chance to forgive a defection"
        self.forgiveness_rate = 0.3
    
    def decide(self, opponent_history: List[str], own_history: List[str]) -> str:
        if not opponent_history:
            return "Cooperate"
        if opponent_history[-1] == "Defect" and random.random() < self.forgiveness_rate:
            return "Cooperate"
        return opponent_history[-1]


class SuspiciousTitForTat(Strategy):
    def __init__(self):
        super().__init__()
        self.description = "Like Tit-for-Tat but starts with defection instead"
    
    def decide(self, opponent_history: List[str], own_history: List[str]) -> str:
        if not opponent_history:
            return "Defect"
        return opponent_history[-1]


class Gradual(Strategy):
    def __init__(self):
        super().__init__()
        self.description = "Punishes defections by defecting N times after Nth defection"
        self.defection_count = 0
        self.punishment_remaining = 0
        self.calming_down = False
    
    def decide(self, opponent_history: List[str], own_history: List[str]) -> str:
        if self.punishment_remaining > 0:
            self.punishment_remaining -= 1
            if self.punishment_remaining == 0:
                self.calming_down = True
            return "Defect"
        if self.calming_down:
            if len(own_history) >= 2 and own_history[-1] == "Cooperate" and own_history[-2] == "Cooperate":
                self.calming_down = False
            return "Cooperate"
        if opponent_history and opponent_history[-1] == "Defect":
            if not own_history or own_history[-1] == "Cooperate":
                self.defection_count += 1
                self.punishment_remaining = self.defection_count
                return "Defect"
        return "Cooperate"
    
    def reset(self):
        self.defection_count = 0
        self.punishment_remaining = 0
        self.calming_down = False


class Adaptive(Strategy):
    def __init__(self):
        super().__init__()
        self.description = "Learns from opponent - adapts based on their cooperation rate"
        self.initial_rounds = 6
    
    def decide(self, opponent_history: List[str], own_history: List[str]) -> str:
        if len(own_history) < self.initial_rounds:
            pattern = ["Cooperate", "Cooperate", "Defect", "Defect", "Cooperate", "Defect"]
            return pattern[len(own_history)]
        
        coop_count = opponent_history.count("Cooperate")
        total = len(opponent_history)
        coop_rate = coop_count / total if total > 0 else 0
        
        return "Cooperate" if coop_rate >= 0.5 else "Defect"


class Prober(Strategy):
    def __init__(self):
        super().__init__()
        self.description = "Tests opponent with D, C, C pattern, then plays Tit-for-Tat if they cooperate"
    
    def decide(self, opponent_history: List[str], own_history: List[str]) -> str:
        if len(own_history) == 0:
            return "Defect"
        elif len(own_history) == 1:
            return "Cooperate"
        elif len(own_history) == 2:
            return "Cooperate"
        
        if opponent_history[1] == "Cooperate" and opponent_history[2] == "Cooperate":
            return opponent_history[-1]
        
        return "Defect"


class SoftMajority(Strategy):
    def __init__(self):
        super().__init__()
        self.description = "Cooperates if opponent has cooperated at least as much as defected"
    
    def decide(self, opponent_history: List[str], own_history: List[str]) -> str:
        if not opponent_history:
            return "Cooperate"
        coop_count = opponent_history.count("Cooperate")
        defect_count = opponent_history.count("Defect")
        return "Cooperate" if coop_count >= defect_count else "Defect"


class HardMajority(Strategy):
    def __init__(self):
        super().__init__()
        self.description = "Defects if opponent has ever defected more than they have cooperated"
    
    def decide(self, opponent_history: List[str], own_history: List[str]) -> str:
        if not opponent_history:
            return "Cooperate"
        coop_count = opponent_history.count("Cooperate")
        defect_count = opponent_history.count("Defect")
        return "Cooperate" if coop_count > defect_count else "Defect"


STRATEGIES: Dict[str, Strategy] = {
    "AlwaysCooperate": AlwaysCooperate(),
    "AlwaysDefect": AlwaysDefect(),
    "TitForTat": TitForTat(),
    "GrimTrigger": GrimTrigger(),
    "Pavlov": Pavlov(),
    "Random": Random(),
    "Grudger": Grudger(),
    "TitForTwoTats": TitForTwoTats(),
    "GenerousTitForTat": GenerousTitForTat(),
    "SuspiciousTitForTat": SuspiciousTitForTat(),
    "Gradual": Gradual(),
    "Adaptive": Adaptive(),
    "Prober": Prober(),
    "SoftMajority": SoftMajority(),
    "HardMajority": HardMajority(),
}


class PrisonersDilemmaGame:
    """
    Simulates a repeated Prisoner's Dilemma game between two strategies.
    
    Payoff Matrix:
    - Both Cooperate: (3, 3)
    - Both Defect: (1, 1)
    - Cooperate vs Defect: (0, 5)
    - Defect vs Cooperate: (5, 0)
    """
    
    PAYOFF_MATRIX = {
        ("Cooperate", "Cooperate"): (3, 3),
        ("Cooperate", "Defect"): (0, 5),
        ("Defect", "Cooperate"): (5, 0),
        ("Defect", "Defect"): (1, 1),
    }
    
    def __init__(self, strategy1: Strategy, strategy2: Strategy, noise: float = 0.0):
        self.strategy1 = strategy1
        self.strategy2 = strategy2
        self.noise = max(0.0, min(1.0, noise))
        
        self.strategy1_history: List[str] = []
        self.strategy2_history: List[str] = []
        
        self.strategy1_total_score = 0
        self.strategy2_total_score = 0
        
    def apply_noise(self, move: str) -> str:
        if random.random() < self.noise:
            return "Defect" if move == "Cooperate" else "Cooperate"
        return move
    
    def play_round(self) -> Tuple[str, str, int, int]:
        move1 = self.strategy1.decide(self.strategy2_history, self.strategy1_history)
        move2 = self.strategy2.decide(self.strategy1_history, self.strategy2_history)
        
        actual_move1 = self.apply_noise(move1)
        actual_move2 = self.apply_noise(move2)
        
        score1, score2 = self.PAYOFF_MATRIX[(actual_move1, actual_move2)]
        
        self.strategy1_history.append(actual_move1)
        self.strategy2_history.append(actual_move2)
        
        self.strategy1_total_score += score1
        self.strategy2_total_score += score2
        
        return actual_move1, actual_move2, score1, score2
    
    def simulate(self, rounds: int) -> Dict:
        self.strategy1.reset()
        self.strategy2.reset()
        self.strategy1_history = []
        self.strategy2_history = []
        self.strategy1_total_score = 0
        self.strategy2_total_score = 0
        
        history = []
        
        for round_num in range(1, rounds + 1):
            move1, move2, score1, score2 = self.play_round()
            
            history.append({
                "round": round_num,
                "strategy1_move": move1,
                "strategy2_move": move2,
                "strategy1_score": score1,
                "strategy2_score": score2,
                "strategy1_cumulative": self.strategy1_total_score,
                "strategy2_cumulative": self.strategy2_total_score,
            })
        
        return {
            "strategy1_total_score": self.strategy1_total_score,
            "strategy2_total_score": self.strategy2_total_score,
            "history": history,
        }


def get_available_strategies() -> List[str]:
    """Return list of available strategy names."""
    return list(STRATEGIES.keys())


def get_strategy_metadata() -> List[Dict[str, str]]:
    """Return list of strategies with descriptions for UI."""
    return [
        {
            "name": name,
            "description": strategy.description,
        }
        for name, strategy in STRATEGIES.items()
    ]
