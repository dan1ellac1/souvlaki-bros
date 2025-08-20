import {React} from 'react'
import PlaceHolder from "../components/placeholder.png"

export const FullMenu = ({products}) => {
  

  return (
    <div className="m-7 bg-[#e8a033] border rounded-lg">
      <ul className="m-6 grid  grid-cols-4 gap-1 ">
        {products.map((product, index) => (
          <li className=" row-span-4" key={index}>
            <p className='text-2xl font-bold'>{product.productName}</p>
            <p className='pr-4'>{product.productDescription}</p> 
            <img src={PlaceHolder} className=' rounded-xl p-2' alt="" />
          </li>
        ))}
      </ul>
      </div>
  )
}
