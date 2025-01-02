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
export const setCategory1 = createEvent<string>();
export const setCategory2 = createEvent<string>();
export const setCategory3 = createEvent<string>();
export const setCategory4 = createEvent<string>();

export interface FilterParams {
  sortField: "name" | "price";
  sortDirection: "asc" | "desc";
  priceRange: [number, number];
  isRecommendedActive: boolean;
  isHotPriceActive: boolean;
  isFavoritesActive: boolean;
  category1: string;
  category2: string;
  category3: string;
  category4: string;
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
  category1: "",
  category2: "",
  category3: "",
  category4: "",
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
  .on(setCategory1, (state, category) => ({ ...state, category1: category }))
  .on(setCategory2, (state, category) => ({ ...state, category2: category }))
  .on(setCategory3, (state, category) => ({ ...state, category3: category }))
  .on(setCategory4, (state, category) => ({ ...state, category4: category }));

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
