import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database";
import app from "../../firebaseConfig";
import { enqueueSnackbar } from "notistack";

export const PhoneVerification = () => {
  const auth = getAuth(app);
  const db = getDatabase(app);
  const location = useLocation();
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState(location.state?.phoneNumber || "");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  // ✅ Step 1: Setup Recaptcha
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible", // or 'normal' if you want to show it
        callback: (response) => {
          console.log("reCAPTCHA solved");
        },
      });
    }
  };

  // ✅ Step 2: Send OTP
  const sendOtp = async () => {
    try {
      setupRecaptcha();

      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);

      enqueueSnackbar(`Verification code sent to ${phoneNumber}`, { variant: "success" });
    } catch (err) {
      enqueueSnackbar("Error sending OTP: " + err.message, { variant: "error" });
      console.error(err);
    }
  };

  // ✅ Step 3: Verify OTP
  const verifyOtp = async (e) => {
    e.preventDefault();
    if (!confirmationResult) {
      enqueueSnackbar("Please request the OTP first.", { variant: "warning" });
      return;
    }

    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      // ✅ Update the database to mark phone as verified
      await update(ref(db, `users/${user.uid}`), {
        phoneVerified: true,
      });

      enqueueSnackbar("Phone number verified successfully!", { variant: "success" });
      navigate("/order"); // example next step
    } catch (err) {
      enqueueSnackbar("Invalid code. Try again.", { variant: "error" });
      console.error(err);
    }
  };

  useEffect(() => {
    if (phoneNumber) sendOtp(); // automatically send OTP when page loads
  }, [phoneNumber]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#f5f5f5]">
      <div className="bg-white p-10 rounded-lg shadow-md text-center w-[400px]">
        <h2 className="text-xl font-bold mb-4">Verify Your Phone Number</h2>
        <p className="mb-4 text-gray-600">Code sent to: <span className="text-[#e76a12]">{phoneNumber}</span></p>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit code"
          className="border rounded p-2 w-full mb-3 text-center"
        />
        <button
          onClick={verifyOtp}
          className="w-full bg-[#e76a12] text-white font-bold py-2 rounded mb-3"
        >
          Verify
        </button>

        <button
          onClick={sendOtp}
          className="w-full border-2 border-[#e76a12] text-[#e76a12] font-bold py-2 rounded"
        >
          Resend Code
        </button>

        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};
