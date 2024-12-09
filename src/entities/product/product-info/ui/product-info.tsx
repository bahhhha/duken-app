import { Product } from "@/shared/interfaces/product";
import Image from "next/image";
import { Chip } from "@/shared/ui/chip";
import { AddToCart } from "@/features/product/add-to-cart/ui/add-to-cart";
import { Tag, Typography } from "antd";

export interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const tags = [
    { key: "category", value: product.category },
    { key: "flavor", value: product.flavor },
    { key: "weight", value: product.weight },
    { key: "country", value: product.production },
  ];

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md aspect-square relative">
            <Image
              src={product.photo}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain rounded-lg"
              priority
            />
          </div>
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
            <Chip>{product.retailPrice}$</Chip>
            <AddToCart product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};
