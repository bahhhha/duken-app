import { CheckoutButton } from "@/entities/checkout/checkout-button";
import { CartDrawer } from "@/widgets/cart/cart-drawer";
import GoBackButton from "@/widgets/go-back-button/go-back-button";
import Image from "next/image";

const Header: React.FC = () => {
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
            <span className="text-zinc-400 text-xs mt-1 font-semibold">
              DUKEN
            </span>
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
