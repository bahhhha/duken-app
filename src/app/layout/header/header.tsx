import { CheckoutButton } from "@/entities/checkout/checkout-button";
import { CartDrawer } from "@/widgets/cart/cart-drawer";
import GoBackButton from "@/widgets/go-back-button/go-back-button";

const Header: React.FC = () => {
  return (
    <div>
      <header
        style={{
          boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.05)",
        }}
        className="fixed top-0 left-0 right-0 z-[50] flex justify-between items-center p-4 bg-white border-b px-8 lg:ml-64"
      >
        <GoBackButton />
        <div className="flex items-center space-x-8">
          <CheckoutButton />
        </div>
      </header>
      <CartDrawer />
    </div>
  );
};

export default Header;
