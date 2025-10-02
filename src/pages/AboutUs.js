import React from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Link } from 'react-router-dom'
import One from "../components/IMAGES/pjat e lezetshme.jpg"
import Two from "../components/IMAGES/aboutus 1.webp"
import Placeholder from "../components/IMAGES/new ring placeholder.jpeg"
export const AboutUs = ({guest, setGuest}) => {
  return (
    <>
    <Header setGuest={setGuest} guest={guest}/>
    <main className='ml-7 mr-7'>
      <section className='flex flex-row m-9 font-bold bg-[#e8a033] border rounded-xl'>
        <div className='m-5 flex flex-row justify-evenly'>
        <img className='one-calibration' src={One} alt='' />
          <div>  <h1 className='text-center text-3xl'>Welcome to Souvlaki Bros!</h1>
            <p className='m-5 pt-4 '>
            Founded in 2019 in the heart of Kashar, Tirana, Souvlaki Bros has quickly grown to become a cornerstone of the fast-food scene in the Astir province.
What started as a humble dream to bring authentic Greek street flavors to Albania has now become a trusted name, known for its fresh ingredients, unmatched taste, 
and community-first values.</p>
            </div>
          </div>
      </section>

      <section className="m-9 border rounded border-color-[#dcdcdc] border-[5px]">
          <div className='m-5 flex flex-row justify-evenly'>
            <div>  
                <h1 className='text-center text-3xl'>
                  A Taste of Greece in Tirana
                </h1>
              <p className='m-5'>
              At Souvlaki Bros, we bring the essence of Greek cuisine to life — starting with our signature souvlaki, of course, but going much further. Our menu is inspired by traditional
Greek specialties, from rich pastas and creamy risottos to comforting homemade soups, all freshly prepared in-house.
We pride ourselves on being the first to truly imitate and master the unique flavors of Greece, offering a dining experience that’s both familiar and unforgettable.  
              </p>
            </div>
           <img src={Two} alt='two' />
          </div>
      </section>

      <section className='flex flex-row m-9 font-bold bg-[#e8a033] border rounded-xl'>
        <div className='m-5 flex flex-row justify-evenly'>
          <div>  <h1 className='text-center text-3xl'>
In the Heart of the New Tirana Ring</h1>
            <p className='m-5'>
           Located in the vibrant New Tirana Ring, Souvlaki Bros sits at the crossroads of modern living and traditional taste. Whether you're a local resident or just passing through,
our restaurant is easy to find, always welcoming, and full of flavor.</p>
            </div>
           <img src={Placeholder} alt='' />
          </div>
      </section>

      <section className='m-9 border rounded border-color-[#dcdcdc] border-[5px]'>
          <div className='p-5 text-center'>
            <p className='font-bold  text-3xl'>Service That Delivers</p>
            <p className='text-xl m-4 '>Too busy to visit? No problem. Our delivery service is one of the best in the area — fast, reliable, and always bringing your order hot and fresh, straight to your door.</p>

            <Link className='m-4 p-1 px-5 bg-[#e8a033] text-xl font-bold rounded-xl' to='/order-now'>Order Now</Link>
          </div>
        </section>
    </main>
    <Footer />
    </>
  )
}
