import React, { useState } from 'react'
import app from "../firebaseConfig"
import { getDatabase, ref, push, set } from 'firebase/database'

export const CreateProduct = () => {
  const [inputValue1, setInputValue1] = useState("")
  const [inputValue2, setInputValue2] = useState("")
  const [inputCategory, setInputCategory] = useState("")

  const savedData = async () => {
    if (!inputCategory) {
      alert("Please select a category")
      return
    }

    const db = getDatabase(app);
    const categoryRef = ref(db, `/products/${inputCategory}`);
    const newDocRef = push(categoryRef);

    set(newDocRef, {
      productName: inputValue1,
      productDescription: inputValue2
    })
      .then(() => {
        alert("Data saved successfully")
        setInputValue1("")
        setInputValue2("")
        setInputCategory("")
      })
      .catch((error) => {
        alert("Error: " + error.message)
      })
  }

  return (
    <div className='m-9 border bg-[#e8a033] p-7 rounded-xl'>
      <h1 className='p-1 text-xl font-bold'>Insert Item in Menu</h1>
      <div className='p-1'>
      <label className=''>Name of product:</label>
      <input className='pl-2 rounded-md ml-1'
        type="text"
        value={inputValue1}
        onChange={e => setInputValue1(e.target.value)}
      />
      <br />
      </div>
      <div className='p-1'>
      <label>Description of product:</label>
      <input className='pl-2 rounded-md ml-1' 
        type="text" 
        value={inputValue2}
        onChange={e => setInputValue2(e.target.value)}
      />
      <br />
      </div>
      <div className='p-1'>
      <label>Category:</label>
      <select className='pl-2 rounded-md ml-1'
        value={inputCategory}
        onChange={e => setInputCategory(e.target.value)}
      >
        <option value="">Select category</option>
        <option value="specialities">Bros Specialities</option>
        <option value="chickenProducts">Chicken Products</option>
        <option value="porkProducts">Pork Products</option>
        <option value="gyro">Gyro</option>
        <option value="kitchen">Kitchen</option>
        <option value="kitchen/pasta">Pasta</option>
        <option value="kitchen/salads">Salads</option>
      </select>
      <br />
      </div>

      <button className='mt-2 bg-black text-[#e8a033] pl-4 pr-4 rounded-md' onClick={savedData}>Save Data</button>
    </div>
  )
}
