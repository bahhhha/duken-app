"use client";

import { Tabs } from "antd";
import Link from "next/link";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";

const MobileTabs: React.FC = () => {
  const pathname = usePathname();

  const tabItems = [
    {
      key: "/catalogue",
      icon: <ShoppingCart size={20} />,
      label: "Каталог",
    },
    {
      key: "/checkout",
      icon: <ShoppingBag size={20} />,
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
              <div className="flex flex-col items-center">
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
              </div>
            </Link>
          ),
        }))}
      />
    </div>
  );
};

export default MobileTabs;
