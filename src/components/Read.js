import React, { useEffect, useState } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";

export const Read = () => {
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
    <div>
      {Object.entries(productsByCategory).map(([category, items]) => (
        <div key={category} style={{ marginBottom: "20px" }}>
          <h2>{category}</h2>
          <ul>
            {Object.values(items).map((item, idx) => (
              <li key={idx}>
                <strong>{item.productName}</strong> — {item.productDescription}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
