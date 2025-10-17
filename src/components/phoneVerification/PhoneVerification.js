  import React, { useState } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, linkWithCredential } from "firebase/auth";
  import { getDatabase, ref, update } from "firebase/database";
  import app from "../../firebaseConfig";
  import { useSnackbar } from "notistack";

  export const PhoneVerification = ({setPhoneVerified}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const auth = getAuth(app);
    const phoneNumber = location.state?.phoneNumber;
    const formattedNumber = phoneNumber.startsWith("+") ? phoneNumber : `+${phoneNumber}`;

    const [otp, setOtp] = useState("");
    const [verificationId, setVerificationId] = useState(null);
    const [loading, setLoading] = useState(false);

    const sendOtp = async () => {
      if (!formattedNumber) {
        enqueueSnackbar("Phone number is missing!", { variant: "warning" });
        return;
      }

      try {
        setLoading(true);

        // Initialize reCAPTCHA (only once)
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
            size: "invisible",
            callback: () => console.log("Recaptcha verified"),
          });
        }

        const confirmation = await signInWithPhoneNumber(auth, formattedNumber, window.recaptchaVerifier);
        setVerificationId(confirmation.verificationId);
        enqueueSnackbar("OTP sent successfully!", { variant: "success" });
      } catch (err) {
        enqueueSnackbar("Error sending OTP: " + err.message, { variant: "error" });
      } finally {
        setLoading(false);
      }
    };

    const verifyOtp = async () => {
      if (!otp || !verificationId) {
        enqueueSnackbar("Please enter the OTP code.", { variant: "warning" });
        return;
      }

      try {
        const credential = PhoneAuthProvider.credential(verificationId, otp);
        const user = auth.currentUser;

        if (!user) {
          enqueueSnackbar("User not logged in.", { variant: "error" });
          return;
        }

        // ✅ Link phone number to existing user
        await linkWithCredential(user, credential);

        // ✅ Update Realtime Database
        const db = getDatabase(app);
        await update(ref(db, "users/" + user.uid), { phoneVerified: true });
        

        enqueueSnackbar("Phone verified successfully!", { variant: "success" });
        setPhoneVerified(true)
        navigate("/order"); // redirect to order page
      } catch (err) {
        enqueueSnackbar("Error verifying OTP: " + err.message, { variant: "error" });
      }
    };

    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#f5f5f5]">
        <div className="bg-white p-10 rounded-lg shadow-md text-center w-[450px]">
          <h2 className="text-2xl font-bold mb-2">Verify your Phone Number</h2>
          <p className="text-gray-600 mb-4">We’ve sent an OTP to: <span className="font-bold">{formattedNumber}</span></p>

          <div id="recaptcha-container"></div>

          {!verificationId ? (
            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full bg-[#e76a12] text-white font-bold py-2 rounded mb-3"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border border-gray-400 rounded p-2 w-full mb-3 text-center"
              />
              <button
                onClick={verifyOtp}
                className="w-full bg-[#e76a12] text-white font-bold py-2 rounded"
              >
                Verify
              </button>
            </>
          )}
        </div>
      </div>
    );
  };
