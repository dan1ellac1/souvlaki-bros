import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import React, { useState } from 'react'
import { FullMenu } from '../Menu/FullMenu'
import { CreateProduct } from '../handlers/CreateProduct'

export const ProductList = () => {

  const [isAdmin, setIsAdmin] = useState(true)
  const [products, setProducts] = useState([])

  const handleAdmin = () =>{
    setIsAdmin(!isAdmin)
  }

  return (
    <>
    <Header />
    <main>
      {isAdmin ? (
        <button type='button' onClick={handleAdmin}>toggle</button>
      )
    :
    ""}

    {isAdmin ? (
      <CreateProduct products={products} setProducts={setProducts}/>
    ) :
    ""}
    <FullMenu products={products}/>

    </main>
    <Footer />
    </>
  )
}
