import React from 'react'
import { Header } from '../components/Header'
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

export const OrderNow = ({setGuest, guest, user, phoneVerified}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { orderProducts = [], counts = {}, totalPrice = 0 } = location.state || {};

  if (!orderProducts.length) {
    return (
      <>
      <Header setGuest={setGuest} guest={guest} user={user} phoneVerified={phoneVerified}/>
      <div className="p-10 text-center">
        <p className="text-2xl font-semibold mb-4">Your cart is empty.</p>
          <Link to="/products" className='bg-orange-500 hover:bg-black text-white px-5 py-2 rounded-md'>Choose From the Menu Now!</Link>
      </div>
      </>
    );
  }

  
  return (
    <>
     <Header setGuest={setGuest} guest={guest} user={user} phoneVerified={phoneVerified}/>
     <div className="p-10 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Your Order</h1>

      <ul>
        {orderProducts.map(([id, product]) => {
          const count = counts[id] || 1;
          const total = (product.productPrice ?? 0) * count;

          return (
            <li
              key={id}
              className="border-b border-gray-200 py-4 flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold">{product.productName}</p>
                <p className="text-gray-600">{product.productDescription}</p>
              </div>
              <div className="text-right">
                <p className="text-green-700 font-bold">{total.toFixed(2)} leke</p>
                {count > 1 && (
                  <p className="text-sm text-gray-500">
                    ({count} × {product.productPrice?.toFixed(2)} leke)
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-300">
        <p className="text-xl font-semibold">Total:</p>
        <p className="text-2xl font-bold text-green-700">
          {totalPrice.toFixed(2)} leke
        </p>
      </div>
    </div>
    </>
  )
}
