'use client'

import React from 'react'
import styles from './photo-frame.module.css'

interface PhotoFrameProps {
  onClose: () => void;
}

const PhotoFrame: React.FC<PhotoFrameProps> = ({ onClose }) => {
  const [showMessage, setShowMessage] = React.useState(false)

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.frame} onClick={() => setShowMessage(true)}>
          <div className={styles.sparkles}></div>
          <div className={styles.photoPlaceholder}>
            <p className={styles.placeholderText}>
              I don't have any of your photos, so this space is empty for now. But this space is reserved for your beautiful photo.
            </p>
          </div>
          <div className={styles.hearts}></div>
        </div>
        {showMessage && (
          <div className={styles.message} onClick={() => setShowMessage(false)}>
            <p>You make life more beautiful!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PhotoFrame

