import { useNavigate } from 'react-router-dom'
import { getDatabase, update, ref } from 'firebase/database';
import app from '../../firebaseConfig';
import { getAuth } from 'firebase/auth';
import { useSnackbar } from 'notistack';
import Input from 'antd/es/input/Input';

export const NumberConfirmation= ({phoneNumber, setPhoneNumber}) => {
  
  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar()

  const changeNumber = async (e) => {
    e.preventDefault();
  
if (!phoneNumber || phoneNumber.trim() === "") {
    enqueueSnackbar("Please enter a valid phone number.", { variant: "warning" });
    return;
  }

  const formattedNumber = phoneNumber.startsWith("+")
    ? phoneNumber
    : "+" + phoneNumber;


    try {
      const db = getDatabase(app);
      const uid = getAuth(app).currentUser.uid; // make sure user is logged in
  
      // ✅ Update only the number and reset phoneVerified to false
      await update(ref(db, "users/" + uid), {
        number: formattedNumber,
        phoneVerified: false,
      });
      
  
      enqueueSnackbar("Phone number updated. Please verify it again.", {
        variant: "success",
      });

      
  
      // Optional: update state in parent if you passed setPhoneNumber down
      // setPhoneNumber(phoneNumber);
  
      navigate("/phoneVerification", {state:{phoneNumber:formattedNumber}});
    } catch (err) {
      enqueueSnackbar("Error updating phone number: " + err.message, {
        variant: "error",
      });
    }
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#f5f5f5]">
      <div className="bg-white p-10 rounded-lg shadow-md text-center w-[450px]">
        <h2 className="text-lg font-bold ">Is this your Correct Number?
          <br/>{(phoneNumber==="") ? "" : `${phoneNumber}`}  <br/>
        <br/>
        </h2>
        <h3 className='font-bold text-gray-500 my-2'>NOTE! If this is not your phone number you will not be able to order from the website!</h3>
        <div>
        <form onSubmit={changeNumber}>
        <Input className='mb-5' type="number" placeholder={phoneNumber} value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
        <button type='submit' className="w-full bg-[#e76a12] text-lg text-white font-bold py-2 rounded mb-3">Confirm Phone Number</button>
      </form>
    </div>
      </div>
    </div>
  )
}
