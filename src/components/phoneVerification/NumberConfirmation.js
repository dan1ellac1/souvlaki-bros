import React from 'react'
import { useNavigate } from 'react-router-dom'

export const NumberConfirmation= () => {

  const navigate = useNavigate()

  const handlePhoneCorrect = (e) =>{
    e.preventDefault();
    navigate("/phoneVerification")
  }

  const handlePhoneFalse = (e) =>{
    e.preventDefault();
    navigate("/editPhoneNumber")
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#f5f5f5]">
      <div className="bg-white p-10 rounded-lg shadow-md text-center w-[400px]">
        <h2 className="text-2xl font-bold">Is this your Correct Number?</h2>
        <h2 className="text-md mb-4 text-gray-600">NOTE! If your phone number is false you will not be able to order from the website!</h2>


        <button onClick={handlePhoneCorrect} className="w-full bg-[#e76a12] text-white font-bold py-2 rounded mb-3">Yes this is my correct phone number </button>
        <button onClick={handlePhoneFalse} className={`w-full border-2 py-2 rounded`}>Change phone number</button>
      </div>
    </div>
  )
}
