import React from 'react'
import styles from './response-form.module.css'

const ResponseForm: React.FC = () => {
  return (
    <div className={styles.responseForm}>
      <h2 className={styles.title}>Your Response</h2>
      <iframe
        src="https://forms.gle/if5631LtFKsnTNQi6"
        width="100%"
        height="500"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
      >
        Loading…
      </iframe>
    </div>
  )
}

export default ResponseForm

