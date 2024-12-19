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
import { CartDrawer } from "@/widgets/cart/cart-drawer/ui/cart-drawer";
import { $cartDrawerOpen } from "@/widgets/cart/cart-drawer/model";

export default function Catalogue() {
  useGate(CatalogueGate);

  const [loading, favoritesIds, cartDrawerOpen] = useUnit([
    fetchGetProducts.$pending,
    $favoritesIds,
    $cartDrawerOpen,
  ]);

  useEffect(() => {
    loadFavoritesFromStorage();
  }, []);

  const productsHotFirst = useStoreMap($products, (products) =>
    products.sort((a, b) => Number(b.recommended) - Number(a.recommended))
  );

  return (
    <div>
      {loading ? (
        <div className="w-full h-[40vw]">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 w-full">
          {productsHotFirst.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favoritesIds.has(product.id)}
            />
          ))}
        </div>
      )}
      {cartDrawerOpen && <CartDrawer />}
    </div>
  );
}
