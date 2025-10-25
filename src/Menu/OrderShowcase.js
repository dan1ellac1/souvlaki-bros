import React, { useState, useEffect } from 'react';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

export const OrderShowcase = ({ selectedProduct }) => {
  const [orderProducts, setOrderProducts] = useState([]);
  const [counts, setCounts] = useState({});

  // Add new products to order list when prop changes
  useEffect(() => {
    const entries = Object.entries(selectedProduct);
    if (entries.length > 0) {
      setOrderProducts(prev => {
        const existingIds = prev.map(([id]) => id);
        const newEntries = entries.filter(([id]) => !existingIds.includes(id));
        return [...prev, ...newEntries];
      });
    }
  }, [selectedProduct]);

  const handleAddDuplicate = (id) => {
    setCounts(prev => ({
      ...prev,
      [id]: (prev[id] || 1) + 1
    }));
  };

  const handleRemoveDuplicate = (id) => {
    setCounts(prev => {
      const current = prev[id] || 1;
      return {
        ...prev,
        [id]: current > 1 ? current - 1 : 1
      };
    });
  };

  console.log(orderProducts.length)

  return (
    <div
      className="w-3/5 fixed bottom-0 left-0 right-0 mx-auto
      bg-white shadow-lg rounded-t-lg p-4 border-t border-gray-200 z-50
      flex flex-col transition-all"
    >
      <p className="text-2xl font-bold mb-2 text-left">Your order:</p>

      <ul>
        {orderProducts.length === 0 && <p>No products selected.</p>}

        {orderProducts.map(([id, product]) => {
          const count = counts[id] || 1;
          const totalPrice = (product.productPrice ?? 0) * count;

          return (
            <li
              key={id}
              className="mb-2 p-2 border border-black rounded flex justify-between"
            >
              <div>
                <p className="font-semibold">{product.productName}</p>
                <p className="text-gray-600">{product.productDescription}</p>
                <p className="text-green-700 font-bold">
                  {totalPrice.toFixed(2)} leke
                </p>
                {count > 1 && (
                  <p className="text-sm text-gray-500">
                    ({count} × {product.productPrice?.toFixed(2)} leke)
                  </p>
                )}
              </div>

              <div className="flex flex-row items-center">
                <div
                  className="cursor-pointer m-1 p-1 border border-black rounded"
                  onClick={() => handleRemoveDuplicate(id)}
                >
                  <MinusOutlined />
                </div>

                <p className="m-1">{count}</p>

                <div
                  className="cursor-pointer m-1 p-1 border border-black rounded"
                  onClick={() => handleAddDuplicate(id)}
                >
                  <PlusOutlined />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
