import { createEvent, createStore, sample } from "effector";
import { Product } from "@/shared/interfaces/product";

export const toggleFavorite = createEvent<Product>();
export const loadFavoritesFromStorage = createEvent();

export const $favorites = createStore<Product[]>([]);
export const $favoritesIds = $favorites.map(
  (favorites) => new Set(favorites.map((product) => product.id))
);

sample({
  clock: loadFavoritesFromStorage,
  fn: () => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  },
  target: $favorites,
});

sample({
  clock: toggleFavorite,
  source: $favorites,
  fn: (favorites, product) => {
    const exists = favorites.some((p) => p.id === product.id);
    const newFavorites = exists
      ? favorites.filter((p) => p.id !== product.id)
      : [...favorites, product];

    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    return newFavorites;
  },
  target: $favorites,
});
