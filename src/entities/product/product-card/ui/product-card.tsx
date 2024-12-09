"use client";

import { Product } from "@/shared/interfaces/product";
import { Button } from "@/shared/ui/button";
import { Chip } from "@/shared/ui/chip";
import Image from "next/image";
import { AddToCart } from "@/features/product/add-to-cart/ui/add-to-cart";
import { Card } from "antd";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  compact = false,
}) => {
  const navigate = useRouter();
  // const setProduct = useUnit(selectProduct);

  const handleDetailsClick = () => navigate.push(`catalogue/${product.id}`);

  return (
    <Card className="shadow-md w-full sm:w-auto">
      <div
        className={`
          flex flex-col justify-between
          ${compact ? "h-[22rem] sm:w-64 " : "h-[29rem] sm:w-72"}
          w-full
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
            fill
            sizes="(max-width: 640px) 100vw, 250px"
            className="rounded-lg object-contain"
          />
        </div>

        <div className={`${compact ? "h-28" : "h-32"} px-2`}>
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
              <Chip>{product.retailPrice} $</Chip>
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
