import React, { useState } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, update } from "firebase/database";

export const UpdateProduct = ({ category, productId, currentName, currentDescription, onUpdated }) => {
  const [newName, setNewName] = useState(currentName);
  const [newDescription, setNewDescription] = useState(currentDescription);

  const handleUpdate = async () => {
    if (!newName || !newDescription) {
      alert("Both fields are required");
      return;
    }

    const db = getDatabase(app);
    const productRef = ref(db, `products/${category}/${productId}`);

    await update(productRef, {
      productName: newName,
      productDescription: newDescription,
    })
      .then(() => {
        alert("Product updated successfully");
        onUpdated && onUpdated(); // notify parent to refresh
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  };

  return (
    <div className="p-3 border rounded bg-yellow-100 my-2">
      <input
        className="border p-1 rounded mr-2"
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <input
        className="border p-1 rounded mr-2"
        type="text"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-3 py-1 rounded"
        onClick={handleUpdate}
      >
        Update
      </button>
    </div>
  );
};
