import { Product } from "@/shared/interfaces/product";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardMiniProps {
  product: Product;
}

export const ProductCardMini: React.FC<ProductCardMiniProps> = ({
  product,
}) => {
  const router = useRouter();
  const onClick = () => router.push(`/catalogue/${product.id}`);
  return (
    <div
      onClick={onClick}
      className="drop-shadow-md rounded-lg bg-white duration-150 cursor-pointer hover:bg-zinc-100 w-[11rem] md:w-[12rem] h-[14rem]"
    >
      <div className="flex h-full w-full flex-col justify-between py-2">
        <div className="w-full h-36 relative">
          <Image
            src={product.photos[0]}
            alt={product.name}
            fill
            className="rounded-md object-contain"
          />
        </div>
        <div className="flex items-center w-full p-4 h-16 justify-between">
          <p className="text-sm font-semibold">{product.name}</p>
          <div className="w-4">
            <ChevronRight size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};
