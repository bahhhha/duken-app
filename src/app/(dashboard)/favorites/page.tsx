"use client";
import { $products, CatalogueGate } from "@/features/get-products/model";
import { useGate, useUnit } from "effector-react";
import {
  $favoritesIds,
  FavoritesGate,
} from "@/features/add-to-favourites/model";
import { ProductCard } from "@/entities/product/product-card";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function FavoritesPage() {
  useGate(FavoritesGate);
  useGate(CatalogueGate);

  const [favoritesIds, products] = useUnit([$favoritesIds, $products]);
  const favorites = products.filter((product) => favoritesIds.has(product.id));
  return (
    <motion.div
      className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto overflow-x-hidden"
      variants={containerVariants}
    >
      {favorites.map((product) => (
        <motion.div key={product.id} className="w-full" variants={itemVariants}>
          <ProductCard product={product} isFavorite />
        </motion.div>
      ))}
    </motion.div>
  );
}
