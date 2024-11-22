'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import PhotoFrame from './photo-frame'
import MemoryGame from './memory-game'
// import BirthdayCakeGame from './birthday-cake-game'
import WordScrambleGame from './word-scramble-game'
import BalloonShootingGame from './balloon-shooting-game'
import BirthdayWishFountain from './birthday-wish-fountain'
import MusicPlayer from './music-player'
import ResponseForm from './response-form'
import GameSelector from './game-selector'

const games = [
  { id: 'memory', title: 'Memory Game', description: 'Match pairs of birthday-themed cards' },
  // { id: 'birthday-cake', title: 'Birthday Cake Decoration', description: 'Decorate a virtual birthday cake with various toppings' },
  { id: 'word-scramble', title: 'Word Scramble', description: 'Unscramble birthday-related words' },
  { id: 'balloon-shooting', title: 'Balloon Shooting Gallery', description: 'Pop as many balloons as you can before time runs out' },
  { id: 'wish-fountain', title: 'Birthday Wish Fountain', description: 'Make birthday wishes by tossing coins into a fountain' },
]

const BirthdayCard = () => {
  const [isClient, setIsClient] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [showPhotoFrame, setShowPhotoFrame] = useState(false)
  const [showGameSelector, setShowGameSelector] = useState(false)
  const [showResponseForm, setShowResponseForm] = useState(false)
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const name = "Samiksha" // Replace with the actual name

  useEffect(() => {
    setIsClient(true)
    
    // Create confetti effect
    const duration = 15 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: NodeJS.Timeout = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
      }))
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
      }))
    }, 250)

    return () => clearInterval(interval)
  }, [])

  if (!isClient) {
    return null // or a loading indicator
  }

  const handleGameSelection = (gameId: string) => {
    setSelectedGame(gameId)
  }

  const renderSelectedGame = () => {
    switch (selectedGame) {
      case 'memory':
        return <MemoryGame />
      // case 'birthday-cake':
      //   return <BirthdayCakeGame />
      case 'word-scramble':
        return <WordScrambleGame />
      case 'balloon-shooting':
        return <BalloonShootingGame />
      case 'wish-fountain':
        return <BirthdayWishFountain />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-yellow-500 flex items-center justify-center">
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-xl max-w-2xl w-full">
        <h1 
          className="text-6xl font-bold text-center mb-8 animate-pulse"
          style={{
            background: 'linear-gradient(to right, #FFD700, #FF1493, #8A2BE2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          Happy Birthday {name}!
        </h1>
        
        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => setShowMessage(true)}
            className="bg-yellow-400 hover:bg-yellow-500 text-purple-800 font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Click Me!
          </button>
          <button
            onClick={() => setShowPhotoFrame(true)}
            className="bg-pink-400 hover:bg-pink-500 text-purple-800 font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            More
          </button>
          <button
            onClick={() => setShowGameSelector(true)}
            className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Play Games
          </button>
          <button
            onClick={() => setShowResponseForm(true)}
            className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Send Response
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showMessage ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-white text-xl"
        >
          {showMessage && (
            <p>Wishing you a day filled with joy, laughter, and unforgettable moments. May this year bring you endless opportunities and beautiful surprises!</p>
          )}
        </motion.div>

        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute"
            initial={{ y: '100vh', x: `${(index + 1) * 20}vw` }}
            animate={{
              y: '-20vh',
              transition: {
                duration: 15 + index * 2,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'linear'
              }
            }}
          >
            <span className="text-6xl">🎈</span>
          </motion.div>
        ))}
      </div>
      {showPhotoFrame && <PhotoFrame onClose={() => setShowPhotoFrame(false)} />}
      {showGameSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
            <button
              onClick={() => {
                setShowGameSelector(false)
                setSelectedGame(null)
              }}
              className="float-right text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
            {selectedGame ? (
              <>
                <button
                  onClick={() => setSelectedGame(null)}
                  className="mb-4 text-blue-500 hover:text-blue-700"
                >
                  ← Back to Game Selection
                </button>
                {renderSelectedGame()}
              </>
            ) : (
              <GameSelector games={games} onSelectGame={handleGameSelection} />
            )}
          </div>
        </div>
      )}
      {showResponseForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
            <button
              onClick={() => setShowResponseForm(false)}
              className="float-right text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
            <ResponseForm />
          </div>
        </div>
      )}
      <MusicPlayer />
    </div>
  )
}

export default BirthdayCard

