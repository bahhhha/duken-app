import { FilterParams } from "@/features/filter-products/model";
import { Product } from "../interfaces/product";

export const getPriceRangeLimits = (products: Product[]): [number, number] => {
  const prices = products.flatMap((p) => [
    parseFloat(p.price),
    p.hotPrice ? parseFloat(p.hotPrice) : parseFloat(p.price),
  ]);
  return [Math.min(...prices), Math.max(...prices)];
};

export const getUniqueCategories = (
  products: Product[],
  categoryKey: "category1" | "category2" | "category3" | "category4"
): string[] => {
  return Array.from(
    new Set(products.map((p) => p[categoryKey]).filter(Boolean))
  );
};

export const filterAndSortProducts = (
  products: Product[],
  favoritesIds: Set<string>,
  params: FilterParams
): Product[] => {
  const {
    sortField,
    sortDirection,
    priceRange,
    isRecommendedActive,
    isHotPriceActive,
    isFavoritesActive,
    category1,
    category2,
    category3,
    category4,
  } = params;

  const [minPrice, maxPrice] = priceRange;
  let filtered = [...products];

  filtered = filtered.filter((product) => {
    const price = product.hotPrice
      ? parseFloat(product.hotPrice)
      : parseFloat(product.price);
    const priceInRange = price >= minPrice && price <= maxPrice;

    const matchesRecommended = !isRecommendedActive || product.recommended;
    const matchesHotPrice = !isHotPriceActive || !!product.hotPrice;
    const matchesFavorites = !isFavoritesActive || favoritesIds.has(product.id);

    const matchesCategory1 = !category1 || product.category1 === category1;
    const matchesCategory2 = !category2 || product.category2 === category2;
    const matchesCategory3 = !category3 || product.category3 === category3;
    const matchesCategory4 = !category4 || product.category4 === category4;

    return (
      priceInRange &&
      matchesRecommended &&
      matchesHotPrice &&
      matchesFavorites &&
      matchesCategory1 &&
      matchesCategory2 &&
      matchesCategory3 &&
      matchesCategory4
    );
  });

  filtered.sort((a, b) => {
    if (sortField === "name") {
      return sortDirection === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else {
      const priceA = a.hotPrice ? parseFloat(a.hotPrice) : parseFloat(a.price);
      const priceB = b.hotPrice ? parseFloat(b.hotPrice) : parseFloat(b.price);
      return sortDirection === "asc" ? priceA - priceB : priceB - priceA;
    }
  });

  return filtered;
};
