import { Product } from "@/shared/interfaces/product";
import { createEvent, createStore } from "effector";

const selectProduct = createEvent<Product | null>();
const $selectedProduct = createStore<Product | null>(null).on(
  selectProduct,
  (_, product) => product
);

export { selectProduct, $selectedProduct };
