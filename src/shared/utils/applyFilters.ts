import { FilterParams } from "@/features/filter-products/model";
import { Product } from "../interfaces/product";

export const getPriceRangeLimits = (products: Product[]): [number, number] => {
  const prices = products.flatMap((p) => [
    parseFloat(p.price),
    p.hotPrice ? parseFloat(p.hotPrice) : parseFloat(p.price),
  ]);
  return [Math.min(...prices), Math.max(...prices)];
};

export const getUniqueCategories = (products: Product[]): string[] => {
  const categories = Array.from(new Set(products.map((p) => p.category)));
  return ["Все", ...categories];
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
    selectedCategory,
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
    const matchesCategory =
      selectedCategory === "Все" || product.category === selectedCategory;

    return (
      priceInRange &&
      matchesRecommended &&
      matchesHotPrice &&
      matchesFavorites &&
      matchesCategory
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
