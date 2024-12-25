import { createEvent, createStore, sample, createEffect } from "effector";
import { Product } from "@/shared/interfaces/product";

export const toggleFavorite = createEvent<Product>();
export const loadFavoritesFromStorage = createEvent();
export const clearFavorites = createEvent();

export const saveFavoritesFx = createEffect<Product[], void>((favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
});

export const loadFavoritesFx = createEffect<void, Product[]>(() => {
  const stored = localStorage.getItem("favorites");
  return stored ? JSON.parse(stored) : [];
});

export const $favorites = createStore<Product[]>([]);

export const $favoritesIds = $favorites.map(
  (favorites) => new Set(favorites.map((product) => product.id))
);

sample({
  clock: loadFavoritesFromStorage,
  target: loadFavoritesFx,
});

sample({
  clock: loadFavoritesFx.doneData,
  target: $favorites,
});

sample({
  clock: toggleFavorite,
  source: $favorites,
  fn: (favorites, product) => {
    const exists = favorites.some((p) => p.id === product.id);
    return exists
      ? favorites.filter((p) => p.id !== product.id)
      : [...favorites, product];
  },
  target: $favorites,
});

sample({
  clock: $favorites,
  target: saveFavoritesFx,
});

sample({
  clock: clearFavorites,
  fn: () => [],
  target: $favorites,
});

loadFavoritesFx.failData.watch((error) => {
  console.error("Failed to load favorites:", error);
});

saveFavoritesFx.failData.watch((error) => {
  console.error("Failed to save favorites:", error);
});

import { createGate } from "effector-react";

export const FavoritesGate = createGate();

sample({
  clock: FavoritesGate.open,
  target: loadFavoritesFromStorage,
});
