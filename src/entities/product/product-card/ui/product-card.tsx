"use client";

import { Product } from "@/shared/interfaces/product";
import { Button } from "@/shared/ui/button";
import { Chip } from "@/shared/ui/chip";
import { AddToCart } from "@/features/product/add-to-cart/ui/add-to-cart";
import { Card } from "antd";
import { useRouter } from "next/navigation";
import { Image } from "@/shared/ui/image";
import { useUnit } from "effector-react";
import { $cart } from "@/features/product/add-to-cart/model";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  compact = false,
}) => {
  const navigate = useRouter();
  const productInCart = useUnit($cart).find(
    (item) => item.product.id === product.id
  );
  const productInCartQuantity = productInCart?.quantity || 0;
  const getPrice = () => {
    if (productInCartQuantity >= 200000) {
      return Number(product.priceFrom200k) * Number(productInCartQuantity);
    } else if (productInCartQuantity >= 150000) {
      return Number(product.priceFrom150k) * Number(productInCartQuantity);
    } else if (productInCartQuantity > 0) {
      return Number(product.retailPrice) * Number(productInCartQuantity);
    } else return Number(product.retailPrice);
  };
  const handleDetailsClick = () => navigate.push(`catalogue/${product.id}`);

  return (
    <Card
      className={`shadow-md ${
        compact ? "h-[24rem] sm:w-64" : "h-[28rem] sm:w-[20rem]"
      }`}
    >
      <div
        className={`
          flex flex-col
          w-full items-stretch h-full
        `}
      >
        <div
          className={`
            relative w-full 
            ${compact ? "h-36" : "h-36"}
            mb-4 rounded-lg overflow-hidden
          `}
        >
          <Image
            src={product.photo}
            alt={product.name}
            sizes="(max-width: 640px) 100vw, 250px"
          />
        </div>

        <div className={`${compact ? "h-28" : "h-32"} px-2 w-full`}>
          <h1
            className={`
              ${compact ? "text-md" : "text-lg"}
              h-1/3 flex items-center font-bold mb-2 line-clamp-2
            `}
          >
            {product.name}
          </h1>
          <p
            className={`
              text-gray-500 mb-4 
              ${compact ? "text-xs" : "text-sm"}
              line-clamp-3
            `}
          >
            {product.description}
          </p>
        </div>

        <div className="w-full flex-col flex gap-2 px-2 pb-2">
          <div className="w-full flex gap-2 items-center">
            <div className="w-1/2">
              <Chip>{getPrice()} ₸</Chip>
            </div>
            <div className="w-1/2">
              <AddToCart product={product} />
            </div>
          </div>

          <Button
            type="primary"
            onClick={handleDetailsClick}
            className={`
              w-full 
              ${compact ? "text-sm" : "text-base"}
            `}
          >
            Инфо
          </Button>
        </div>
      </div>
    </Card>
  );
};

export { ProductCard };
