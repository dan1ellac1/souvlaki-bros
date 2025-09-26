import React from 'react'
import styles from  "./login.module.css"
import {Link} from "react-router-dom"

export const Login = () => {
  return (
    <div className={styles.loginDiv} >
      <div className={styles.loginManeuvers}>
        <div></div>
        <div className={`${styles.loginSquare}`}>
          <h1 className='text-2xl font-bold'>Identification</h1>
          <form className='flex flex-col'>
            <label className='m-3 text-xl '>Email</label>
            <input className='border-[2px] text-black pl-2 rounded border-[#e76a12]' type="text" placeholder='Email'/>
            <label className='m-3 text-xl '>Password</label>
            <input className='border-[2px] text-black pl-2 rounded border-[#e76a12]' type="text" placeholder='Password' />

            <Link className='m-3 bg-black w-[50%] p-1 font-bold rounded' to='/'>Continue as Client</Link>
          </form>
        </div>
        <div></div>
      </div>
    </div>
  )
}
