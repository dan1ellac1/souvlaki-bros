import React from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Link } from 'react-router-dom'
import One from "../components/IMAGES/pjat e lezetshme.jpg"
import Two from "../components/IMAGES/aboutus 1.webp"
import Placeholder from "../components/IMAGES/new ring placeholder.jpeg"

export const AboutUs = ({guest, setGuest, user, phoneVerified, phoneNumber}) => {
  return (
    <>
      <Header
        phoneVerified={phoneVerified}
        setGuest={setGuest}
        guest={guest}
        user={user}
        phoneNumber={phoneNumber}
      />

      <main className="mx-4 md:mx-7">
        
        {/* Section 1 */}
        <section className="flex flex-col md:flex-row m-4 md:m-9 font-bold bg-[#e8a033] border rounded-xl">
          <div className="m-4 md:m-5 flex flex-col md:flex-row items-center justify-evenly gap-5">
            <img className="w-full md:w-1/2 rounded-xl object-cover" src={One} alt="" />
            <div className="max-w-xl">
              <h1 className="text-center text-2xl md:text-3xl">Welcome to Souvlaki Bros!</h1>
              <p className="m-4 md:m-5 pt-2 md:pt-4 text-base md:text-lg">
                Founded in 2019 in the heart of Kashar, Tirana, Souvlaki Bros has quickly grown to become a cornerstone 
                of the fast-food scene in the Astir province. What started as a humble dream to bring authentic Greek street flavors 
                to Albania has now become a trusted name…
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="m-4 md:m-9 border rounded border-[#dcdcdc] border-[5px]">
          <div className="m-4 md:m-5 flex flex-col md:flex-row items-center justify-evenly gap-5">
            <div className="max-w-xl">
              <h1 className="text-center text-2xl md:text-3xl">A Taste of Greece in Tirana</h1>
              <p className="m-4 md:m-5 text-base md:text-lg">
                At Souvlaki Bros, we bring the essence of Greek cuisine to life — starting with our signature souvlaki…
              </p>
            </div>
            <img className="w-full md:w-1/2 rounded-xl object-cover" src={Two} alt="two" />
          </div>
        </section>

        {/* Section 3 */}
        <section className="flex flex-col md:flex-row m-4 md:m-9 font-bold bg-[#e8a033] border rounded-xl">
          <div className="m-4 md:m-5 flex flex-col md:flex-row items-center justify-evenly gap-5">
            <div className="max-w-xl">
              <h1 className="text-center text-2xl md:text-3xl">In the Heart of the New Tirana Ring</h1>
              <p className="m-4 md:m-5 text-base md:text-lg">
                Located in the vibrant New Tirana Ring, Souvlaki Bros sits at the crossroads…
              </p>
            </div>
            <img className="w-full md:w-1/2 rounded-xl object-cover" src={Placeholder} alt="" />
          </div>
        </section>

        {/* Section 4 */}
        <section className="m-4 md:m-9 border rounded border-[#dcdcdc] border-[5px]">
          <div className="p-5 text-center">
            <p className="font-bold text-2xl md:text-3xl">Service That Delivers</p>
            <p className="text-lg md:text-xl m-4">
              Too busy to visit? No problem…
            </p>
            <Link
              className="m-4 p-2 md:px-6 bg-[#e8a033] text-lg md:text-xl font-bold rounded-xl inline-block"
              to="/order-now"
            >
              Order Now
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
