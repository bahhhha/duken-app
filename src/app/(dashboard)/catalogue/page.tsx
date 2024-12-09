"use client";
import { ProductCard } from "@/entities/product/product-card";
import { $products, CatalogueGate } from "@/features/get-products/model";
import { useGate, useUnit } from "effector-react";

export default function Catalogue() {
  const products = useUnit($products);
  useGate(CatalogueGate);

  return (
    <div
      className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5 
        gap-4 
        p-4
      "
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} compact={true} />
      ))}
    </div>
  );
}
