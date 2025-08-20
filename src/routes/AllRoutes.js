import React from 'react'
import {Routes, Route} from 'react-router-dom'
import { Home, ProductInfo, ProductList, AboutUs, Contact, OrderNow } from '../pages'

export const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/products/id:' element={<ProductInfo />} />
        <Route path='/products' element={<ProductList />} />
        <Route path='/order-now' element={<OrderNow />} />
    </Routes>
  )
}
