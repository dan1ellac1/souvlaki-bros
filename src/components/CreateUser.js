  import React, { useState } from "react"
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
  import { getDatabase, ref, set } from "firebase/database"
  import styles from "./login.module.css"
  import app from "../firebaseConfig"
  import { Input } from "antd"
  import { Link } from "react-router-dom"
  import { useSnackbar } from "notistack"
  import { useNavigate } from "react-router-dom"
  import { sendEmailVerification } from "firebase/auth"

  export const CreateUser = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [number, setNumber] = useState("")

    const {enqueueSnackbar} = useSnackbar()
    const navigate = useNavigate();

    const handleCreateUser = async () => {
      try {
        const auth = getAuth(app)
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        await sendEmailVerification(userCredential.user);
        const createdUser = userCredential.user

        const db = getDatabase(app)
        await set(ref(db, "users/" + createdUser.uid), {
          username,
          email,
          number,
          role: "user",
          phoneVerified: false
        })
          
        setEmail("")
        setPassword("")
        setUsername("")
        setNumber("")
        navigate('/verify')
        
      } catch (err) {
        enqueueSnackbar(`${err.message}`,
          {
            variant:"error"
          }
        )
      }
    }

    return (
  <div className={styles.loginDiv}>
  <div className="flex justify-center items-center min-h-screen px-4">
    <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 border border-[#e76a12]/40">
      
      <h2 className="text-2xl font-bold text-center text-[#e76a12] mb-6">
        Create Account
      </h2>

      <div className="flex flex-col gap-4">
        
        <Input
          className="border-[2px] text-black p-3 rounded border-[#e76a12] text-lg"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />

        <Input
          className="border-[2px] text-black p-3 rounded border-[#e76a12] text-lg"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <Input
          className="border-[2px] text-black p-3 rounded border-[#e76a12] text-lg"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <Input
          className="border-[2px] text-black p-3 rounded border-[#e76a12] text-lg"
          type="tel"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Phone Number"
        />

        <Input
          className="border-[2px] text-black p-3 rounded border-gray-300 text-lg bg-gray-100"
          value="User"
          disabled
        />

        <button
          className="mt-4 bg-[#e76a12] hover:bg-[#c8590f] p-3 text-lg font-bold text-white rounded-xl w-full transition"
          onClick={handleCreateUser}
        >
          Create Account
        </button>

        <Link
          to="/login"
          className="text-center bg-gray-200 hover:bg-gray-300 p-3 text-lg font-bold text-black rounded-xl w-full transition"
        >
          Return to Login
        </Link>
      </div>

    </div>
  </div>
  </div>
);

  }
