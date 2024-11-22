'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './balloon-shooting-game.module.css'

interface Balloon {
  id: number;
  x: number;
  y: number;
  color: string;
  speed: number;
}

const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']

const BalloonShootingGame: React.FC = () => {
  const [balloons, setBalloons] = useState<Balloon[]>([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isGameOver, setIsGameOver] = useState(false)

  const createBalloon = useCallback(() => {
    const newBalloon: Balloon = {
      id: Math.random(),
      x: Math.random() * 80 + 10, // 10% to 90% of the screen width
      y: 100, // Start from bottom
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 2 + 1, // Random speed between 1 and 3
    }
    setBalloons(prevBalloons => [...prevBalloons, newBalloon])
  }, [])

  useEffect(() => {
    if (!isGameOver) {
      const balloonInterval = setInterval(createBalloon, 1000)
      const timer = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(balloonInterval)
            clearInterval(timer)
            setIsGameOver(true)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)

      return () => {
        clearInterval(balloonInterval)
        clearInterval(timer)
      }
    }
  }, [isGameOver, createBalloon])

  useEffect(() => {
    if (!isGameOver) {
      const moveInterval = setInterval(() => {
        setBalloons(prevBalloons =>
          prevBalloons
            .map(balloon => ({
              ...balloon,
              y: balloon.y - balloon.speed,
            }))
            .filter(balloon => balloon.y > -10)
        )
      }, 50)

      return () => clearInterval(moveInterval)
    }
  }, [isGameOver])

  const handleBalloonClick = (id: number) => {
    setBalloons(prevBalloons => prevBalloons.filter(balloon => balloon.id !== id))
    setScore(prevScore => prevScore + 1)
  }

  const resetGame = () => {
    setBalloons([])
    setScore(0)
    setTimeLeft(30)
    setIsGameOver(false)
  }

  return (
    <div className={styles.gameContainer}>
      <h2 className={styles.gameTitle}>Balloon Shooting Gallery</h2>
      <div className={styles.gameInfo}>
        <p>Score: {score}</p>
        <p>Time Left: {timeLeft}s</p>
      </div>
      <div className={styles.gameArea}>
        <AnimatePresence>
          {balloons.map(balloon => (
            <motion.div
              key={balloon.id}
              className={styles.balloon}
              style={{
                left: `${balloon.x}%`,
                backgroundColor: balloon.color,
              }}
              initial={{ y: '100%' }}
              animate={{ y: `${balloon.y}%` }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => handleBalloonClick(balloon.id)}
            />
          ))}
        </AnimatePresence>
      </div>
      {isGameOver && (
        <div className={styles.gameOver}>
          <h3>Game Over!</h3>
          <p>Your score: {score}</p>
          <button onClick={resetGame} className={styles.resetButton}>Play Again</button>
        </div>
      )}
    </div>
  )
}

export default BalloonShootingGame

