import { CheckoutButton } from "@/entities/checkout/checkout-button";
import { $details } from "@/features/get-products/model";
import { CartDrawer } from "@/widgets/cart/cart-drawer";
import GoBackButton from "@/widgets/go-back-button/go-back-button";
import { useUnit } from "effector-react";
import { X } from "lucide-react";
import Image from "next/image";

const Header: React.FC = () => {
  const businessInfo = useUnit($details);
  return (
    <div className="w-full">
      <header className="sticky top-0 z-[50] w-screen flex items-center p-4 bg-white">
        <div className="hidden lg:flex lg:flex-1">
          <GoBackButton />
        </div>

        <div className="flex-1 lg:flex-none flex justify-center">
          <div className="flex items-center gap-2">
            <Image
              src="/logo-bw.png"
              alt="DukenApp"
              className="opacity-40"
              width={60}
              height={60}
            />
            <div className="flex items-center gap-1 text-zinc-400 text-xs mt-1 font-semibold">
              <span>DUKEN</span>
              {businessInfo?.name && (
                <div className="flex items-center gap-1">
                  <X size={12} strokeWidth={2.2} />
                  <span>{businessInfo.name.toLocaleUpperCase()}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:flex-1 lg:flex lg:justify-end mr-4">
          <CheckoutButton />
        </div>
      </header>

      <CartDrawer />
    </div>
  );
};

export default Header;
