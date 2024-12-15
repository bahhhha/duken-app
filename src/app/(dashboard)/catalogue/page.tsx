"use client";
import { ProductCard } from "@/entities/product/product-card";
import { $products, CatalogueGate } from "@/features/get-products/model";
import { fetchGetProducts } from "@/features/get-products/model/query";
import { Loading } from "@/shared/ui/loading/loading";
import { useGate, useUnit } from "effector-react";

export default function Catalogue() {
  useGate(CatalogueGate);

  const [products, loading] = useUnit([$products, fetchGetProducts.$pending]);

  return (
    <div>
      {loading ? (
        <div className="w-full h-[40vw]">
          <Loading />
        </div>
      ) : (
        <div
          className="
          flex flex-wrap gap-4 w-full"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
