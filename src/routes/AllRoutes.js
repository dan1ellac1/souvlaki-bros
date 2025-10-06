import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebaseConfig";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home, ProductList, AboutUs, OrderNow } from "../pages";
import { Login } from "../components/Login";
import { CreateUser } from "../components/CreateUser";
import { CreateProduct } from "../handlers/CreateProduct";
import { Redirect } from "../pages/Redirect";
import { Verification } from "../components/emailVerification/Verification";
import {NumberConfirmation} from "../components/phoneVerification/NumberConfirmation"
import {EditPhoneNumber} from "../components/phoneVerification/EditPhoneNumber"
import { getDatabase,ref, get } from "firebase/database";



export const AllRoutes = ({ adminCheck, setAdminCheck }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [guest, setGuest] = useState(false);
  const [verified, setVerified] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("")

  //phone Verification

  const [phoneVerified, setPhoneVerified] = useState(false)

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      setVerified(currentUser?.emailVerified || false);
    });
    return () => unsubscribe();
  }, []);



  useEffect(() => {
    const fetchNumber = async () => {
      const auth = getAuth(app);
      const user = auth.currentUser;
      if (!user) return;
      const db = getDatabase(app);
      const userRef = ref(db, "users/" + user.uid);
      const snap = await get(userRef);
      if (snap.exists()) {
        setPhoneNumber(snap.val().number); // pre-fill the input
      }
    };
    fetchNumber();
  }, []);
  

  if (loading) return <p>Loading...</p>;

  return (
    <Routes>
      <Route
        path="/login"
        element={user && verified ? <Navigate to="/" /> : <Login setGuest={setGuest} guest={guest} setVerified={setVerified} />}
      />
      <Route
        path="/"
        element={verified||guest ? <Home user={user} setGuest={setGuest} guest={guest} /> : <Navigate to="/verify" />}
      />
      <Route
        path="/create-product"
        element={user && verified ? <CreateProduct /> : <Navigate to="/verify" />}
      />
      <Route
        path="/about-us"
        element={<AboutUs user={user} guest={guest} setGuest={setGuest} />}
      />
      <Route
        path="/products"
        element={(verified || guest) ? <ProductList user={user} adminCheck={adminCheck} setAdminCheck={setAdminCheck} setGuest={setGuest} guest={guest} /> : <Navigate to="/login" />}
      />
      <Route path="/order" element={verified ? phoneVerified 
      ? <OrderNow user={user} guest={guest} setGuest={setGuest} phoneVerified={phoneVerified} />
        : <Navigate to="/numberConfirmation" />
      : <Navigate to="/verify" />} />
      <Route path="/create-user" element={<CreateUser />} />
      <Route path="/redirect" element={<Redirect setGuest={setGuest} />} />
      <Route path="/verify" element={<Verification setVerified={setVerified} />} />
      <Route path="/numberConfirmation" element={(verified && (!phoneVerified) )? <NumberConfirmation phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} setPhoneVerified={setPhoneVerified} phoneVerified={phoneVerified} /> : <Navigate to="/" />}/>
      <Route path="/editPhoneNumber" element={ (verified && !guest) ? <EditPhoneNumber phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} user={user} /> : <Navigate to="/" />} />
    </Routes>
  );
};
