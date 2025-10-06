import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "./bros logo.webp"
import { PoweroffOutlined, UserOutlined  } from '@ant-design/icons'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import app from '../firebaseConfig';
import { useSnackbar } from 'notistack';


export const Header = ({user, guest, setGuest, phoneVerified}) => {


  //logout experiment
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar()

  const handleOrderGuest = (e) =>{
    e.preventDefault();

    if(!user){
      enqueueSnackbar("Please Log in to order!",
        {
          variant:"warning"
        }
      )
     return navigate("/login")
     
    }
    if(!phoneVerified) {
      enqueueSnackbar("Phone Number not verified",{
        variant:"warning"
      })
      return navigate("/numberConfirmation")
      
    }
    else navigate("/order")
  }



  const handleLogout = async () => {
    const auth = getAuth(app);
    await signOut(auth);
    setGuest(false)
    navigate("/login"); // redirect to login
  };
  return (
    <header className='bg-[#0d0304] h-[10%]'>
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
          <Link className='p-1 pl-6 hover:text-white' to="/order" onClick={handleOrderGuest}>Order Now!</Link>
          <button
            onClick={handleLogout}
            className="bg-[#0d0304] text-white px-8 ml-4"
          > 
            {guest ? < UserOutlined className='bg-[#0d0304]' onClick={handleLogout}/> : <PoweroffOutlined className='bg-[#0d0304]' onClick={handleLogout}/> }
          </button>
        </div>
      </nav>
    </header>
  )
}
