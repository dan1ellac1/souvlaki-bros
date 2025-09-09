import React, { useState } from 'react'
import app from "../firebaseConfig"
import { getDatabase, ref, set, push } from 'firebase/database'

export const Write = () => {

  const [inputValue1, setInputValue1] = useState("")
  const [inputValue2, setInputValue2] = useState('')

const savedData = async () => {
  const db = getDatabase(app);
  const newDocRef = push(ref(db, '/products'));
  set(newDocRef, {
    productName: inputValue1,
    productDescription: inputValue2
  }).then( () =>{
    alert("data saved succesfully")
  }).catch((error) =>{
    alert("error: ", error.message)
  })
}

  return (
    <div>
      <input type="text" value={inputValue1} onChange={e=> setInputValue1(e.target.value)} />
      <br/>
      <input type="text" value={inputValue2} onChange={e=> setInputValue2(e.target.value)} />
      <br/>
      <button onClick={savedData}>Save Data</button>
    </div>
  )
}
