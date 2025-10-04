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
        })
        enqueueSnackbar("User created successfully!",{
          variant:"success"
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
      <div  className={styles.loginDiv}>
        <div className={styles.loginManeuvers}>
        <div></div>
        <div  className={styles.loginSquare}>
          <div className="flex flex-col m-4">
        <Input  className="border-[2px] mt-2 text-black p-4 mr-2 rounded border-[#e76a12] text-xl"
        type="text"   value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <br />

        <Input className="border-[2px] mt-2 text-black p-4 mr-2 rounded border-[#e76a12] text-xl" 
        type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <br />
        <Input
        className="border-[2px] mt-2 text-black p-4 mr-2 rounded border-[#e76a12] text-xl"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)
            
          }
          placeholder="Password"
        />

        <Input
        className="border-[2px] mt-2 text-black p-4 mr-2 rounded border-[#e76a12] text-xl"
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)
            
          }
          placeholder="Phone Number"
        />

        <br />
        <Input  className="border-[2px] mt-2 text-black p-4 mr-2 rounded border-[#e76a12] text-xl" value="User" disabled />

        <button className="mt-10 bg-[#e76a12] p-4 font-bold text-white rounded border-[#dcdcdc]"
        onClick={handleCreateUser}>Create Account</button>

        <Link
                      className=" mt-2 bg-[#e76a12] p-4 font-bold text-white rounded border-[#dcdcdc]"
                      to="/login"
                    >
                      Return to Login
          </Link>
        </div>
        </div>
        
        <div></div>
        </div>
      </div>
      
    )
  }
