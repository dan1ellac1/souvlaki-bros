import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebaseConfig";
import {Routes, Route} from 'react-router-dom'
import { Home, ProductInfo, ProductList, AboutUs, Contact, OrderNow } from '../pages'
import { Read } from '../components/Read';
import { Login } from '../components/Login';
import { CreateUser } from '../components/CreateUser';
import { CreateProduct } from "../handlers/CreateProduct";
import { Navigate } from "react-router-dom";


export const AllRoutes = ({adminCheck, setAdminCheck}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
          element={user ? <Home user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-product"
          element={user ? <CreateProduct /> : <Navigate to="/login" />}
        />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/products/id:' element={<ProductInfo />} />
        <Route path='/products' element={<ProductList adminCheck={adminCheck} setAdminCheck={setAdminCheck} />} />
        <Route path='/order-now' element={<OrderNow />} />
        <Route path='/create-user' element={<CreateUser />}/>

        <Route path='/read' element={<Read />}/>
    </Routes>
  )
}
