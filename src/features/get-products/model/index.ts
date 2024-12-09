import { createStore, sample } from "effector";
import { createGate } from "effector-react";
import { fetchGetProducts } from "./query";
import { Product } from "@/shared/interfaces/product";
import { BusinessDetails } from "@/shared/interfaces/businessDetails";

const CatalogueGate = createGate();
const $products = createStore<Product[]>([]);
const $details = createStore<BusinessDetails | null>(null);

sample({
  clock: CatalogueGate.open,
  target: fetchGetProducts.start,
});

sample({
  clock: fetchGetProducts.finished.success,
  source: fetchGetProducts.$data,
  fn: (data) => data?.details || null,
  target: $details,
});

sample({
  clock: fetchGetProducts.finished.success,
  source: fetchGetProducts.$data,
  fn: (data) => data?.products || [],
  target: $products,
});

export { CatalogueGate, $details, $products };
