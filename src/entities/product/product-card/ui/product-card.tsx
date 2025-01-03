"use client";

import { Product } from "@/shared/interfaces/product";
import { AddToCart } from "@/features/product/add-to-cart/ui/add-to-cart";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { toggleFavorite } from "@/features/add-to-favourites/model";
import { PriceChip } from "@/entities/product/price-chip";
import Image from "next/image";
import { useTheme } from "@/shared/hooks/useTheme";
import { NoStock } from "../../no-stock";
import { useAnalytics } from "@/shared/hooks/useAnalytics";

interface ProductCardProps {
  product: Product;
  isFavorite?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite = false,
}) => {
  const navigate = useRouter();
  const { trackFavoriteToggle } = useAnalytics();

  const getPrice = () => {
    return {
      price: Number(product.price),
      discountedPrice: Number(product.hotPrice) || null,
    };
  };

  const theme = useTheme();

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggleFavorite(product);
    trackFavoriteToggle(product, !isFavorite);
  };
  const handleDetailsClick = () => navigate.push(`catalogue/${product.id}`);

  return (
    <div
      className="w-full lg:w-[16.5rem] cursor-pointer hover:bg-zinc-100 duration-100"
      onClick={handleDetailsClick}
    >
      <div className="flex flex-col w-full items-stretch">
        <div className="relative aspect-square w-full mb-4">
          <div className="absolute inset-0 rounded-lg overflow-hidden">
            {product.recommended && (
              <div
                className="absolute top-2 left-2 z-10 text-white px-2 py-1 rounded-md text-xs font-semibold shadow-sm italic"
                style={{
                  backgroundColor: theme?.primaryColor,
                }}
              >
                HOT
              </div>
            )}

            <button
              onClick={handleFavoriteClick}
              className={`absolute top-2 right-2 z-10 p-2 rounded-full hover:bg-black/20
                  transition-colors shadow-sm ${isFavorite && "bg-black/20"}`}
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-white"
                }`}
              />
            </button>

            <div className="w-full h-full relative">
              <Image
                alt={product.name}
                src={product.photos[0]}
                className="object-contain"
                fill
              />
            </div>
          </div>
        </div>
        <div className="px-2 pb-2">
          <h1 className="text-base flex font-bold line-clamp-2 h-12">
            {product.name}
          </h1>
          <p className="text-xs text-gray-500 h-4 mt-1">
            В наличии:{" "}
            <span className="italic font-semibold">{product.quantity}</span>
          </p>
          <p className="text-xs text-gray-500 mb-2 h-4 line-clamp-1 mt-1">
            {product.description}
          </p>
          <div className="my-2 h-6">
            <PriceChip {...getPrice()} />
          </div>

          <div className="w-full h-8">
            {product.quantity > 0 ? (
              <AddToCart product={product} />
            ) : (
              <NoStock />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProductCard };
