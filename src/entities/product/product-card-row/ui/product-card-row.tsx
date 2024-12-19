import {
  $cart,
  setProductQuantity,
} from "@/features/product/add-to-cart/model";
import { AddToCart } from "@/features/product/add-to-cart/ui/add-to-cart";
import { Product } from "@/shared/interfaces/product";
import { useUnit } from "effector-react";
import Image from "next/image";

interface ProductCardRowProps {
  product: Product;
}

const ProductCardRow = ({ product }: ProductCardRowProps) => {
  const setQuantity = useUnit(setProductQuantity);
  const productInCart = useUnit($cart).find(
    (item) => item.product.id === product.id
  );

  const handleDelete = () => {
    setQuantity({ product, quantity: 0 });
  };

  return (
    <div className="w-full flex items-start h-24 gap-4">
      <div className="w-fit flex">
        <div className="w-24 h-24 relative">
          <Image
            src={product.photos[0]}
            alt={product.name}
            fill
            className="object-contain rounded-md border"
          />
        </div>
      </div>
      <div className="w-1/3 gap-4 flex flex-col h-full">
        <p className="font-bold text-sm">{product.name}</p>
        <AddToCart product={product} />
      </div>
      <div className="w-1/4 flex flex-col justify-between items-end h-full">
        <p className="font-bold">{productInCart?.total ?? 0}₸</p>
        <button
          className="text-red-400 hover:text-red-500 text-sm"
          onClick={handleDelete}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export { ProductCardRow };
