import { Product } from "@/shared/interfaces/product";
import { createEvent, createStore, combine } from "effector";

export interface CartItem {
  product: Product;
  quantity: number;
  total: number;
}

export const addProduct = createEvent<Product>();
export const removeProduct = createEvent<Product>();
export const setProductQuantity = createEvent<{
  product: Product;
  quantity: number;
}>();
export const cartUpdatedFromStorage = createEvent<CartItem[]>();
export const resetCart = createEvent<void>();

const calculateItemTotal = (product: Product, quantity: number): number => {
  if (product.hotPrice) {
    return quantity * Number(product.hotPrice);
  } else {
    return quantity * Number(product.price);
  }
};

export const $cart = createStore<CartItem[]>([])
  .on(addProduct, (state, product) => {
    const index = state.findIndex((item) => item.product.id === product.id);
    if (index !== -1) {
      const newQuantity = state[index].quantity + 1;
      const updatedItem = {
        ...state[index],
        quantity: newQuantity,
        total: calculateItemTotal(product, newQuantity),
      };
      return [...state.slice(0, index), updatedItem, ...state.slice(index + 1)];
    } else {
      return [
        ...state,
        {
          product,
          quantity: 1,
          total: calculateItemTotal(product, 1),
        },
      ];
    }
  })
  .on(removeProduct, (state, product) => {
    const index = state.findIndex((item) => item.product.id === product.id);
    if (index !== -1) {
      const newQuantity = state[index].quantity - 1;
      if (newQuantity > 0) {
        const updatedItem = {
          ...state[index],
          quantity: newQuantity,
          total: calculateItemTotal(product, newQuantity),
        };
        return [
          ...state.slice(0, index),
          updatedItem,
          ...state.slice(index + 1),
        ];
      } else {
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
    }
    return state;
  })
  .on(setProductQuantity, (state, { product, quantity }) => {
    const index = state.findIndex((item) => item.product.id === product.id);
    if (quantity > 0) {
      if (index !== -1) {
        const updatedItem = {
          ...state[index],
          quantity,
          total: calculateItemTotal(product, quantity),
        };
        return [
          ...state.slice(0, index),
          updatedItem,
          ...state.slice(index + 1),
        ];
      } else {
        return [
          ...state,
          {
            product,
            quantity,
            total: calculateItemTotal(product, quantity),
          },
        ];
      }
    } else {
      if (index !== -1) {
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
    }
    return state;
  })
  .on(cartUpdatedFromStorage, (_, newCart) => newCart)
  .reset(resetCart);

export const $cartTotal = combine($cart, (cart) =>
  cart.reduce((sum, item) => sum + item.total, 0)
);
