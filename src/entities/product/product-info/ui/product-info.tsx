import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { Typography, Tag } from "antd";
import { Product } from "@/shared/interfaces/product";
import { Chip } from "@/shared/ui/chip";
import { AddToCart } from "@/features/product/add-to-cart/ui/add-to-cart";

export interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const tags = [
    { key: "category2", value: product.category2 },
    { key: "category3", value: product.category3 },
    { key: "category4", value: product.category4 },
    { key: "flavor", value: product.perPackage },
  ];

  return (
    <div className="max-w-6xl w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-full max-w-md aspect-square">
            <AnimatePresence mode="wait">
              <motion.div
                key={product.photos[selectedImageIndex]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full relative"
              >
                <Image
                  src={product.photos[selectedImageIndex]}
                  alt={product.name}
                  fill
                  className="object-contain rounded-lg"
                  sizes="(max-width: 768px) 100vw,
                          (max-width: 1200px) 50vw,
                          33vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {product.photos.length > 1 && (
            <div className="flex gap-2 overflow-x-auto w-full max-w-md">
              {product.photos.map((photo, index) => (
                <button
                  key={photo}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`
                    relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden
                    transition-all duration-200
                    ${
                      selectedImageIndex === index
                        ? "border-2 border-blue-500"
                        : "border border-gray-200 opacity-70 hover:opacity-100"
                    }
                  `}
                >
                  <Image
                    src={photo}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    sizes="80px"
                    className="object-contain p-1"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-4">
          <Typography.Title level={2}>{product.name}</Typography.Title>
          <Typography.Text className="text-gray-500 text-lg">
            {product.category1}
          </Typography.Text>

          <div>
            <Typography.Text strong>Описание</Typography.Text>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Tag key={tag.key} className="py-1 px-2 text-xs">
                {tag.value.toUpperCase()}
              </Tag>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Chip>{product.price}₸</Chip>
            <AddToCart product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};
