import React from 'react'
import styles from "../components/login.module.css"
import { Link } from 'react-router-dom'

export const Redirect = ({setGuest}) => {
  return (
    <div  className={styles.loginDiv}>
      <div className={styles.loginManeuvers}>
      <div></div>
      <div  className={styles.redirectSquare}>
        <h1 className='m-10 text-2xl font-bold'>Please Sign In to Continue</h1>
        <div>
          <Link className='m-5 text-xl font-bold' to="/" onClick={()=> setGuest(true)}>Go Back</Link>
          <Link className='m-5 text-xl font-bold' to="/login">Sign In</Link>
        </div>
      </div>
      
      <div></div>
      </div>
    </div>
    
  )
}
