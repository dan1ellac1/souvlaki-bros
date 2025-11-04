import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Header } from "../components/Header";

export const OrderSent = ({ setGuest, guest, user, phoneNumber, phoneVerified, businessNumber = "+355692314919" }) => {
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
    let message = "*New Order*%0A%0AProducts:%0A";
    orderProducts.forEach(([id, product]) => {
      const count = counts[id] || 1;
      message += `- ${product.productName} x${count}%0A`;
    });

    if (orderComment) message += `%0ASpecial Instructions:%0A${orderComment}%0A`;
    if (deliveryAddress) message += `%0ADelivery Address:%0A${deliveryAddress}%0A`;
    if (deliveryFee) message += `%0ADelivery Fee: ${deliveryFee} leke%0A`;

    // ✅ Add user phone here
    const displayPhone = phoneNumber || "Not Provided";
    message += `%0ACustomer Phone: ${displayPhone}%0A`;

    message += `%0ATotal: ${(totalPrice + deliveryFee).toFixed(2)} leke`;
    return message;
  };

  const whatsAppLink = `https://wa.me/${businessNumber}?text=${formatWhatsAppMessage()}`;

  return (
    <>
      <Header setGuest={setGuest} guest={guest} user={user} phoneVerified={phoneVerified} />

      <div className="p-4 sm:p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
  <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
    Order Confirmation
  </h1>

  {/* Product List */}
  <ul className="mb-6 divide-y">
    {orderProducts.map(([id, product]) => {
      const count = counts[id] || 1;
      return (
        <li
          key={id}
          className="py-3 flex justify-between items-start gap-4"
        >
          <div className="flex-1">
            <p className="text-lg font-semibold break-words">
              {product.productName}
            </p>
            {product.productDescription && (
              <p className="text-gray-600 text-sm break-words">
                {product.productDescription}
              </p>
            )}
          </div>

          <p className="font-semibold whitespace-nowrap">
            x{count}
          </p>
        </li>
      );
    })}
  </ul>

  {/* Delivery + Phone Info */}
  <div className="mb-6 space-y-1 text-sm sm:text-base">
    {orderComment && (
      <p>
        <span className="font-semibold">Special Instructions:</span> {orderComment}
      </p>
    )}
    <p>
      <span className="font-semibold">Delivery Address:</span> {deliveryAddress}
    </p>
    <p>
      <span className="font-semibold">Delivery Fee:</span> {deliveryFee} leke
    </p>
    <p>
      <span className="font-semibold">Your Phone:</span> {phoneNumber || "Not Provided"}
    </p>
  </div>

  {/* Total */}
  <div className="flex justify-between items-center mb-6 border-t border-gray-300 pt-4">
    <p className="text-lg sm:text-xl font-semibold">Total:</p>
    <p className="text-xl sm:text-2xl font-bold text-green-700">
      {(totalPrice + deliveryFee).toFixed(0)} leke
    </p>
  </div>

  {/* ✅ Buttons Responsive */}
  <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center">
    <a
      href={whatsAppLink}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-semibold text-center w-full sm:w-auto"
    >
      Send via WhatsApp
    </a>

    <button
      onClick={() =>
        navigate("/products", {
          state: { selectedProduct, counts, totalPrice, deliveryAddress, deliveryFee, orderComment }
        })
      }
      className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-3 rounded-lg font-semibold w-full sm:w-auto"
    >
      ← Return to Menu
    </button>
  </div>
</div>
    </>
  );
};
