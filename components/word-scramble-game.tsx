import React, { useState, useEffect } from 'react'
import styles from './word-scramble-game.module.css'

const words = ['birthday', 'celebration', 'party', 'cake', 'candles', 'presents', 'balloons', 'friends', 'family', 'happiness']

const WordScrambleGame: React.FC = () => {
  const [currentWord, setCurrentWord] = useState('')
  const [scrambledWord, setScrambledWord] = useState('')
  const [guess, setGuess] = useState('')
  const [message, setMessage] = useState('')
  const [score, setScore] = useState(0)

  useEffect(() => {
    newWord()
  }, [])

  const newWord = () => {
    const word = words[Math.floor(Math.random() * words.length)]
    setCurrentWord(word)
    setScrambledWord(scrambleWord(word))
    setGuess('')
    setMessage('')
  }

  const scrambleWord = (word: string) => {
    return word
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('')
  }

  const handleGuess = () => {
    if (guess.toLowerCase() === currentWord) {
      setMessage('Correct! Great job!')
      setScore(score + 1)
      setTimeout(newWord, 1500)
    } else {
      setMessage('Sorry, that\'s not correct. Try again!')
    }
  }

  return (
    <div className={styles.gameContainer}>
      <h2 className={styles.gameTitle}>Word Scramble</h2>
      <p className={styles.scrambledWord}>{scrambledWord}</p>
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        className={styles.input}
        placeholder="Enter your guess"
      />
      <button onClick={handleGuess} className={styles.button}>
        Submit Guess
      </button>
      <p className={styles.message}>{message}</p>
      <p className={styles.score}>Score: {score}</p>
      <button onClick={newWord} className={styles.button}>
        New Word
      </button>
    </div>
  )
}

export default WordScrambleGame

