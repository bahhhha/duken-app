"use client";

import { Product } from "@/shared/interfaces/product";
import { Button } from "@/shared/ui/button";
import { AddToCart } from "@/features/product/add-to-cart/ui/add-to-cart";
import { Card } from "antd";
import { useRouter } from "next/navigation";
import { Image } from "@/shared/ui/image";
import { useUnit } from "effector-react";
import { $cart } from "@/features/product/add-to-cart/model";
import { Star } from "lucide-react";
import { toggleFavorite } from "@/features/add-to-favourites/model";
import { PriceChip } from "@/entities/product/price-chip";

interface ProductCardProps {
  product: Product;
  isFavorite?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite = false,
}) => {
  const navigate = useRouter();
  const productInCart = useUnit($cart).find(
    (item) => item.product.id === product.id
  );

  const productInCartQuantity = productInCart?.quantity || 0;
  const getPrice = () => {
    if (productInCartQuantity >= 200000) {
      return {
        price: Number(product.priceFrom200k),
        discountedPrice: null,
      };
    } else if (productInCartQuantity >= 150000) {
      return {
        price: Number(product.priceFrom150k),
        discountedPrice: null,
      };
    } else
      return {
        price: Number(product.retailPrice),
        discountedPrice: Number(product.hotPrice) || null,
      };
  };
  const handleDetailsClick = () => navigate.push(`catalogue/${product.id}`);

  return (
    <Card
      className="shadow-md 
        h-[27rem] sm:w-[17.5rem]"
    >
      <div
        className={`
          flex flex-col
          w-full items-stretch h-full
        `}
      >
        <div
          className="
            relative w-full 
            h-36
            mb-4 rounded-lg overflow-hidden
          "
        >
          {product.recommended && (
            <div className="absolute italic top-2 left-2 z-10 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold shadow-sm">
              HOT
            </div>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(product);
            }}
            className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-sm"
          >
            <Star
              className={`w-5 h-5 ${
                isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
              }`}
            />
          </button>
          <Image
            imageSrcs={product.photos}
            alt={product.name}
            sizes="(max-width: 640px) 100vw, 250px"
          />
        </div>

        <div className="h-36 px-2 w-full`">
          <h1
            className="
              text-base
              h-1/3 flex items-center font-bold mb-2 line-clamp-2
            "
          >
            {product.name}
          </h1>
          <p
            className="
              text-gray-500 mb-4 
              text-sm
              line-clamp-3
            "
          >
            {product.description}
          </p>
        </div>

        <div className="w-full flex-col flex gap-2 px-2 pb-2">
          <div className="w-full flex gap-2 items-center">
            <div className="w-1/2">
              <PriceChip {...getPrice()} />
            </div>
            <div className="w-1/2">
              <AddToCart product={product} />
            </div>
          </div>

          <Button
            type="primary"
            onClick={handleDetailsClick}
            className="
              w-full 
              text-base
          "
          >
            Инфо
          </Button>
        </div>
      </div>
    </Card>
  );
};

export { ProductCard };
