import React from 'react'
import styles from  "./login.module.css"
import {Link} from "react-router-dom"
import Input from 'antd/es/input/Input'
import { UserOutlined, LockOutlined } from '@ant-design/icons'


export const Login = () => {
  return (
    <div className={styles.loginDiv} >
      <div className={styles.loginManeuvers}>
        <div></div>
        <div className={`${styles.loginSquare}`}>
          <form className='flex flex-col m-4'>
            <Link className='mt-10 bg-[#e76a12] p-4 font-bold text-white rounded border-[#dcdcdc]' to='/'>Continue as Guest</Link>

            <h1 className='p-5 font-bold'>or</h1>
            <Input className=' border-[2px] mt-2  text-black p-4  mr-2 rounded border-[#e76a12] text-xl'  type="text" prefix={<UserOutlined style={{ fontSize: "20px", color: "#e76a12" }} />} placeholder="Email"/>
            <br/>
            <Input className=' border-[2px] text-black p-4  mr-2 rounded border-[#e76a12] text-xl'  type="password" prefix={<LockOutlined style={{ fontSize: "20px", color: "#e76a12" }} />} placeholder="Password"/>
            <div className='flex justify-between'>
            <Link className='underline'>Create Account</Link>
            <Link className='italic'>Forgot password?</Link>
            </div>
            

            <Link className='mt-10 bg-[#e76a12] p-4 font-bold text-white rounded border-[#dcdcdc]' to='/'>Log In</Link>
          </form>
        </div>
        <div></div>
      </div>
    </div>
  )
}
