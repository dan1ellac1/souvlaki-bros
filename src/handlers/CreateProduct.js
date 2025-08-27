import React, { useState } from 'react'

export const CreateProduct = ({products, setProducts}) => {

  const [productName, setProductName] = useState('')
  
  const [productDescription, setProductDescription] = useState('')

  const createProduct = (e) => {
    e.preventDefault();
    const newProduct = {productName, productDescription};
      

    setProducts([...products, newProduct]) 
    setProductName("")
    setProductDescription("")
    console.log(products)
  }
  return (
    <div className='m-8'>
        <h1 className='font-bold text-2xl mb-3'>Create a product:</h1>
        <form className='' onSubmit={createProduct}>
          <div className='flex flex-col w-[20%]'>
            <label>Product Name:</label>
            <input className='mb-2 border rounded-md border-black pl-1' type="text" onChange={(e) => setProductName(e.target.value)} value={productName} placeholder='Place name' name='name'/>
            <label>Product Description:</label>
            <input className='mb-2 border rounded-md border-black pl-1' type="text" onChange={(e) => setProductDescription(e.target.value)} value={productDescription} placeholder='Place Description' name='description'/>
            <button type='submit' className='mt-4 border border-black rounded-lg text-[#e8a033] font-bold bg-black hover:bg-[#e8a033]
            hover:text-black pt-1 pb-1'>Create product</button>
          </div>
        </form>
    </div>
  )
}
