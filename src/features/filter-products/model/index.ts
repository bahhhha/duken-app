import { createStore, createEvent, sample } from "effector";
import { $products } from "@/features/get-products/model";
import {
  filterAndSortProducts,
  getPriceRangeLimits,
} from "@/shared/utils/applyFilters";
import { $favoritesIds } from "@/features/add-to-favourites/model";
import { Product } from "@/shared/interfaces/product";

export const setSortField = createEvent<"name" | "price">();
export const setSortDirection = createEvent<"asc" | "desc">();
export const setPriceRange = createEvent<[number, number]>();
export const toggleRecommendedFilter = createEvent();
export const toggleHotPriceFilter = createEvent();
export const toggleFavoritesFilter = createEvent();
export const setSelectedCategory = createEvent<string>();

export interface FilterParams {
  sortField: "name" | "price";
  sortDirection: "asc" | "desc";
  priceRange: [number, number];
  isRecommendedActive: boolean;
  isHotPriceActive: boolean;
  isFavoritesActive: boolean;
  selectedCategory: string;
}

sample({
  clock: $products,
  fn: (products) => getPriceRangeLimits(products),
  target: setPriceRange,
});

export const $filterParams = createStore<FilterParams>({
  sortField: "name",
  sortDirection: "asc",
  priceRange: [0, 0],
  isRecommendedActive: false,
  isHotPriceActive: false,
  isFavoritesActive: false,
  selectedCategory: "Все",
})
  .on(setSortField, (state, field) => ({ ...state, sortField: field }))
  .on(setSortDirection, (state, direction) => ({
    ...state,
    sortDirection: direction,
  }))
  .on(setPriceRange, (state, range) => ({ ...state, priceRange: range }))
  .on(toggleRecommendedFilter, (state) => ({
    ...state,
    isRecommendedActive: !state.isRecommendedActive,
  }))
  .on(toggleHotPriceFilter, (state) => ({
    ...state,
    isHotPriceActive: !state.isHotPriceActive,
  }))
  .on(toggleFavoritesFilter, (state) => ({
    ...state,
    isFavoritesActive: !state.isFavoritesActive,
  }))
  .on(setSelectedCategory, (state, category) => ({
    ...state,
    selectedCategory: category,
  }));

export const $filteredProducts = createStore<Product[]>([]);

sample({
  clock: [$products, $filterParams, $favoritesIds],
  source: {
    products: $products,
    filterParams: $filterParams,
    favorites: $favoritesIds,
  },
  fn: ({ products, filterParams, favorites }) =>
    filterAndSortProducts(products, favorites, filterParams),
  target: $filteredProducts,
});
