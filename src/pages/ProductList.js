import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import React, { useState } from 'react'
import { FullMenu } from '../Menu/FullMenu'
import { CreateProduct } from '../handlers/CreateProduct'

export const ProductList = (adminCheck, setAdminCheck) => {

  const [products, setProducts] = useState([])

  const handleAdmin = () =>{
    setAdminCheck(!adminCheck)
  }

  return (
    <>
    <Header />
    <main>
      {adminCheck ? (
        <button type='button' onClick={handleAdmin}>toggle</button>
      )
    :
    ""}

    {adminCheck ? (
      <CreateProduct products={products} setProducts={setProducts}/>
    ) :
    ""}
    <FullMenu products={products}/>

    </main>
    <Footer />
    </>
  )
}
