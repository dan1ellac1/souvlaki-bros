import React, { useState } from "react";
import styles from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import Input from "antd/es/input/Input";
import { UserOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import app from "../firebaseConfig";


export const Login = ({ setGuest, guest }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();



  // Email/Password login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // redirect to home
      setGuest(false);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  // Google login

  const db = getDatabase(app)
  const handleGoogleLogin = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          role: "user", // default role
          createdAt: new Date(),
        });
      }

      navigate("/"); // redirect to home
      setGuest(false);
    } catch (err) {
      alert("Google login error: " + err.message);
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

            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center bg-white text-black p-4 font-bold rounded border border-[#dcdcdc] hover:bg-[#f0f0f0]"
            >
              <GoogleOutlined style={{ fontSize: "20px", marginRight: "10px" }} />
              Sign in with Google
            </button>

            <Link
              onClick={() => setGuest(true)}
              className="mt-4 bg-[#e76a12] p-4 font-bold text-white rounded border-[#dcdcdc] flex justify-center"
              to="/"
            >
              Continue as Guest
            </Link>
          </form>
        </div>
        <div></div>
      </div>
    </div>
  );
};
