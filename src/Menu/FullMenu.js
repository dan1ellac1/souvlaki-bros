import React, { useEffect, useState } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, get, update } from "firebase/database";
import { DeleteProduct } from "../components/DeleteProduct";
import { EditTwoTone } from "@ant-design/icons";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { OrderShowcase } from "./OrderShowcase";
import { useLocation } from "react-router-dom";

export const FullMenu = ({ savedData }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const [productsByCategory, setProductsByCategory] = useState({});
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedPrice, setEditedPrice] = useState("");

  // --- Order-related state ---
  const [selectedProduct, setSelectedProduct] = useState({});
  const [counts, setCounts] = useState({});
  const location = useLocation();

  // ✅ Load order state (on mount or when coming from Order page)
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("userOrder"));
    if (saved) {
      setSelectedProduct(saved.selectedProduct || {});
      setCounts(saved.counts || {});
    }

    if (location.state?.selectedProduct) {
      setSelectedProduct(location.state.selectedProduct);
    }
    if (location.state?.counts) {
      setCounts(location.state.counts);
    }
  }, [location.state]);

  // 💾 Save order state automatically
  useEffect(() => {
    localStorage.setItem(
      "userOrder",
      JSON.stringify({ selectedProduct, counts })
    );
  }, [selectedProduct, counts]);

  // --- Handle product selection ---
  const handleProductSelection = (productId, product) => {
    setSelectedProduct((prev) => {
      const isAlreadySelected = !!prev[productId];
      const updated = { ...prev };
      if (isAlreadySelected) {
        delete updated[productId];
      } else {
        updated[productId] = product;
      }
      return updated;
    });
  };

  // --- Auth + Role check ---
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const db = getDatabase(app);
        const roleRef = ref(db, "users/" + currentUser.uid);
        const snap = await get(roleRef);
        setRole(snap.exists() ? snap.val().role : "user");
      } else setRole(null);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  // --- Fetch products ---
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

  // --- Edit product logic (unchanged) ---
  const handleEditClick = (category, productId, product) => {
    setEditingProduct({ category, productId });
    setEditedName(product.productName);
    setEditedDescription(product.productDescription);
    setEditedPrice(product.productPrice || "");
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
      productPrice: parseFloat(editedPrice) || 0,
    });
    setEditingProduct(null);
    fetchData();
  };

  const ProductItem = ({ category, productId, item, selected, onSelect }) => {
    const isEditing =
      editingProduct &&
      editingProduct.category === category &&
      editingProduct.productId === productId;

    return (
      <li
        onClick={() => !isEditing && onSelect && onSelect(productId, item)}
        className={`p-3 mb-3 rounded ${
          onSelect ? "cursor-pointer hover:bg-gray-100" : ""
        } ${selected ? "bg-green-200" : ""}`}
      >
        {isEditing ? (
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
            <div>
              <p className="text-xl font-bold">{item.productName}</p>
              <p>{item.productDescription}</p>
              <p className="text-green-700 font-semibold">
                {item.productPrice?.toFixed(2) ?? "N/A"} leke
              </p>
            </div>

            {role === "admin" && (
              <div className="mt-1 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(category, productId, item);
                  }}
                  className="border border-blue-500 text-blue-500 px-3 py-1 rounded"
                >
                  <EditTwoTone />
                </button>
                <DeleteProduct
                  category={category}
                  productId={productId}
                  onDeleted={fetchData}
                />
              </div>
            )}
          </>
        )}
      </li>
    );
  };

  const renderCategory = ([category, items]) => {
    if (!category) return <div className="p-6"></div>;
    return (
      <div
        key={category}
        className="p-6 border rounded border-[#dcdcdc] border-[3px]"
      >
        <h1 className="text-3xl font-bold mb-2">{category}</h1>
        <ul>
          {Object.entries(items).map(([productId, item]) => (
            <ProductItem
              key={productId}
              category={category}
              productId={productId}
              item={item}
              {...(user
                ? {
                    selected: !!selectedProduct[productId],
                    onSelect: handleProductSelection,
                  }
                : {})}
            />
          ))}
        </ul>
      </div>
    );
  };

  const categoryEntries = Object.entries(productsByCategory);
  const totalSlots = Math.ceil(categoryEntries.length / 2) * 2;
  const paddedCategories = [...categoryEntries];
  while (paddedCategories.length < totalSlots)
    paddedCategories.push([null, null]);
  const row1 = paddedCategories.slice(0, totalSlots / 2);
  const row2 = paddedCategories.slice(totalSlots / 2);

  if (loadingAuth) return <p>Loading...</p>;

  return (
    <div className="m-9 p-7 bg-white rounded-md shadow-xl border-[#dcdcdc]">
      {[row1, row2].map((row, i) => (
        <div key={i} className="grid grid-cols-4 gap-6 mb-6">
          {row.map(renderCategory)}
        </div>
      ))}

      {user && Object.keys(selectedProduct).length > 0 && (
        <div className="mt-8">
          <OrderShowcase
            selectedProduct={selectedProduct}
            counts={counts}
            setCounts={setCounts}
          />
        </div>
      )}
    </div>
  );
};
