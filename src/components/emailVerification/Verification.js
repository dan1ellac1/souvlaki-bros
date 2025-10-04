import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Verification = ({ setVerified }) => {
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  // ✅ Make sure user is loaded before doing anything
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/login"); // No user logged in → go back
      } else {
        setUser(currentUser);
      }
    });
    return unsubscribe;
  }, [auth, navigate]);

  // ✅ Check if email is verified
  const handleCheckVerification = async () => {
    if (!user) return;
    try {
      setChecking(true);
      setError(null);
      await user.reload(); // refresh user data
      if (user.emailVerified) {
        setVerified(true);
        navigate("/"); // ✅ allow them into the app
      } else {
        setError("Still not verified. Please check your inbox.");
      }
    } catch (err) {
      setError("Something went wrong. Try again later.");
    } finally {
      setChecking(false);
    }
  };

  // ✅ Resend the verification email the correct way
  const [canResend, setCanResend] = useState(true);

  const handleResendVerification = async () => {
    if (!canResend) return;
    try {
      await sendEmailVerification(user);
      alert("✅ Verification email sent again!");
      setCanResend(false);
      setTimeout(() => setCanResend(true), 60000); // enable again after 1 minute
    } catch (err) {
      alert("❌ Couldn't resend verification email: " + err.message);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#f5f5f5]">
      <div className="bg-white p-10 rounded-lg shadow-md text-center w-[400px]">
        <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
        <p className="mb-6 text-gray-600">
          We’ve sent a verification link to <strong>{user?.email}</strong>.  
          Please check your inbox and click the link before continuing.
        </p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          onClick={handleCheckVerification}
          disabled={checking}
          className="w-full bg-[#e76a12] text-white font-bold py-2 rounded mb-3"
        >
          {checking ? "Checking..." : "I Verified My Email"}
        </button>

        <button
  onClick={handleResendVerification}
  disabled={!canResend}
  className={`w-full border-2 py-2 rounded ${
    canResend ? "border-[#e76a12] text-[#e76a12]" : "opacity-50 cursor-not-allowed"
  }`}
>
  {canResend ? "Resend Verification Email" : "Please wait..."}
</button>
      </div>
    </div>
  );
};
