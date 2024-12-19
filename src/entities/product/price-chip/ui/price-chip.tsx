import { Chip } from "@/shared/ui/chip";

interface PriceChipProps {
  price: number;
  discountedPrice?: number | null;
}

const PriceChip = ({ price, discountedPrice }: PriceChipProps) => {
  return (
    <Chip>
      {discountedPrice ? (
        <div className="flex items-center">
          <span className="line-through text-gray-500 text-sm mr-1">
            {price}
          </span>
          <span className="text-base font-semibold">{discountedPrice}₸</span>
        </div>
      ) : (
        <span className="text-base font-semibold">{price}₸</span>
      )}
    </Chip>
  );
};

export { PriceChip };
