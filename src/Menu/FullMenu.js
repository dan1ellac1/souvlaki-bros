import React, { useEffect, useState } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, get, update } from "firebase/database";
import { DeleteProduct } from "../components/DeleteProduct"; // adjust path if needed
import { EditTwoTone } from "@ant-design/icons";

export const FullMenu = ({ savedData }) => {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedPrice, setEditedPrice] = useState(""); // NEW

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "products");
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      setProductsByCategory(snapshot.val());
    } else {
      setProductsByCategory({});
      alert("No data found");
    }
  };

  useEffect(() => {
    fetchData();
  }, [savedData]);

  const handleEditClick = (category, productId, product) => {
    setEditingProduct({ category, productId });
    setEditedName(product.productName);
    setEditedDescription(product.productDescription);
    setEditedPrice(product.productPrice || ""); // NEW
  };

  const handleSaveEdit = async () => {
    if (!editingProduct) return;

    const db = getDatabase(app);
    const productRef = ref(
      db,
      `products/${editingProduct.category}/${editingProduct.productId}`
    );

    await update(productRef, {
      productName: editedName,
      productDescription: editedDescription,
      productPrice: parseFloat(editedPrice) || 0, // NEW
    });

    setEditingProduct(null);
    fetchData();
  };

  // prepare categories for 2 rows layout
  const categoryEntries = Object.entries(productsByCategory);
  const totalSlots = Math.ceil(categoryEntries.length / 2) * 2; // ensures even slots
  const paddedCategories = [...categoryEntries];
  while (paddedCategories.length < totalSlots) paddedCategories.push([null, null]); // empty slots

  // split into 2 rows
  const row1 = paddedCategories.slice(0, totalSlots / 2);
  const row2 = paddedCategories.slice(totalSlots / 2);

  const renderCategory = ([category, items]) => {
    if (!category) return <div className="p-6"></div>; // empty slot

    return (
      <div key={category} className="p-6 border rounded border-color-[#dcdcdc] border-[5px]">
        <h1 className="text-3xl font-bold mb-2">{category}</h1>
        <ul>
          {Object.entries(items).map(([productId, item]) => (
            <li key={productId} className="mb-3">
              {editingProduct &&
              editingProduct.category === category &&
              editingProduct.productId === productId ? (
                <>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="border p-1"
                  />
                  <textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className="border p-1 ml-2"
                  />
                  <input
                    type="number"
                    step="0.01"
                    value={editedPrice}
                    onChange={(e) => setEditedPrice(e.target.value)}
                    className="border p-1 ml-2 w-24"
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="ml-2 bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingProduct(null)}
                    className="ml-2 bg-gray-600 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p className="text-xl font-bold">{item.productName}</p>
                  <p>{item.productDescription}</p>
                  <p className="text-green-700 font-semibold">
                    {item.productPrice?.toFixed(2) ?? "N/A"} leke
                  </p>
                  <div className="mt-1">
                    <button
                      onClick={() => handleEditClick(category, productId, item)}
                      className="border border-blue-500 border-[2px] text-white px-3 py-1 rounded"
                    >
                      <EditTwoTone />
                    </button>
                    <DeleteProduct
                      category={category}
                      productId={productId}
                      onDeleted={fetchData}
                    />
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="m-9 p-7 bg-white rounded-md shadow-xl border-[#dcdcdc] ">
      {[row1, row2].map((row, i) => (
        <div key={i} className="grid grid-cols-4 gap-6 mb-6">
          {row.map(renderCategory)}
        </div>
      ))}
    </div>
  );
};
