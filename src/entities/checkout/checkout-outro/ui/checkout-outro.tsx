"use client";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CheckoutOutroProps {
  onComplete?: () => void;
}

export function CheckoutOutro({ onComplete }: CheckoutOutroProps) {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push("/catalogue");
      onComplete?.();
    }, 5000);

    const countdownInterval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(redirectTimer);
      clearInterval(countdownInterval);
    };
  }, [router, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex flex-col items-center space-y-6"
      >
        <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center shadow-xl">
          <CheckCircle2 className="text-white" size={64} />
        </div>

        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">Заказ оформлен!</h1>
          <p className="text-gray-600">
            Данная страница закроется через {secondsLeft} сек.
          </p>

          <div className="flex justify-center pt-6">
            <Spin size="large" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
