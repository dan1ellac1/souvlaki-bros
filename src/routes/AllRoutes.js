import React from 'react'
import {Routes, Route} from 'react-router-dom'
import { Home, ProductInfo, ProductList, AboutUs, Contact, OrderNow } from '../pages'
import { Write } from '../components/Write';
import { Read } from '../components/Read';

export const AllRoutes = ({adminCheck, setAdminCheck}) => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/products/id:' element={<ProductInfo />} />
        <Route path='/products' element={<ProductList adminCheck={adminCheck} setAdminCheck={setAdminCheck} />} />
        <Route path='/order-now' element={<OrderNow />} />
        <Route path='/write' element={<Write />}/>
        <Route path='/read' element={<Read />}/>
    </Routes>
  )
}
