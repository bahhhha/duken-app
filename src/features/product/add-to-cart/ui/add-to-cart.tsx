import { Product } from "@/shared/interfaces/product";
import { Button } from "@/shared/ui/button";
import { useUnit } from "effector-react";
import { Check, Minus, Pencil, Plus } from "lucide-react";
import { $cart, addProduct, removeProduct, setProductQuantity } from "../model";
import { useState } from "react";

export const AddToCart = ({ product }: { product: Product }) => {
  const [setQuantity, increment, decrement, cart] = useUnit([
    setProductQuantity,
    addProduct,
    removeProduct,
    $cart,
  ]);
  const cartItem = cart.find((item) => item.product.id === product.id);

  const productCount = cartItem ? cartItem.quantity : 0;
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState<number>(productCount);

  const handleQuantityUpdate = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inputValue >= 0) {
      setQuantity({ product, quantity: inputValue });
    }
    setIsEditing(false);
  };

  return productCount >= 1 ? (
    <div
      className="flex items-center px-2 justify-around w-full"
      onClick={(e) => e.stopPropagation()}
    >
      {!isEditing && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            decrement(product);
          }}
          className="cursor-pointer flex justify-center hover:bg-zinc-50 w-6 h-6 rounded-full items-center duration-75"
        >
          <Minus size={16} />
        </button>
      )}
      <div className="relative w-2/3 overflow-hidden flex justify-center items-center">
        {isEditing ? (
          <input
            min={0}
            value={inputValue}
            onChange={(e) => setInputValue(Number(e.target.value) ?? 0)}
            onClick={(e) => e.stopPropagation()}
            autoFocus
            className="w-full text-md outline-none text-center"
          />
        ) : (
          <span className="text-sm font-semibold">{productCount}</span>
        )}
      </div>
      {!isEditing && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            increment(product);
          }}
          className="cursor-pointer flex justify-center hover:bg-zinc-50 w-6 h-6 rounded-full items-center duration-75"
        >
          <Plus size={16} />
        </button>
      )}
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (isEditing) {
            handleQuantityUpdate(e);
          } else {
            setInputValue(productCount);
            setIsEditing(true);
          }
        }}
        className="cursor-pointer flex justify-center hover:bg-zinc-50 w-6 h-6 rounded-full items-center duration-75"
      >
        {isEditing ? <Check size={16} /> : <Pencil size={12} />}
      </div>
    </div>
  ) : (
    <div className="w-full" onClick={(e) => e.stopPropagation()}>
      <Button
        type="primary"
        onClick={(e) => {
          e.stopPropagation();
          increment(product);
        }}
        icon={<Plus size={16} />}
      >
        В корзину
      </Button>
    </div>
  );
};
