'use client'

import React, { useState, useRef, useEffect } from 'react'
import styles from './music-player.module.css'

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio('/song.mp3') // Replace with your actual audio file
    audioRef.current.loop = true // This will make the song loop

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className={styles.musicPlayer}>
      <button onClick={togglePlay} className={styles.playButton}>
        {isPlaying ? 'Pause Music' : 'Play Music'}
      </button>
    </div>
  )
}

export default MusicPlayer

