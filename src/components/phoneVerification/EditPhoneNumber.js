import { getDatabase, ref } from 'firebase/database';
import app from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useSnackbar } from 'notistack';
import { update } from 'firebase/database';
import { Input } from 'antd';

export const EditPhoneNumber = ({phoneNumber, setPhoneNumber}) => {

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
    <>
    <div>
      
    </div>

    <div className="flex flex-col items-center justify-center h-screen bg-[#f5f5f5]">
      <div className="bg-white p-10 rounded-lg shadow-md text-center w-[400px]">
        <h1 className='text-2xl'>Change Phone Number</h1>
        <h2 className="text-md text-gray-600">NOTE! Placing your correct phone number will allow you to order from this
          website!
        </h2>
        <h2 className="text-md mb-4 text-gray-600">Dont forget prefixes!
        </h2>
        <form onSubmit={changeNumber}>
        <Input className='mb-5' type="number" placeholder={phoneNumber} value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
        <button type='submit' className="w-full bg-[#e76a12] text-white font-bold py-2 rounded mb-3">Change phone number</button>
      </form>

        </div>
    </div>
    </>
  )
}
