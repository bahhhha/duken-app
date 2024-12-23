import React from "react";
import Image from "next/image";
import { Typography } from "antd";
import { motion } from "framer-motion";

import { Product } from "@/shared/interfaces/product";

interface ProductCardMiniProps {
  product: Product;
}

export const ProductCardMini: React.FC<ProductCardMiniProps> = ({
  product,
}) => {
  return (
    <motion.div
      className="
        w-48 h-64 p-4 bg-white rounded-md shadow-sm
        flex flex-col justify-between items-center
        hover:shadow-md transition-shadow
        cursor-pointer
      "
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative w-full h-32 mb-2">
        <Image
          src={product.photos[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw"
          className="object-contain"
        />
      </div>

      <Typography.Text strong className="text-sm">
        {product.name}
      </Typography.Text>

      <Typography.Text className="text-xs text-gray-500 truncate">
        {product.category}
      </Typography.Text>

      <Typography.Text className="text-sm text-blue-500">
        {product.price}₸
      </Typography.Text>
    </motion.div>
  );
};
