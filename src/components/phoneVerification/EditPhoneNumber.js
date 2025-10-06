import { getDatabase, ref } from 'firebase/database';
import React, { useState } from 'react'
import app from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useSnackbar } from 'notistack';
import { update } from 'firebase/database';

export const EditPhoneNumber = () => {

  const [phoneNumber, setPhoneNumber] = useState("")
  const {enqueueSnackbar} = useSnackbar()

  const navigate = useNavigate()

  const changeNumber = async (e) => {
    e.preventDefault();
  
    try {
      const db = getDatabase(app);
      const uid = getAuth(app).currentUser.uid; // make sure user is logged in
  
      // ✅ Update only the number and reset phoneVerified to false
      await update(ref(db, "users/" + uid), {
        number: phoneNumber,
        phoneVerified: false,
      });
  
      enqueueSnackbar("Phone number updated. Please verify it again.", {
        variant: "success",
      });
  
      // Optional: update state in parent if you passed setPhoneNumber down
      // setPhoneNumber(phoneNumber);
  
      navigate("/numberConfirmation");
    } catch (err) {
      enqueueSnackbar("Error updating phone number: " + err.message, {
        variant: "error",
      });
    }
  };
  
  return (
    <div>
      <form onSubmit={changeNumber}>
        <input type="number" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
        <button type='submit'>Change Number</button>
      </form>
    </div>
  )
}
