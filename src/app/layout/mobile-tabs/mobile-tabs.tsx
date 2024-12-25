"use client";

import { Tabs } from "antd";
import Link from "next/link";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import { useStoreMap } from "effector-react";
import { $cart } from "@/features/product/add-to-cart/model";
import { useTheme } from "@/shared/hooks/useTheme";

const MobileTabs: React.FC = () => {
  const pathname = usePathname();
  const cartCount = useStoreMap($cart, (cart) =>
    cart.reduce((total, item) => total + item.quantity, 0)
  );
  const theme = useTheme();
  const tabItems = [
    {
      key: "/catalogue",
      icon: <ShoppingBag size={20} />,
      label: "Каталог",
    },
    {
      key: "/cart",
      icon: (
        <div className="relative">
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <div
              className="absolute -top-1 -right-2 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
              style={{ backgroundColor: theme?.primaryColor }}
            >
              {cartCount}
            </div>
          )}
        </div>
      ),
      label: "Корзина",
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-md">
      <Tabs
        defaultActiveKey={pathname}
        activeKey={pathname}
        centered
        tabBarStyle={{ marginBottom: 0 }}
        items={tabItems.map((item) => ({
          key: item.key,
          label: (
            <Link href={item.key}>
              <div className="flex flex-col items-center justify-center">
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
              </div>
            </Link>
          ),
        }))}
        className="w-full"
      />
    </div>
  );
};

export default MobileTabs;
