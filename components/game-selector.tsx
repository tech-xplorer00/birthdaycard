import React from 'react'
import styles from './game-selector.module.css'

interface Game {
  id: string;
  title: string;
  description: string;
}

interface GameSelectorProps {
  games: Game[];
  onSelectGame: (gameId: string) => void;
}

const GameSelector: React.FC<GameSelectorProps> = ({ games, onSelectGame }) => {
  return (
    <div className={styles.gameSelectorContainer}>
      <h2 className={styles.selectorTitle}>Choose a Game</h2>
      <div className={styles.gameList}>
        {games.map((game) => (
          <button
            key={game.id}
            className={styles.gameButton}
            onClick={() => onSelectGame(game.id)}
          >
            <h3>{game.title}</h3>
            <p>{game.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default GameSelector

