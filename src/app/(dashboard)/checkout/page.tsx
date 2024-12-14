"use client";
import React, { useEffect } from "react";
import { useUnit } from "effector-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ProductCard } from "@/entities/product/product-card";
import { $cart } from "@/features/product/add-to-cart/model";
import RequestForm from "@/features/send-request/ui/request-form";
import { fetchSendRequest } from "@/features/send-request/model/query";
import { Check } from "lucide-react";
import { useTheme } from "@/shared/hooks/useTheme";

function CheckoutPage() {
  const cartItems = useUnit($cart);
  const requestStatus = useUnit(fetchSendRequest.$status);
  const router = useRouter();
  const theme = useTheme();
  useEffect(() => {
    if (requestStatus === "done") {
      const timeoutId = setTimeout(() => {
        router.push("/catalogue");
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [requestStatus, router]);

  if (requestStatus === "done") {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full px-8">
        <Check className="text-green-400" size={64} />
        {/* <div className="w-1/2 my-4">
          <Progress percent={100} showInfo={false} status="active" />
        </div> */}
        <p className="text-lg font-semibold mt-6">
          Thank you, you are being redirected...
        </p>
      </div>
    );
  }

  return (
    <div className="flex md:flex-row flex-col justify-center gap-4 h-full w-full px-8">
      <div className="md:w-2/3 w-full flex flex-col gap-4">
        <p className="text-xl font-bold bg-zinc-50 p-4 rounded-lg">Корзина</p>
        <div className="flex gap-4 flex-wrap">
          <AnimatePresence>
            {cartItems.map((cartItem, index) => (
              <motion.div
                key={cartItem.product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ProductCard product={cartItem.product} compact />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <div className="md:w-1/3 w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, delay: cartItems.length * 0.1 }}
          className="flex flex-col gap-4"
        >
          <p
            style={{
              backgroundColor: theme?.primaryColor,
            }}
            className="text-xl font-bold text-white p-4 rounded-lg"
          >
            Контактная информация
          </p>
          <RequestForm />
        </motion.div>
      </div>
    </div>
  );
}

export default CheckoutPage;
