import { CheckoutButton } from "@/entities/checkout/checkout-button";
// import LanguageSelect from "@/features/language-select/ui/language-select";
import GoBackButton from "@/widgets/go-back-button/go-back-button";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between w-full items-center p-4 bg-white border-b px-8">
      <GoBackButton />
      <div className="flex items-center space-x-8">
        {/* <LanguageSelect /> */}
        <CheckoutButton />
      </div>
    </header>
  );
};

export default Header;
