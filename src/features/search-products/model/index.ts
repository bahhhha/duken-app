import { $products } from "@/features/get-products/model";
import { Product } from "@/shared/interfaces/product";
import { createEvent, createStore, sample } from "effector";

const setSearchQuery = createEvent<string>();
const $searchQuery = createStore<string>("").on(
  setSearchQuery,
  (_, query) => query
);

const $searchedProducts = createStore<Product[]>([]);

sample({
  clock: $searchQuery.updates,
  fn: () => {
    const products = $products.getState();
    return products.filter((product) =>
      product.name.toLowerCase().includes($searchQuery.getState().toLowerCase())
    );
  },
  target: $searchedProducts,
});

export { setSearchQuery, $searchQuery, $searchedProducts };
