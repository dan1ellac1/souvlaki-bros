import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebaseConfig";
import {Routes, Route} from 'react-router-dom'
import { Home, ProductList, AboutUs, OrderNow } from '../pages'
import { Login } from '../components/Login';
import { CreateUser } from '../components/CreateUser';
import { CreateProduct } from "../handlers/CreateProduct";
import { Navigate } from "react-router-dom";


export const AllRoutes = ({adminCheck, setAdminCheck, guest}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(guest)

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
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/"
          element={guest ? (<Navigate to="/" />) : (user ? <Home user={user} /> : <Navigate to="/login" />)}
        />
        <Route
          path="/create-product"
          element={user ? <CreateProduct /> : <Navigate to="/login" />}
        />
        <Route path='/about-us' element={<AboutUs /> } />
        <Route path='/products' element={user ?<ProductList adminCheck={adminCheck} setAdminCheck={setAdminCheck} /> : <Navigate to ="/login"/>} />
        <Route path='/order-now' element={user ? <OrderNow /> : <Navigate to ="/login"/>} />
        <Route path='/create-user' element={<CreateUser />}/>
    </Routes>
  )
}
