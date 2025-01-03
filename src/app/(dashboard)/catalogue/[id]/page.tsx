"use client";

import React from "react";
import { useUnit, useGate } from "effector-react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

import { $products, CatalogueGate } from "@/features/get-products/model";
import { ProductInfo } from "@/entities/product/product-info/ui/product-info";
import { TryAlso } from "@/widgets/try-also/try-also";

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  useGate(CatalogueGate);

  const products = useUnit($products);

  const product = products.find((p) => p.id === params.id) || null;

  const randomProducts = products
    .filter((p) => p.id !== product?.id)
    .slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="w-full min-h-screen h-fit md:py-8 flex flex-col p-6 md:px-8"
    >
      {product ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <ProductInfo product={product} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="mt-8"
          >
            {randomProducts.length > 0 && <TryAlso products={randomProducts} />}
          </motion.div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <h2 className="text-center text-xl font-semibold mb-2">
            Продукт не найден
          </h2>
          <p>
            Убедитесь, что вы ввели правильный URL или выберите другой продукт.
          </p>
        </div>
      )}
    </motion.div>
  );
}
