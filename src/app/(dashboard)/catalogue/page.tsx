"use client";
import { ProductCard } from "@/entities/product/product-card";
import { $products, CatalogueGate } from "@/features/get-products/model";
import { fetchGetProducts } from "@/features/get-products/model/query";
import { Loading } from "@/shared/ui/loading/loading";
import { useGate, useStoreMap, useUnit } from "effector-react";
import {
  $favoritesIds,
  loadFavoritesFromStorage,
} from "@/features/add-to-favourites/model";
import { useEffect } from "react";

export default function Catalogue() {
  useGate(CatalogueGate);

  const [loading, favoritesIds] = useUnit([
    fetchGetProducts.$pending,
    $favoritesIds,
  ]);

  useEffect(() => {
    loadFavoritesFromStorage();
  }, []);

  const productsHotFirst = useStoreMap($products, (products) =>
    products.sort((a, b) => Number(b.recommended) - Number(a.recommended))
  );

  return (
    <div className="container mx-auto px-4">
      {loading ? (
        <div className="w-full h-[40vw]">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {productsHotFirst.map((product) => (
            <div key={product.id} className="w-full">
              <ProductCard
                product={product}
                isFavorite={favoritesIds.has(product.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
