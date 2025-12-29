import React, { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getDatabase, ref, get, push, set } from "firebase/database"
import app from "../firebaseConfig"

export const Write = () => {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  const [productName, setProductName] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [category, setCategory] = useState("")

  // 🧠 Check auth state and get role when user changes
  useEffect(() => {
    const auth = getAuth(app)
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)

      if (currentUser) {
        // Fetch role from DB
        const db = getDatabase(app)
        const roleRef = ref(db, "users/" + currentUser.uid)
        const snapshot = await get(roleRef)

        if (snapshot.exists()) {
          setRole(snapshot.val().role)
        } else {
          setRole("user") // fallback if no role found
        }
      } else {
        setRole(null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // ✍️ Save product if admin
  const saveProduct = async () => {
    if (!category) {
      alert("Please select a category")
      return
    }

    const db = getDatabase(app)
    const categoryRef = ref(db, `/products/${category}`)
    const newDocRef = push(categoryRef)

    await set(newDocRef, {
      productName,
      productDescription,
    })

    alert("Product added successfully!")
    setProductName("")
    setProductDescription("")
    setCategory("")
  }

  // 🕐 While checking auth state
  if (loading) return <p>Loading...</p>

  // 🚫 Not logged in
  if (!user)
  return (
    <div className="p-6 m-11 text-center rounded-xl shadow-md border border-gray-200">
      <p className="text-lg font-semibold tracking-wide">
        Please log in to place your order
      </p>
      <p className="text-sm text-gray-500 mt-1">
        Access your account to continue
      </p>
    </div>
  )

// 🚫 Logged in but not admin (regular user)
if (role !== "admin")
  return (
    <div className="p-6 m-11 text-center rounded-xl shadow-md border border-gray-200">
      <p className="text-lg font-semibold tracking-wide">
        Please select the products for your order
      </p>
      <p className="text-sm text-gray-500 mt-1">
        Browse the menu and add items to continue
      </p>
    </div>
  ) 
  // ✅ Logged in & admin — show the form
  return (
    <div>
      <h1>Add Product</h1>

      <label>Product Name:</label>
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <br />

      <label>Description:</label>
      <input
        type="text"
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
      />
      <br />

      <label>Category:</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select category</option>
        <option value="specialities">Bros Specialities</option>
        <option value="chickenProducts">Chicken Products</option>
        <option value="porkProducts">Pork Products</option>
        <option value="gyro">Gyro</option>
        <option value="kitchen">Kitchen</option>
        <option value="kitchen/pasta">Pasta</option>
        <option value="kitchen/salads">Salads</option>
        <option value="Sodas">Sodas</option>
        <option value="Alcohol">Alcohol</option>
      </select>
      <br />

      <button onClick={saveProduct}>Save Product</button>
    </div>
  )
}
