import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebaseConfig";
import {Routes, Route} from 'react-router-dom'
import { Home, ProductList, AboutUs, OrderNow } from '../pages'
import { Login } from '../components/Login';
import { CreateUser } from '../components/CreateUser';
import { CreateProduct } from "../handlers/CreateProduct";
import { Navigate } from "react-router-dom";
import { Redirect } from "../pages/Redirect";


export const AllRoutes = ({adminCheck, setAdminCheck}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [guest, setGuest] = useState(false)

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login setGuest={setGuest} guest={guest} />}
        />
        <Route
          path="/"
          element={(user||guest) ? <Home user={user} setGuest={setGuest} guest={guest}/> : <Navigate to="/login" />}
        />
        <Route
          path="/create-product"
          element={user ? <CreateProduct /> : <Navigate to="/login" />}
        />
        <Route path='/about-us' element={<AboutUs guest={guest} setGuest={setGuest}/> } />
        <Route path='/products' element={(user||guest) ?<ProductList adminCheck={adminCheck} setAdminCheck={setAdminCheck} setGuest={setGuest} guest={guest}/> : <Navigate to ="/login"/>} />
        <Route path='/order' element={user ? <OrderNow guest={guest} setGuest={setGuest}/> : <Navigate to ="/redirect" />} />
        <Route path='/create-user' element={<CreateUser />}/>
        <Route path='/redirect' element={<Redirect setGuest={setGuest}/>}/>
    </Routes>
  )
}
