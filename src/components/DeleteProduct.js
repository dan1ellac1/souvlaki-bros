import React from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, remove } from "firebase/database";
import { DeleteOutlined } from "@ant-design/icons";

export const DeleteProduct = ({ category, productId, onDeleted }) => {
  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    const db = getDatabase(app);
    const productRef = ref(db, `products/${category}/${productId}`);

    remove(productRef)
      .then(() => {
        alert("Product deleted successfully");
        onDeleted && onDeleted(); // refresh parent list
      })
      .catch((error) => {
        alert("Error deleting product: " + error.message);
      });
  };

  return (
    <button
      onClick={handleDelete}
      className="ml-2 bg-red-600 border-red-500 border-[2px] text-white px-3 py-1 rounded"
    >
      <DeleteOutlined />
    </button>
  );
};
