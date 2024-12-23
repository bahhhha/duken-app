import React from "react";
import { motion } from "framer-motion";

import { ProductCardMini } from "@/entities/product/product-card-mini/ui/product-card-mini";
import { Product } from "@/shared/interfaces/product";

interface TryAlsoProps {
  products: Product[];
}

export const TryAlso: React.FC<TryAlsoProps> = ({ products }) => {
  return (
    <div className="container w-full mx-auto">
      <h2 className="text-center font-bold text-xl mb-4">Попробуйте также</h2>

      <div className="flex gap-4 justify-center flex-wrap">
        {products.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx, duration: 0.3 }}
          >
            <ProductCardMini product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
