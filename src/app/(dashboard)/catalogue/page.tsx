"use client";
import { ProductCard } from "@/entities/product/product-card";
import { CatalogueGate } from "@/features/get-products/model";
import { fetchGetProducts } from "@/features/get-products/model/query";
import { Loading } from "@/shared/ui/loading/loading";
import { useGate, useUnit } from "effector-react";
import { $favoritesIds } from "@/features/add-to-favourites/model";
import { $filteredProducts } from "@/features/filter-products/model";
import { ProductFilter } from "@/features/filter-products/ui/filter-products";
import {
  $searchedProducts,
  $searchQuery,
} from "@/features/search-products/model";
import { SearchProducts } from "@/features/search-products";
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

export default function Catalogue() {
  useGate(CatalogueGate);

  const loading = useUnit(fetchGetProducts.$pending);
  const filteredProducts = useUnit($filteredProducts);
  const favoritesIds = useUnit($favoritesIds);
  const query = useUnit($searchQuery);
  const searchedProducts = useUnit($searchedProducts);

  const renderProducts = () => {
    if (query) {
      return searchedProducts;
    }
    return filteredProducts;
  };

  return (
    <div className="container mx-auto px-4">
      {loading ? (
        <div className="w-full h-[40vw]">
          <Loading />
        </div>
      ) : (
        <motion.div
          className="flex flex-col md:flex-row gap-2 items-start w-full"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            className="w-96 md:sticky top-16 pr-4"
            variants={itemVariants}
          >
            <ProductFilter />
          </motion.div>
          <motion.div
            className="flex flex-col gap-4 w-full pl-4 md:border-l min-h-[calc(100vh-4rem)]"
            variants={itemVariants}
          >
            <SearchProducts />
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto overflow-x-hidden"
              variants={containerVariants}
            >
              {renderProducts().map((product) => (
                <motion.div
                  key={product.id}
                  className="w-full"
                  variants={itemVariants}
                >
                  <ProductCard
                    product={product}
                    isFavorite={favoritesIds.has(product.id)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
