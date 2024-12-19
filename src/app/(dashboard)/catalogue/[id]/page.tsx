"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useGate, useUnit } from "effector-react";
import { $products, CatalogueGate } from "@/features/get-products/model";
import { ProductInfo } from "@/entities/product/product-info/ui/product-info";
// import { NextSeo } from "next-seo";

const ProductPage: React.FC = () => {
  const params = useParams();
  useGate(CatalogueGate);
  const products = useUnit($products);

  const product = products.find((p) => p.id === params.id) || null;

  // const getTitle = () => {
  //   if (product) {
  //     return `${product.name || "Продукт"}`;
  //   }
  //   return "Продукт не найден";
  // };

  return (
    <>
      {/* <NextSeo title={getTitle()} /> */}
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
        {/* {product && (
          <div className="mt-4">
            <TryAlso products={randomProducts} />
          </div>
        )} */}
      </div>
    </>
  );
};

export default ProductPage;
