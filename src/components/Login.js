import React, { useState } from "react";
import styles from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import Input from "antd/es/input/Input";
import { UserOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import app from "../firebaseConfig";
import { useSnackbar } from "notistack";

export const Login = ({ setGuest, setVerified }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        enqueueSnackbar("Please verify your email before logging in.", { variant: "warning" });
        await auth.signOut();
        navigate("/verify");
        setVerified(false);
        return;
      }

      setGuest(false);
      setVerified(true);
      enqueueSnackbar("Logged in successfully!", { variant: "success" });
      navigate("/");
    } catch (err) {
      enqueueSnackbar("Error: " + err.message, { variant: "error" });
    }
  };

  // Google login
  const db = getFirestore(app);
  const handleGoogleLogin = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          role: "user",
          createdAt: new Date(),
        });
      }

      setGuest(false);
      enqueueSnackbar("Logged in successfully", { variant: "success" });
      navigate("/");
    } catch (err) {
      enqueueSnackbar("Error: " + err.message, { variant: "error" });
    }
  };

  return (
    <div className={`${styles.loginDiv} flex justify-center items-center px-4`}>
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-xl border border-gray-200 mt-8 mb-8">
        <h1 className="text-center text-3xl font-bold mb-6 text-[#e76a12]">Login</h1>

        <form className="flex flex-col" onSubmit={handleLogin}>
          <Input
            className="border-[2px] mt-2 text-black p-4 rounded border-[#e76a12] text-lg"
            type="text"
            prefix={<UserOutlined style={{ fontSize: "20px", color: "#e76a12" }} />}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            className="border-[2px] mt-4 text-black p-4 rounded border-[#e76a12] text-lg"
            type="password"
            prefix={<LockOutlined style={{ fontSize: "20px", color: "#e76a12" }} />}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex justify-between mt-2 text-sm">
            <Link to="/create-user" className="underline">Create Account</Link>
            <Link className="italic underline">Forgot password?</Link>
          </div>

          <button
            type="submit"
            className="mt-6 bg-[#e76a12] p-4 font-bold text-white rounded hover:bg-[#cf5f11] transition"
          >
            Log In
          </button>

          <p className="text-center py-3 font-semibold">or</p>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center bg-white text-black p-4 font-bold rounded border border-gray-300 hover:bg-gray-100 transition"
          >
            <GoogleOutlined style={{ fontSize: "20px", marginRight: "10px" }} />
            Sign in with Google
          </button>

          <Link
            onClick={() => setGuest(true)}
            className="mt-4 bg-[#e76a12] p-4 font-bold text-white rounded hover:bg-[#cf5f11] transition text-center"
            to="/"
          >
            Continue as Guest
          </Link>
        </form>
      </div>
    </div>
  );
};
