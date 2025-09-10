import {React} from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import UnderNav from "../components/under-nav.jpg"
import { Link } from 'react-router-dom'
import { ProductList } from './ProductList'
import BrosLogo from "../components/bros-map.png"

export const Home = () => {
  return (
    <>
    <Header />
      <main className='ml-7 mr-7'>
        <section className='flex flex-row m-9 font-bold bg-[#e8a033] border rounded-xl'>
          <div className='m-5 flex flex-col justify-evenly'>
            <h1 className='text-center text-3xl'>Welcome to Souvlaki Bros!</h1>
            <p className='m-5'>
            Craving something quick, tasty, and satisfying? At Souvlaki Bros, we serve up classic fast food favorites made fresh and fast. From juicy burgers and crispy fries to chicken sandwiches, wraps, and refreshing drinks — we've got something for every appetite. Whether you're dining in, grabbing takeout, or ordering online, we're here to fuel your day with great flavor and fast service.</p>
            <Link className='text-center border border-[2px] border-black text-2xl ml-[25%] mr-[25%] bg-black text-white rounded-3xl' to="/about-us">About Us</Link>
          </div>
          <div>
            <img className=' under-nav-calibration' src={UnderNav} alt="" />
          </div>
        </section>

        <section className='m-9 '>
          <ProductList/>
        </section>

        <section className='m-9 bg-[#e8a033] border rounded-xl'>
          <div className='m-3'>
            <h1 className='text-4xl font-bold text-center mb-5'>Contact Us</h1>
            <p className='text-lg font-bold text-center'>Souvlaki Bros is located on Rruga Mikel Maruli in the Astir/Yzberisht area of Tirana. You can enjoy our delicious offerings daily</p>
            <p className='text-lg font-bold text-center'>We are open from 11:00 to 02:00 early in the morning, every day of the week </p>
          </div>
          <div className='m-9 flex font-bold justify-between'>
              <div className='flex flex-row'>
                <p className='text-lg text-center'>+355 68 741 2345</p>

              </div>
              <img src={BrosLogo} className='map-calibration' alt="" />
          </div>
        </section>

        <section className='m-9 bg-black border  rounded-xl'>
          <div className='p-5 text-center'>
            <p className='font-bold text-white text-3xl'>Already decided on dinner?</p>
            <p className='text-xl m-4 text-white'>Take a shortcut and order right here, right now! Our operators will see to contact you ASAP!</p>
            <Link className='m-4 p-1 px-5 bg-[#e8a033] text-xl font-bold rounded-xl' to='/order-now'>Order Now</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
