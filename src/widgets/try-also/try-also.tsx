import React from "react";
import { motion } from "framer-motion";

import { ProductCardMini } from "@/entities/product/product-card-mini/ui/product-card-mini";
import { Product } from "@/shared/interfaces/product";

interface TryAlsoProps {
  products: Product[];
}

export const TryAlso: React.FC<TryAlsoProps> = ({ products }) => {
  return (
    <div className="container w-full mx-auto md:border-t">
      <h2 className="text-center font-bold text-xl mb-4 md:mt-6">
        Попробуйте также
      </h2>
      <div className="grid md:flex md:flex-wrap md:gap-4 grid-cols-2 md:justify-center">
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
