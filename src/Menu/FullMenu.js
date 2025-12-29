import React, { useEffect, useState } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, get, update } from "firebase/database";
import { DeleteProduct } from "../components/DeleteProduct";
import { EditTwoTone } from "@ant-design/icons";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { OrderShowcase } from "./OrderShowcase";
import { useLocation } from "react-router-dom";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

export const FullMenu = ({ savedData }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const [productsByCategory, setProductsByCategory] = useState({});
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedPrice, setEditedPrice] = useState("");

  const [selectedProduct, setSelectedProduct] = useState({});
  const [counts, setCounts] = useState({});
  const location = useLocation();

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Convert any image to PNG in browser
  const convertToPngBlob = (file) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => (blob ? resolve(blob) : reject("PNG conversion failed")),
          "image/png",
          0.92
        );
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });

  // --- Load order state
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

  // --- Save order state automatically
  useEffect(() => {
    localStorage.setItem("userOrder", JSON.stringify({ selectedProduct, counts }));
  }, [selectedProduct, counts]);

  // --- Handle product selection
  const handleProductSelection = (productId, product) => {
    setSelectedProduct((prev) => {
      const updated = { ...prev };
      if (updated[productId]) delete updated[productId];
      else updated[productId] = product;
      return updated;
    });
  };

  // --- Auth + Role check
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

  // --- Fetch products
  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "products");
    const snapshot = await get(dbRef);
    setProductsByCategory(snapshot.exists() ? snapshot.val() : {});
  };

  useEffect(() => {
    fetchData();
  }, [savedData]);

  // --- Edit product logic
  const handleEditClick = (category, productId, product) => {
    setEditingProduct({ category, productId });
    setEditedName(product.productName);
    setEditedDescription(product.productDescription);
    setEditedPrice(product.productPrice || "");
    setImagePreview(product.imageUrl || "");
    setImageFile(null);
  };

  const handleSaveEdit = async () => {
    if (!editingProduct) return;

    try {
      const db = getDatabase(app);
      const storage = getStorage(app);

      let imageUrl = imagePreview || "";

      // Upload only if user selected a new file
      if (imageFile) {
        // Always convert to PNG
        const pngBlob = await convertToPngBlob(imageFile);

        const imgRef = storageRef(
          storage,
          `productImages/${editingProduct.category}/${editingProduct.productId}.png`
        );

        await uploadBytes(imgRef, pngBlob, {
          contentType: "image/png",
        });

        imageUrl = await getDownloadURL(imgRef);
      }

      const productRef = ref(
        db,
        `products/${editingProduct.category}/${editingProduct.productId}`
      );

      await update(productRef, {
        productName: editedName,
        productDescription: editedDescription,
        productPrice: parseFloat(editedPrice) || 0,
        imageUrl,
      });

      setEditingProduct(null);
      setImageFile(null);
      setImagePreview("");
      fetchData();
    } catch (err) {
      console.error("Save failed:", err);
      alert("Save failed: " + (err.message || err));
    }
  };

  // --- Product item rendering ---
  const ProductItem = ({ category, productId, item, selected, onSelect }) => {
    const isEditing =
      editingProduct &&
      editingProduct.category === category &&
      editingProduct.productId === productId;

    return (
      <li
        onClick={() => !isEditing && onSelect && onSelect(productId, item)}
        className={`p-3 md:p-4 mb-3 rounded ${
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

            <div className="ml-2">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Product"
                  className="w-24 h-24 object-cover rounded mb-2 border"
                />
              )}

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setImageFile(file);
                  setImagePreview(URL.createObjectURL(file));
                }}
              />
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleSaveEdit();
              }}
              className="ml-2 bg-green-600 text-white px-3 py-1 rounded"
            >
              Save
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setEditingProduct(null);
              }}
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
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.productName}
                  className="w-24 h-24 object-cover rounded mt-2 border"
                />
              )}
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
    if (!category) return <div className="p-6" />;
    return (
      <div
        key={category}
        className="p-4 md:p-6 border rounded border-[#dcdcdc] border-[3px] bg-white"
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

  if (loadingAuth) return <p>Loading...</p>;

  let categoryEntries = Object.entries(productsByCategory);
  categoryEntries.sort(([a], [b]) => {
    if (a === "Alcohol") return 1;
    if (b === "Alcohol") return -1;
    return a.localeCompare(b);
  });

  return (
    <div className="m-2 md:m-6 lg:m-9 p-4 md:p-7 bg-white rounded-md shadow-xl border-[#dcdcdc]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-6">
        {categoryEntries.map(renderCategory)}
      </div>

      {user && Object.keys(selectedProduct).length > 0 && (
        <div className="mt-8 w-full">
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
