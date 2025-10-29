import React, { useState } from 'react';
import { Header } from '../components/Header';
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

export const OrderNow = ({ setGuest, guest, user, phoneVerified }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { orderProducts = [], counts = {}, totalPrice = 0, selectedProduct = {}, orderComment: initialComment = "" } = location.state || {};

  const [orderComment, setOrderComment] = useState(initialComment);
  const [address, setAddress] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(0);

  const deliveryFees = {
    "Astir": 50,
    "Yzberisht": 100,
    "Laprak": 100,
    "Terminali": 100,
    "Pallatet e Verdha": 100,
    "Delijorgj": 100,
    "Top Channel": 100,
    "Amerikan 3": 100,
    "21 Dhjetori": 150,
    "Selite": 150,
    "Don Bosko": 150,
    "Pas Top Channel": 150,
    "Tresh": 150,
    "Dytesore Pas Casa Italia": 150,
    "Komune Parisi": 150,
    "Stacioni i Trenit": 150,
    "Rruge Kavaje": 150,
    "Vasil Shanto": 150,
    "Kombinat": 150,
    "Qender": 200
  };

  if (!orderProducts.length) {
    return (
      <>
        <Header setGuest={setGuest} guest={guest} user={user} phoneVerified={phoneVerified}/>
        <div className="p-10 text-center">
          <p className="text-2xl font-semibold mb-4">Your cart is empty.</p>
          <Link to="/products" className='bg-orange-500 hover:bg-black text-white px-5 py-2 rounded-md'>
            Choose From the Menu Now!
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Header setGuest={setGuest} guest={guest} user={user} phoneVerified={phoneVerified}/>
      <div className="p-10 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6">Your Order</h1>
        <h1>Note! You must have Whatsapp installed in order to </h1>

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
                  {count > 1 && <p className="text-sm text-gray-500">Quantity: {count}</p>}
                </div>
                <div className="text-right">
                  <p className="text-green-700 font-bold">{total.toFixed(2)} leke</p>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Special instructions */}
        <div className="mt-4">
          <label className="block mb-1 font-semibold">Special Instructions:</label>
          <textarea
            value={orderComment}
            onChange={(e) => setOrderComment(e.target.value)}
            placeholder="Add a note for your order (optional)..."
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Delivery location */}
        <div className="mt-4">
          <label className="block mb-1 font-semibold">Delivery Location:</label>
          <select
          required
            value={address}
            onChange={(e) => {
              const selected = e.target.value;
              setAddress(selected);
              setDeliveryFee(deliveryFees[selected] || 0);
            }}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Select your area...</option>
            {Object.keys(deliveryFees).map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Total price with delivery fee */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-300">
          <p className="text-xl font-semibold">Total:</p>
          <div className="text-right">
            <p className="text-green-700 font-bold">{(totalPrice + deliveryFee).toFixed(2)} leke</p>
            {deliveryFee > 0 && <p className="text-sm text-gray-500">Delivery Fee: {deliveryFee} leke</p>}
          </div>
        </div>

        {/* Return to Menu */}
        <button
          onClick={() => navigate("/products", {
            state: { selectedProduct, counts, totalPrice, orderComment, address, deliveryFee }
          })}
          className="bg-orange-600 hover:bg-gray-700 text-white px-5 py-2 rounded-md mt-4"
        >
          Return to Menu
        </button>
      </div>
    </>
  );
};
