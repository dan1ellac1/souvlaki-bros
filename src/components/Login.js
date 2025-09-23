import React from 'react'
import styles from  "./login.module.css"

export const Login = () => {
  return (
    <div className={styles.loginDiv} >
      <div className={styles.loginManeuvers}>
        <div></div>
        <div className={`${styles.loginSquare}`}>
        <h1>Enter as Client</h1>
        </div>
        <div></div>
      </div>
    </div>
  )
}
