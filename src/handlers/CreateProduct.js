import React, { useState } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, push, set } from "firebase/database";

export const CreateProduct = ({ savedData }) => {
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputCategory, setInputCategory] = useState("");
  const [inputPrice, setInputPrice] = useState(""); // NEW

  const handleSave = async () => {
    if (!inputValue1) {
      alert("Please place product Name");
      return;
    }
    if (!inputValue2) {
      alert("Please set description");
      return;
    }
    if (!inputCategory) {
      alert("Please select a category");
      return;
    }
    if (!inputPrice || isNaN(inputPrice)) {
      alert("Please set a valid price");
      return;
    }

    const db = getDatabase(app);
    const categoryRef = ref(db, `/products/${inputCategory}`);
    const newDocRef = push(categoryRef);

    set(newDocRef, {
      productName: inputValue1,
      productDescription: inputValue2,
      productPrice: parseFloat(inputPrice), // NEW
    })
      .then(() => {
        alert("Data saved successfully");
        setInputValue1("");
        setInputValue2("");
        setInputCategory("");
        setInputPrice(""); // RESET NEW
        savedData && savedData();
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  };

  return (
    <div className="m-9 border bg-[#e8a033] p-7 rounded-xl">
      <h1 className="p-1 text-xl font-bold">Insert Item in Menu</h1>

      <div className="p-1">
        <label>Name of product:</label>
        <input
          className="pl-2 rounded-md ml-1"
          type="text"
          value={inputValue1}
          onChange={(e) => setInputValue1(e.target.value)}
          required
        />
      </div>

      <div className="p-1">
        <label>Description of product:</label>
        <input
          required
          className="pl-2 rounded-md ml-1"
          type="text"
          value={inputValue2}
          onChange={(e) => setInputValue2(e.target.value)}
        />
      </div>

      <div className="p-1">
        <label>Price:</label>
        <input
          required
          className="pl-2 rounded-md ml-1"
          type="number"
          step="0.01"
          value={inputPrice}
          onChange={(e) => setInputPrice(e.target.value)}
        />
      </div>

      <div className="p-1">
        <label>Category:</label>
        <select
          required
          className="pl-2 rounded-md ml-1"
          value={inputCategory}
          onChange={(e) => setInputCategory(e.target.value)}
        >
          <option value="">Select category</option>
          <option value="Bros Specialities">Bros Specialities</option>
          <option value="Chicken Products">Chicken Products</option>
          <option value="Pork Products">Pork Products</option>
          <option value="Gyro">Gyro</option>
          <option value="Kitchen">Kitchen</option>
          <option value="Pasta">Pasta</option>
          <option value="Salads">Salads</option>
        </select>
      </div>

      <button
        className="mt-2 bg-black text-[#e8a033] pl-4 pr-4 rounded-md"
        onClick={handleSave}
      >
        Save Data
      </button>
    </div>
  );
};
