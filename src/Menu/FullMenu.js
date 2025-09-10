import React, { useEffect, useState } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";

export const FullMenu = () => {
  const [productsByCategory, setProductsByCategory] = useState({});

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "products");
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      setProductsByCategory(snapshot.val());
    } else {
      alert("No data found");
    }
  };

  useEffect(()=>{
    fetchData()
  },[])

  return (
    <div className="m-9 p-7 bg-[#e8a033]">
      {Object.entries(productsByCategory).map(([category, items]) => (
        <div key={category} style={{ marginBottom: "20px" }}>
          <h2>{category}</h2>
          <ul>
            {Object.values(items).map((item, idx) => (
              <li key={idx}>
               <p className="">{item.productName}</p>
               <p> {item.productDescription}</p> 
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
