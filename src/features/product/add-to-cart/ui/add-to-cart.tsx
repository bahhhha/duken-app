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
    if (inputValue >= 0 && inputValue <= product.quantity) {
      setQuantity({ product, quantity: inputValue });
    }
    setIsEditing(false);
  };

  const isMaxQuantityReached = productCount >= product.quantity;

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
            type="number"
            min={0}
            max={product.quantity}
            value={inputValue}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value <= product.quantity) {
                setInputValue(value);
              }
            }}
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
            if (!isMaxQuantityReached) {
              increment(product);
            }
          }}
          disabled={isMaxQuantityReached}
          className={`cursor-pointer flex justify-center w-6 h-6 rounded-full items-center duration-75 ${
            isMaxQuantityReached
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-zinc-50"
          }`}
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
        disabled={product.quantity === 0}
        icon={<Plus size={16} />}
      >
        {product.quantity === 0 ? "Нет в наличии" : "В корзину"}
      </Button>
    </div>
  );
};
