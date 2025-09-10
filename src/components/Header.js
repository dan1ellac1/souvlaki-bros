import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "./bros logo.webp"

export const Header = () => {
  return (
    <header className='bg-black h-[10%]'>
      <nav className='flex  justify-around
'>
        <div>
          <Link to='/' className=''alt="">
            <img className='image-calibration' src={Logo}  alt="" />
          </Link>
        </div>
        <div className=' flex font-bold items-center text-lg text-[#e8a133] '>
          <Link className='p-1 pl-6 hover:text-white' to="/">Home</Link>
          <Link className='p-1 pl-6 hover:text-white' to="/about-us">About</Link>
          <Link className='p-1 pl-6 hover:text-white' to="/products">Menu</Link>
          <Link className='p-1 pl-6 hover:text-white' to="/order">Order Now!</Link>
        </div>
      </nav>
    </header>
  )
}
