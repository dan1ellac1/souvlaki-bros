import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const OrderShowcase = ({ selectedProduct }) => {
  const [counts, setCounts] = useState({});
  const [orderProducts, setOrderProducts] = useState([]);
  const navigate = useNavigate();

  // Keep order products synced with parent
  useEffect(() => {
    const entries = Object.entries(selectedProduct);
    if (entries.length > 0) {
      setOrderProducts(entries);
    } else {
      setOrderProducts([]);
    }
  }, [selectedProduct]);

  // Calculate totals
  const totalItems = orderProducts.reduce((acc, [id]) => {
    return acc + (counts[id] || 1);
  }, 0);

  const totalPrice = orderProducts.reduce((acc, [id, product]) => {
    const count = counts[id] || 1;
    return acc + (product.productPrice ?? 0) * count;
  }, 0);

  // Navigate to /order
  const goToOrder = () => {
    navigate("/order", {
      state: {
        orderProducts,
        counts,
        totalPrice,
      },
    });
  };

  if (orderProducts.length === 0) return null;

  return (
    <div
      className="w-3/5 fixed bottom-0 left-0 right-0 mx-auto
      bg-white shadow-lg rounded-t-lg p-4 border-t border-gray-200 z-50
      flex justify-between items-center transition-all"
    >
      <div>
        <p className="text-xl font-semibold">
          🛒 {totalItems} item{totalItems !== 1 ? "s" : ""}
        </p>
        <p className="text-green-700 font-bold">
          Total: {totalPrice.toFixed(2)} leke
        </p>
      </div>

      <button
        onClick={goToOrder}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
      >
        Go to Order
      </button>
    </div>
  );
};
