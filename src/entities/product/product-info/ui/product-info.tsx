import { Product } from "@/shared/interfaces/product";
import Image from "next/image";
import { Chip } from "@/shared/ui/chip";
import { AddToCart } from "@/features/product/add-to-cart/ui/add-to-cart";
import { Tag, Typography } from "antd";
import { useState } from "react";

export interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const tags = [
    { key: "category", value: product.category },
    { key: "flavor", value: product.flavor },
    { key: "weight", value: product.weight },
    { key: "country", value: product.production },
  ];

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-2">
          <div className="w-full max-w-md aspect-square relative">
            <Image
              src={product.photos[selectedImageIndex]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain rounded-lg"
              priority
            />
          </div>

          {product.photos.length > 1 && (
            <div className="flex gap-2 overflow-x-auto w-full max-w-md px-6">
              {product.photos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`
                    relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden 
                    transition-all duration-200
                    ${
                      selectedImageIndex === index
                        ? "border-2 border-blue-500"
                        : "border border-gray-200 opacity-70 hover:opacity-100"
                    }
                  `}
                >
                  <Image
                    src={photo}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    sizes="80px"
                    className="object-contain p-1"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>

          <div>
            <Typography.Text strong className="text-base">
              Описание
            </Typography.Text>
            <p className="text-zinc-600 text-sm md:text-base">
              {product.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Tag key={index} className="py-1 px-2 text-xs">
                {tag.value.toUpperCase()}
              </Tag>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Chip>{product.retailPrice}₸</Chip>
            <AddToCart product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};
