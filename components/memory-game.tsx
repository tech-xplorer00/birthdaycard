'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './memory-game.module.css'

const items = ['🎂', '🎈', '🎁', '🎉', '🍰', '🕯️', '🎊', '🎵']
const allItems = [...items, ...items]

interface Card {
  id: number
  content: string
  flipped: boolean
  matched: boolean
}

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState<number>(0)
  const [moves, setMoves] = useState<number>(0)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const shuffledCards = allItems
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        id: index,
        content: item,
        flipped: false,
        matched: false,
      }))
    setCards(shuffledCards)
    setFlippedCards([])
    setMatchedPairs(0)
    setMoves(0)
  }

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].flipped || cards[id].matched) return

    const newCards = [...cards]
    newCards[id].flipped = true
    setCards(newCards)

    const newFlippedCards = [...flippedCards, id]
    setFlippedCards(newFlippedCards)

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1)
      checkForMatch(newFlippedCards)
    }
  }

  const checkForMatch = (flippedCardIds: number[]) => {
    const [firstId, secondId] = flippedCardIds
    if (cards[firstId].content === cards[secondId].content) {
      const newCards = [...cards]
      newCards[firstId].matched = true
      newCards[secondId].matched = true
      setCards(newCards)
      setMatchedPairs(matchedPairs + 1)
      setFlippedCards([])
    } else {
      setTimeout(() => {
        const newCards = [...cards]
        newCards[firstId].flipped = false
        newCards[secondId].flipped = false
        setCards(newCards)
        setFlippedCards([])
      }, 1000)
    }
  }

  return (
    <div className={styles.gameContainer}>
      <h2 className={styles.gameTitle}>Birthday Memory Game</h2>
      <div className={styles.gameInfo}>
        <p>Moves: {moves}</p>
        <p>Matched Pairs: {matchedPairs} / {items.length}</p>
      </div>
      <div className={styles.cardGrid}>
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className={`${styles.card} ${card.flipped ? styles.flipped : ''} ${card.matched ? styles.matched : ''}`}
            onClick={() => handleCardClick(card.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={styles.cardInner}>
              <div className={styles.cardFront}>?</div>
              <div className={styles.cardBack}>{card.content}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <button className={styles.resetButton} onClick={initializeGame}>Reset Game</button>
    </div>
  )
}

export default MemoryGame

