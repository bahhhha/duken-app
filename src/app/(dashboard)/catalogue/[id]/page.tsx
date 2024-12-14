"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useGate, useUnit } from "effector-react";
import { $products, CatalogueGate } from "@/features/get-products/model";
import { ProductInfo } from "@/entities/product/product-info/ui/product-info";
import { TryAlso } from "@/widgets/try-also/try-also";

const ProductPage: React.FC = () => {
  const params = useParams();
  useGate(CatalogueGate);
  const products = useUnit($products);

  const product = products.find((p) => p.id === params.id) || null;
  const randomProducts = products.filter((p) => p.id !== params.id).slice(0, 7);

  return (
    <div className="w-full min-h-screen h-fit flex flex-col">
      <div className="flex-grow">
        {product ? (
          <ProductInfo product={product} />
        ) : (
          <div className="flex justify-center items-center h-full">
            Продукт не найден
          </div>
        )}
      </div>
      {product && (
        <div className="mt-4">
          <TryAlso products={randomProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductPage;
