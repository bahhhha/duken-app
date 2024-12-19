import { ProductCardRow } from "@/entities/product/product-card-row";
import { $cart, $cartTotal } from "@/features/product/add-to-cart/model";
import { Button } from "@/shared/ui/button";
import { Divider, Drawer } from "antd";
import { useUnit } from "effector-react";
import { closeCartDrawer } from "../model";

const CartDrawer: React.FC = () => {
  const [cart, total, close] = useUnit([$cart, $cartTotal, closeCartDrawer]);
  return (
    <Drawer
      title="Корзина"
      placement="right"
      onClose={close}
      open={true}
      width={400}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex flex-col gap-2">
            {cart.map((cartItem, index) => (
              <div key={index}>
                <ProductCardRow
                  key={cartItem.product.id}
                  product={cartItem.product}
                />
                {index !== cart.length - 1 && <Divider />}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col w-full gap-2">
          <div className="flex w-full mb-4 justify-between text-base font-semibold">
            <span>Итого:</span>
            <span>{total}</span>
          </div>
          <Button type="primary">Оплатить</Button>
          <Button type="text">Перейти в корзину</Button>
        </div>
      </div>
    </Drawer>
  );
};

export { CartDrawer };
