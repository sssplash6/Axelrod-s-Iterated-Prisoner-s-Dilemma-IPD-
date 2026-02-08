
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
from typing import List, Dict
import uvicorn

from game_logic import PrisonersDilemmaGame, STRATEGIES, get_available_strategies, get_strategy_metadata


app = FastAPI(
    title="Axelrod's Iterated Prisoner's Dilemma API",
    description="API for simulating repeated Prisoner's Dilemma games",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SimulationRequest(BaseModel):
    """Request model for simulation endpoint."""
    
    strategy1: str = Field(..., description="Name of first strategy")
    strategy2: str = Field(..., description="Name of second strategy")
    rounds: int = Field(200, ge=1, le=10000, description="Number of rounds (1-10000)")
    noise: float = Field(0.0, ge=0.0, le=1.0, description="Noise level (0.0-1.0)")
    
    @validator('strategy1', 'strategy2')
    def validate_strategy(cls, v):
        available = get_available_strategies()
        if v not in available:
            raise ValueError(f"Strategy must be one of: {', '.join(available)}")
        return v


class RoundHistory(BaseModel):
    """Model for a single round's history."""
    
    round: int
    strategy1_move: str
    strategy2_move: str
    strategy1_score: int
    strategy2_score: int
    strategy1_cumulative: int
    strategy2_cumulative: int


class SimulationResults(BaseModel):
    """Model for simulation results."""
    
    strategy1_total_score: int
    strategy2_total_score: int
    history: List[RoundHistory]


class SimulationResponse(BaseModel):
    """Response model for simulation endpoint."""
    
    metadata: SimulationRequest
    results: SimulationResults


@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "name": "Evolution of Cooperation Simulator API",
        "version": "1.0.0",
        "endpoints": {
            "strategies": "/api/strategies",
            "simulate": "/api/simulate"
        }
    }


@app.get("/api/strategies")
async def get_strategies():
    """Get list of available strategies."""
    strategies = get_strategy_metadata()
    return {
        "strategies": strategies,
        "count": len(strategies)
    }


@app.post("/api/simulate", response_model=SimulationResponse)
async def simulate(request: SimulationRequest):
    try:

        strategy1 = STRATEGIES[request.strategy1]
        strategy2 = STRATEGIES[request.strategy2]
        

        game = PrisonersDilemmaGame(strategy1, strategy2, request.noise)
        

        results = game.simulate(request.rounds)
        

        return {
            "metadata": request.dict(),
            "results": results
        }
        
    except KeyError as e:
        raise HTTPException(status_code=400, detail=f"Invalid strategy: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Simulation error: {str(e)}")


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
