'use client'

import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import styles from './birthday-wish-fountain.module.css'

interface Wish {
  id: number;
  text: string;
  isVisible: boolean;
}

const BirthdayWishFountain: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [currentWish, setCurrentWish] = useState('')
  const [isGameOver, setIsGameOver] = useState(false)
  const fountainAnimation = useAnimation()

  useEffect(() => {
    fountainAnimation.start({
      y: [0, -10, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  }, [fountainAnimation])

  const handleAddWish = () => {
    if (currentWish.trim() !== '') {
      const newWish: Wish = {
        id: Date.now(),
        text: currentWish,
        isVisible: false,
      }
      setWishes(prevWishes => [...prevWishes, newWish])
      setCurrentWish('')

      if (wishes.length + 1 >= 5) {
        setTimeout(() => setIsGameOver(true), 1000)
      }
    }
  }

  const toggleWishVisibility = (id: number) => {
    setWishes(prevWishes =>
      prevWishes.map(wish =>
        wish.id === id ? { ...wish, isVisible: !wish.isVisible } : wish
      )
    )
  }

  const resetGame = () => {
    setWishes([])
    setCurrentWish('')
    setIsGameOver(false)
  }

  return (
    <div className={styles.gameContainer}>
      <h2 className={styles.gameTitle}>Birthday Wish Fountain</h2>
      <div className={styles.gameArea}>
        <motion.div className={styles.fountain} animate={fountainAnimation}>
          🎉🌟🎊
        </motion.div>
        {wishes.map(wish => (
          <motion.div
            key={wish.id}
            className={styles.coin}
            initial={{ x: '50%', y: '-100%' }}
            animate={{ y: '100%' }}
            transition={{ duration: 2 }}
          >
            🪙
          </motion.div>
        ))}
      </div>
      <div className={styles.wishInput}>
        <input
          type="text"
          value={currentWish}
          onChange={(e) => setCurrentWish(e.target.value)}
          placeholder="Enter your birthday wish"
          className={styles.input}
          disabled={isGameOver}
          aria-label="Enter your birthday wish"
        />
        <button 
          onClick={handleAddWish} 
          className={styles.button} 
          disabled={isGameOver || currentWish.trim() === ''}
        >
          Add Wish
        </button>
      </div>
      <div className={styles.wishes}>
        <h3>Birthday Wishes:</h3>
        <ul>
          {wishes.map((wish) => (
            <li key={wish.id} className={styles.wishItem}>
              <button 
                onClick={() => toggleWishVisibility(wish.id)}
                className={styles.toggleButton}
                aria-label={wish.isVisible ? "Hide wish" : "Show wish"}
              >
                {wish.isVisible ? '🙈' : '👀'}
              </button>
              <span className={wish.isVisible ? styles.visibleWish : styles.hiddenWish}>
                {wish.isVisible ? wish.text : '••••••••'}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {isGameOver && (
        <div className={styles.gameOver}>
          <h3>All Wishes Made!</h3>
          <p>You've made {wishes.length} birthday wishes!</p>
          <button onClick={resetGame} className={styles.resetButton}>Make New Wishes</button>
        </div>
      )}
    </div>
  )
}

export default BirthdayWishFountain

