"use client";
import { useUnit } from "effector-react";
import { $cart } from "@/features/product/add-to-cart/model";
import { ShoppingBag } from "lucide-react";
import { Button } from "antd";
import { openCartDrawer } from "@/widgets/cart/cart-drawer/model";

export const CheckoutButton = () => {
  const [cart, openDrawer] = useUnit([$cart, openCartDrawer]);
  const totalCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Button
      icon={<ShoppingBag size={16} />}
      disabled={totalCount === 0}
      className="w-auto min-w-[48px] max-w-[64px] p-2 flex items-center justify-center"
      onClick={() => openDrawer()}
    >
      <p className="font-bold text-xs">{totalCount}</p>
    </Button>
  );
};
