"use client";
import Image from "next/image";
import { Typography } from "antd";
import { motion } from "framer-motion";

import { Product } from "@/shared/interfaces/product";
import { useTheme } from "@/shared/hooks/useTheme";
import { useRouter } from "next/navigation";

interface ProductCardMiniProps {
  product: Product;
}

export const ProductCardMini: React.FC<ProductCardMiniProps> = ({
  product,
}) => {
  const theme = useTheme();
  const router = useRouter();
  const handleNavigate = () => {
    router.push(`/catalogue/${product.id}`);
  };
  return (
    <motion.div
      onClick={handleNavigate}
      className="
        w-48 h-64 p-4 bg-white rounded-md duration-100
        flex flex-col justify-between items-center
        hover:bg-zinc-100
        cursor-pointer
      "
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

      <Typography.Text
        className="text-sm"
        style={{
          color: theme?.primaryColor,
        }}
      >
        {product.price}₸
      </Typography.Text>
    </motion.div>
  );
};
