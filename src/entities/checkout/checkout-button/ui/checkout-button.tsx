"use client";
import { useUnit } from "effector-react";
import Link from "next/link";
import { $cart } from "@/features/product/add-to-cart/model";
import { ShoppingBag } from "lucide-react";
import { Button } from "antd";

export const CheckoutButton = () => {
  const cart = useUnit($cart);
  const totalCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link href="/checkout" className="relative">
      <Button icon={<ShoppingBag size={16} />} className="w-24">
        <p className="font-bold text-xs">{totalCount}</p>
      </Button>
    </Link>
  );
};
