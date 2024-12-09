import { ProductCardMini } from "@/entities/product/product-card-mini/ui/product-card-mini";
import { Product } from "@/shared/interfaces/product";

interface TryAlsoProps {
  products: Product[];
}

export const TryAlso: React.FC<TryAlsoProps> = ({ products }) => {
  return (
    <div className="container mx-auto px-4">
      <div className="border-t pt-4">
        <h2 className="text-center font-bold text-lg mb-4">Попробуйте также</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 sm:gap-4 justify-center">
          {products.map((product) => (
            <ProductCardMini key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
