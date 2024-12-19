import BusinessInfo from "../../../entities/business-info/ui/business-info";
import Link from "next/link";
import { Menu, Drawer } from "antd";
import {
  Briefcase,
  Settings,
  ShoppingCart,
  Star,
  // Menu as MenuIcon,
} from "lucide-react";
import { useState } from "react";

const Sidebar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      key: "1",
      icon: <ShoppingCart size={16} />,
      label: (
        <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
          Каталог
        </Link>
      ),
    },
    {
      key: "2",
      icon: <Star size={16} />,
      label: (
        <Link href="/feedbacks" onClick={() => setIsMobileMenuOpen(false)}>
          Отзывы
        </Link>
      ),
    },
    {
      key: "3",
      icon: <Briefcase size={16} />,
      label: (
        <Link href="/company" onClick={() => setIsMobileMenuOpen(false)}>
          О бизнесе
        </Link>
      ),
    },
    {
      key: "4",
      icon: <Settings size={16} />,
      label: (
        <Link href="/settings" onClick={() => setIsMobileMenuOpen(false)}>
          Настройки
        </Link>
      ),
    },
  ];

  const DesktopSidebar = () => (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-md lg:block hidden">
      <BusinessInfo />
      <Menu
        mode="vertical"
        className="p-4 mt-4"
        defaultSelectedKeys={["1"]}
        items={menuItems}
      />
    </div>
  );

  // const MobileMenuTrigger = () => (
  //   <button
  //     onClick={() => setIsMobileMenuOpen(true)}
  //     className="lg:hidden fixed top-5 left-5 z-[100]"
  //   >
  //     <MenuIcon size={24} />
  //   </button>
  // );

  return (
    <>
      <DesktopSidebar />
      {/* <MobileMenuTrigger /> */}

      <Drawer
        title="Меню"
        placement="left"
        onClose={() => setIsMobileMenuOpen(false)}
        open={isMobileMenuOpen}
        width="100%"
        className="lg:hidden"
      >
        <BusinessInfo />
        <Menu
          mode="vertical"
          className="p-4"
          defaultSelectedKeys={["1"]}
          items={menuItems}
        />
      </Drawer>
    </>
  );
};

export default Sidebar;
