import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Header } from "../components/Header";

export const OrderSent = ({ setGuest, guest, user, phoneVerified, businessNumber = "+355692314919" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state;

  const {
    selectedProduct = {},
    counts = {},
    totalPrice = 0,
    deliveryAddress = "",
    deliveryFee = 0,
    orderComment = "",
  } = locationState || {};

  const orderProducts = Object.entries(selectedProduct);

  if (!orderProducts.length) {
    return (
      <>
        <Header setGuest={setGuest} guest={guest} user={user} phoneVerified={phoneVerified} />
        <div className="p-10 text-center">
          <p className="text-2xl font-semibold mb-4">No order found.</p>
          <Link
            to="/products"
            className="bg-orange-500 hover:bg-black text-white px-5 py-2 rounded-md"
          >
            Choose From the Menu Now!
          </Link>
        </div>
      </>
    );
  }

  const formatWhatsAppMessage = () => {
    let message = "🛒 *New Order*%0A%0AProducts:%0A";
    orderProducts.forEach(([id, product]) => {
      const count = counts[id] || 1;
      message += `- ${product.productName} x${count}%0A`;
    });

    if (orderComment) message += `%0ASpecial Instructions:%0A${orderComment}%0A`;
    if (deliveryAddress) message += `%0ADelivery Address:%0A${deliveryAddress}%0A`;
    if (deliveryFee) message += `%0ADelivery Fee: ${deliveryFee} leke%0A`;

    message += `%0ATotal: ${(totalPrice + deliveryFee).toFixed(2)} leke`;
    return message;
  };

  const whatsAppLink = `https://wa.me/${businessNumber}?text=${formatWhatsAppMessage()}`;

  return (
    <>
      <Header setGuest={setGuest} guest={guest} user={user} phoneVerified={phoneVerified} />

      <div className="p-10 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Order Confirmation</h1>

        {/* Product List */}
        <ul className="mb-6">
          {orderProducts.map(([id, product]) => {
            const count = counts[id] || 1;
            return (
              <li
                key={id}
                className="border-b border-gray-200 py-4 flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-semibold">{product.productName}</p>
                  {product.productDescription && (
                    <p className="text-gray-600 text-sm">{product.productDescription}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-semibold">x{count}</p>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Delivery Info */}
        <div className="mb-6">
          {orderComment && (
            <p className="mb-2">
              <span className="font-semibold">Special Instructions:</span> {orderComment}
            </p>
          )}
          <p className="mb-1">
            <span className="font-semibold">Delivery Address:</span> {deliveryAddress}
          </p>
          <p>
            <span className="font-semibold">Delivery Fee:</span> {deliveryFee} leke
          </p>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mb-6 border-t border-gray-300 pt-4">
          <p className="text-xl font-semibold">Total:</p>
          <p className="text-2xl font-bold text-green-700">
            {(totalPrice + deliveryFee).toFixed(0)} leke
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a
            href={whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold text-center"
          >
            Send via WhatsApp
          </a>

          <button
            onClick={() =>
              navigate("/products", {
                state: { selectedProduct, counts, totalPrice, deliveryAddress, deliveryFee, orderComment }
              })
            }
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            ← Return to Menu
          </button>
        </div>
      </div>
    </>
  );
};
