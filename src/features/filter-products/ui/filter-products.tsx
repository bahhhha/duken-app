import { Select, Slider, Radio, Space } from "antd";
import {
  $filterParams,
  $filteredProducts,
  setSortField,
  setSortDirection,
  setPriceRange,
  toggleRecommendedFilter,
  toggleHotPriceFilter,
  toggleFavoritesFilter,
  setSelectedCategory,
} from "../model";
import { useUnit } from "effector-react";
import { $products } from "@/features/get-products/model";
import { getUniqueCategories } from "@/shared/utils/applyFilters";
import { useMemo } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useTheme } from "@/shared/hooks/useTheme";
import { Tag } from "@/shared/ui/tag";

const { Option } = Select;

export const ProductFilter: React.FC = () => {
  const products = useUnit($products);
  const filterParams = useUnit($filterParams);
  const filteredProducts = useUnit($filteredProducts);
  const categories = useMemo(() => getUniqueCategories(products), [products]);
  const theme = useTheme();
  const getMinMaxPrice = () => {
    const prices = products.map((product) => Number(product.price));
    return [Math.min(...prices), Math.max(...prices)];
  };

  return (
    <div className="p-4 mt-2">
      <Space direction="vertical" className="w-full" size="large">
        <Space>
          <span className="text-xs">Сортировка по: </span>
          <Select
            value={filterParams.sortField}
            className="w-24"
            size="small"
            onChange={setSortField}
          >
            <Option value="name">Имени</Option>
            <Option value="price">Цене</Option>
          </Select>
          <div className="flex gap-2 items-center">
            <ArrowDown
              size={16}
              onClick={() => setSortDirection("desc")}
              className="cursor-pointer"
              style={{
                color:
                  filterParams.sortDirection === "desc"
                    ? theme?.primaryColor
                    : "black",
              }}
            />

            <ArrowUp
              size={16}
              onClick={() => setSortDirection("asc")}
              className="cursor-pointer"
              style={{
                color:
                  filterParams.sortDirection === "asc"
                    ? theme?.primaryColor
                    : "black",
              }}
            />
          </div>
        </Space>

        <div>
          <span className="mb-2 block">
            Цена: {filterParams.priceRange[0]} - {filterParams.priceRange[1]}
          </span>
          <Slider
            range
            className="w-64"
            min={getMinMaxPrice()[0]}
            max={getMinMaxPrice()[1]}
            value={filterParams.priceRange}
            onChange={(value: number[]) =>
              setPriceRange(value as [number, number])
            }
          />
        </div>

        <Space wrap>
          <Tag
            checked={filterParams.isRecommendedActive}
            onClick={() => toggleRecommendedFilter()}
          >
            Рекомендовано
          </Tag>
          <Tag
            checked={filterParams.isHotPriceActive}
            onClick={() => toggleHotPriceFilter()}
          >
            Со скидкой
          </Tag>
          <Tag
            checked={filterParams.isFavoritesActive}
            onClick={() => toggleFavoritesFilter()}
          >
            Избранное
          </Tag>
        </Space>

        <div>
          <span className="mb-2 block">Категории:</span>
          <Radio.Group
            size="small"
            value={filterParams.selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <Space wrap>
              {categories.map((category) => (
                <Radio.Button key={category} value={category}>
                  {category}
                </Radio.Button>
              ))}
            </Space>
          </Radio.Group>
        </div>

        <div>
          Показано{" "}
          <span
            className="font-bold"
            style={{
              color: theme?.primaryColor,
            }}
          >
            {filteredProducts.length}
          </span>{" "}
          продуктов
        </div>
      </Space>
    </div>
  );
};
