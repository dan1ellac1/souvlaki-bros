// ✅ CreateUser.js (no admin restriction)
import React, { useState } from "react"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { getDatabase, ref, set } from "firebase/database"
import app from "../firebaseConfig"

export const CreateUser = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [newUserRole, setNewUserRole] = useState("user")

  const handleCreateUser = async () => {
    try {
      const auth = getAuth(app)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const createdUser = userCredential.user

      // store additional info
      const db = getDatabase(app)
      await set(ref(db, "users/" + createdUser.uid), {
        username,
        email,
        role: newUserRole,
      })

      alert("User created successfully!")
      setEmail("")
      setPassword("")
      setUsername("")
      setNewUserRole("user")
    } catch (err) {
      alert("Error: " + err.message)
    }
  }

  return (
    <div>
      <h1>Create a New Account</h1>

      <label>Username:</label>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <br />

      <label>Email:</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />

      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <label>Role:</label>
      <select value={newUserRole} onChange={(e) => setNewUserRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button onClick={handleCreateUser}>Create Account</button>
    </div>
  )
}
