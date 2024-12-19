import { createEvent, createStore } from "effector";

const openCartDrawer = createEvent();
const closeCartDrawer = createEvent();

const $cartDrawerOpen = createStore<boolean>(false);

$cartDrawerOpen.on(openCartDrawer, () => true).on(closeCartDrawer, () => false);

export { openCartDrawer, closeCartDrawer, $cartDrawerOpen };
