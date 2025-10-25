import React from 'react';

export const OrderShowcase = ({ selectedProduct }) => {
  const productsArray = Object.entries(selectedProduct); // convert object to array

  return (
    <div className="
      fixed bottom-0 left-0 right-0 w-full md:w-96 mx-auto
      bg-white shadow-lg rounded-t-lg p-4 border-t border-gray-200 z-50
      flex flex-col transition-all
    ">
      <p className="text-2xl font-bold mb-2 text-left">Your order:</p>
      <ul>
        {productsArray.length === 0 && <p>No products selected.</p>}
        {productsArray.map(([id, product]) => (
          <li key={id} className="mb-2 p-2 border rounded">
            <p className="font-semibold">{product.productName}</p>
            <p className="text-gray-600">{product.productDescription}</p>
            <p className="text-green-700 font-bold">
              {product.productPrice?.toFixed(2) ?? "N/A"} leke
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
