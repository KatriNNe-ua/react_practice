import GameHeader from "./components/GameHeader";
import Card from "./components/Card";
import WinMessage from "./components/WinMessage";
import useGameLogic from "./hooks/useGameLogic";

function App() {
  const { cards, moves, startNewGame, flippedCard, endGame, score, isBlocked } =
    useGameLogic();

  return (
    <div className="app">
      <GameHeader moves={moves} score={score} startNewGame={startNewGame} />
      {endGame && <WinMessage moves={moves} />}
      <div className={`cards-grid ${isBlocked ? "blocked" : ""}`}>
        {cards.map((card) => (
          <Card key={card.id} card={card} flippedCard={flippedCard} />
        ))}
      </div>
    </div>
  );
}

export default App;
