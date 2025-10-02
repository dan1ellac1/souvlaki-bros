import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "./bros logo.webp"
import { PoweroffOutlined, UserOutlined  } from '@ant-design/icons'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import app from '../firebaseConfig';


export const Header = ({setGuest, guest}) => {


  //logout experiment
  const navigate = useNavigate();
  const handleLogout = async () => {
    const auth = getAuth(app);
    await signOut(auth);
    setGuest(false)
    navigate("/login"); // redirect to login
  };
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
          <button
            onClick={handleLogout}
            className="bg-black text-white px-8 ml-4"
          >
            {guest ? <UserOutlined /> : <PoweroffOutlined /> }
          </button>
        </div>
      </nav>
    </header>
  )
}
