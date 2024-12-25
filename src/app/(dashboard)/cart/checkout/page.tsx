"use client";
import React, { useEffect } from "react";
import { useUnit } from "effector-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Divider, Card } from "antd";
import { Check } from "lucide-react";

import { $cart, $cartTotal } from "@/features/product/add-to-cart/model";
import { fetchSendRequest } from "@/features/send-request/model/query";
import { ProductCardRow } from "@/entities/product/product-card-row";
import RequestForm from "@/features/send-request/ui/request-form";

function CheckoutPage() {
  const [cartItems, total] = useUnit([$cart, $cartTotal]);
  const requestStatus = useUnit(fetchSendRequest.$status);
  const router = useRouter();

  useEffect(() => {
    if (requestStatus === "done") {
      const timeoutId = setTimeout(() => {
        router.push("/catalogue");
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [requestStatus, router]);

  if (requestStatus === "done") {
    return (
      <motion.div
        className="flex flex-col items-center justify-center h-full w-full p-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Check className="text-green-500" size={64} />
        <p className="text-lg font-semibold mt-4 text-center">
          Спасибо за заказ! Переход в каталог...
        </p>
      </motion.div>
    );
  }

  return (
    <div className="w-full p-4 md:p-8 min-h-screen flex flex-col md:justify-center md:items-start md:flex-row gap-8">
      <motion.div
        className="md:w-1/2 flex flex-col h-full"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <RequestForm />
      </motion.div>
      <motion.div
        className="md:w-1/2 flex flex-col gap-4"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card
          bodyStyle={{ padding: "1rem" }}
          className="shadow-sm border border-gray-100"
        >
          <h2 className="text-xl font-bold mb-4">Корзина</h2>
          <div className="flex flex-col gap-4">
            {cartItems.length === 0 && (
              <p className="text-gray-500">Ваша корзина пуста.</p>
            )}
            {cartItems.map((cartItem, index) => (
              <React.Fragment key={cartItem.product.id}>
                <ProductCardRow product={cartItem.product} />
                {index !== cartItems.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </div>
          {cartItems.length > 0 && (
            <Divider className="my-4" style={{ margin: "1rem 0" }} />
          )}
          <div className="flex justify-between text-base font-semibold">
            <span>Итого</span>
            <span>{total} ₸</span>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

export default CheckoutPage;
