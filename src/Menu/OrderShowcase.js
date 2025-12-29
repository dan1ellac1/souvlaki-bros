import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export const OrderShowcase = ({ selectedProduct, counts, setCounts }) => {
  const [orderProducts, setOrderProducts] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setOrderProducts(Object.entries(selectedProduct));
  }, [selectedProduct]);

  useEffect(() => {
    localStorage.setItem(
      "userOrder",
      JSON.stringify({ selectedProduct, counts })
    );
  }, [counts, selectedProduct]);

  const changeCount = (id, delta) => {
    setCounts(prev => {
      const updated = { ...prev };
      const newCount = (updated[id] || 1) + delta;
      if (newCount < 1) delete updated[id];
      else updated[id] = newCount;
      return updated;
    });
  };

  const totalItems = orderProducts.reduce(
    (acc, [id]) => acc + (counts[id] || 1),
    0
  );

  const totalPrice = orderProducts.reduce((acc, [id, product]) => {
    const count = counts[id] || 1;
    return acc + (product.productPrice ?? 0) * count;
  }, 0);

  const expandedOrderList = orderProducts.flatMap(([id, product]) => {
    const count = counts[id] || 1;
    return Array(count).fill([id, product]);
  });

  const goToOrder = () => {
    navigate("/order", {
      state: { orderProducts: expandedOrderList, counts, totalPrice, selectedProduct },
    });
  };

  if (orderProducts.length === 0) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 mx-auto
        w-full sm:w-4/5 md:w-3/5 lg:w-1/2
        bg-white shadow-lg rounded-t-lg p-4 border-t border-gray-200 z-50
        flex flex-col gap-4"
    >

      {/* COLLAPSED MODE */}
      {collapsed && (
        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold">
            🛒 {totalItems} item{totalItems !== 1 ? "s" : ""}
          </p>

          <button
            onClick={() => setCollapsed(false)}
            className="border px-4 py-2 rounded-lg font-bold"
          >
            EXPAND
          </button>
        </div>
      )}

      {/* EXPANDED MODE */}
      {!collapsed && (
        <>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl font-semibold">
                🛒 {totalItems} item{totalItems !== 1 ? "s" : ""}
              </p>
              <p className="text-green-700 font-bold">
                Total: {totalPrice.toFixed(2)} leke
              </p>
            </div>

            <div className="flex gap-3 items-center">
              <button
                onClick={() => setCollapsed(true)}
                className="border px-4 py-2 rounded-lg font-bold"
              >
                MINIMIZE
              </button>

              <button
                onClick={goToOrder}
                className="bg-green-600 hover:bg-green-700 text-white text-sm px-6 py-2 rounded-lg font-semibold"
              >
                Go to Order
              </button>
            </div>
          </div>

          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-wrap gap-3 border-t pt-3"
            >
              {orderProducts.map(([id, product]) => (
                <motion.div
                  key={id}
                  layout
                  className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg shadow-sm
                    w-full sm:w-fit"
                >
                  <div className="mr-3">
                    <p className="font-semibold">{product.productName}</p>
                    <p className="text-sm text-gray-500">
                      {product.productPrice?.toFixed(2)} leke each
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => changeCount(id, -1)}
                      className="bg-red-500 text-white px-2 rounded"
                    >
                      −
                    </button>

                    <span className="font-semibold">{counts[id] || 1}</span>

                    <button
                      onClick={() => changeCount(id, +1)}
                      className="bg-green-500 text-white px-2 rounded"
                    >
                      +
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
};
