import React, { useState } from 'react'
import app from "../firebaseConfig"
import { getDatabase, ref, set, push } from 'firebase/database'

export const Read = () => {
    const [productArray, setProductArray] = useState([]);

    const fetchData = async () => {
        const db = getDatabase(app);
        const dbRef= ref(db)
    }
  return (
    <div>Read</div>
  )
}
