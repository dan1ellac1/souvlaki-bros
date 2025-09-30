import React, { useState } from "react"
import styles from "./login.module.css"
import { Link, useNavigate } from "react-router-dom"
import Input from "antd/es/input/Input"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import app from "../firebaseConfig"

export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [guest, setGuest] = useState(false)
 // ...
const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const auth = getAuth(app);
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/"); // redirect to home
  } catch (err) {
    alert("Error: " + err.message);
  }
};
  

  

  return (
    <div className={styles.loginDiv}>
      <div className={styles.loginManeuvers}>
        <div></div>
        <div className={styles.loginSquare}>
          <form className="flex flex-col m-4" onSubmit={handleLogin}>
            <Input
              className="border-[2px] mt-2 text-black p-4 mr-2 rounded border-[#e76a12] text-xl"
              type="text"
              prefix={<UserOutlined style={{ fontSize: "20px", color: "#e76a12" }} />}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <Input
              className="border-[2px] text-black p-4 mr-2 rounded border-[#e76a12] text-xl"
              type="password"
              prefix={<LockOutlined style={{ fontSize: "20px", color: "#e76a12" }} />}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex justify-between">
              <Link to="/create-user" className="underline">
                Create Account
              </Link>
              <Link className="italic">Forgot password?</Link>
            </div>

            <button
              type="submit"
              className="mt-10 bg-[#e76a12] p-4 font-bold text-white rounded border-[#dcdcdc]"
            >
              Log In
            </button>

            <h1 className="p-5 font-bold">or</h1>
            
            <Link
              onClick={() => setGuest(true)}
              className=" bg-[#e76a12] p-4 font-bold text-white rounded border-[#dcdcdc]"
              to="/"
            >
              Continue as Guest
            </Link>
          </form>
        </div>
        <div></div>
      </div>
    </div>
  )
}
