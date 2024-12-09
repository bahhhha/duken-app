"use client";

import React from "react";
import Image from "next/image";
import { Modal } from "@/shared/ui/modal";
import { useUnit } from "effector-react";
import {
  $selectedProduct,
  selectProduct,
} from "../../../../features/product/model";
import { Chip } from "@/shared/ui/chip";
import { Tag } from "@/shared/ui/tag/tag";
import { AddToCart } from "@/features/product/add-to-cart/ui/add-to-cart";

const ProductModal: React.FC = () => {
  const [product, setProduct] = useUnit([$selectedProduct, selectProduct]);
  if (!product) return null;
  const tags = [
    { key: "category", value: product.category },
    { key: "flavor", value: product.flavor },
    { key: "weight", value: product.weight },
  ];
  const handleClose = () => setProduct(null);
  return (
    <Modal
      title="Купить продукт"
      isOpen={product != null}
      onClose={handleClose}
    >
      <div className="flex justify-between h-80">
        <div className="w-[20rem] h-full flex items-center justify-center">
          <div className="w-80 h-80 flex items-center justify-center rounded-lg">
            <div className="w-72 h-72 relative flex items-center justify-center">
              <Image
                src={product.photo}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center flex-col w-full h-full items-center rounded-lg">
          <div className="flex flex-col w-72">
            <p className="font-bold text-xl my-2">{product.name}</p>
            <div className="flex flex-col gap-1 text-sm mt-2">
              <p color="red">Описание</p>
              <p className="text-zinc-600 font-medium">{product.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <Tag key={tag.key}>{tag.value}</Tag>
              ))}
            </div>
            <div className="flex gap-1 items-center mt-8 w-full">
              <div className="w-1/2">
                <Chip>{product.retailPrice}$</Chip>
              </div>
              <div className="w-1/2">
                <AddToCart product={product} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export { ProductModal };
