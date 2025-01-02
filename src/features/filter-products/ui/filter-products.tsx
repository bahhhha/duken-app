import { Select, Slider, Space, Card, InputNumber } from "antd";
import {
  $filterParams,
  setSortField,
  setSortDirection,
  setPriceRange,
  toggleRecommendedFilter,
  toggleHotPriceFilter,
  toggleFavoritesFilter,
  setCategory1,
  setCategory2,
  setCategory3,
  setCategory4,
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
  const theme = useTheme();

  const categories1 = useMemo(
    () => getUniqueCategories(products, "category1"),
    [products]
  );
  const categories2 = useMemo(
    () => getUniqueCategories(products, "category2"),
    [products]
  );
  const categories3 = useMemo(
    () => getUniqueCategories(products, "category3"),
    [products]
  );
  const categories4 = useMemo(
    () => getUniqueCategories(products, "category4"),
    [products]
  );

  return (
    <Card className="mt-2">
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
              strokeWidth={3}
              style={{
                color:
                  filterParams.sortDirection === "desc"
                    ? theme?.primaryColor
                    : "rgba(0,0,0,0.3)",
              }}
            />
            <ArrowUp
              size={16}
              onClick={() => setSortDirection("asc")}
              className="cursor-pointer"
              strokeWidth={3}
              style={{
                color:
                  filterParams.sortDirection === "asc"
                    ? theme?.primaryColor
                    : "rgba(0,0,0,0.3)",
              }}
            />
          </div>
        </Space>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span>Цена: </span>
            <InputNumber
              type="number"
              value={filterParams.priceRange[0]}
              size="small"
              onChange={(value) =>
                setPriceRange([Number(value), filterParams.priceRange[1]])
              }
            />
            <span className="text-xs">-</span>
            <InputNumber
              type="number"
              size="small"
              value={filterParams.priceRange[1]}
              onChange={(value) =>
                setPriceRange([filterParams.priceRange[0], Number(value)])
              }
            />
          </div>
          <Slider
            range
            className="w-64"
            min={Math.min(...products.map((p) => Number(p.price)))}
            max={Math.max(...products.map((p) => Number(p.price)))}
            value={filterParams.priceRange}
            onChange={(value: number[]) =>
              setPriceRange(value as [number, number])
            }
          />
        </div>

        <Space wrap>
          <Tag
            checked={filterParams.isRecommendedActive}
            onClick={toggleRecommendedFilter}
          >
            Рекомендовано
          </Tag>
          <Tag
            checked={filterParams.isHotPriceActive}
            onClick={toggleHotPriceFilter}
          >
            Со скидкой
          </Tag>
          <Tag
            checked={filterParams.isFavoritesActive}
            onClick={toggleFavoritesFilter}
          >
            Избранное
          </Tag>
        </Space>

        <Space direction="vertical" className="w-full space-y-4">
          <Space wrap>
            {categories1.map((category) => (
              <Tag
                key={category}
                checked={filterParams.category1 === category}
                onClick={() =>
                  filterParams.category1 === category
                    ? setCategory1("")
                    : setCategory1(category)
                }
              >
                {category}
              </Tag>
            ))}
          </Space>

          <Space wrap>
            {categories2.map((category) => (
              <Tag
                key={category}
                checked={filterParams.category2 === category}
                onClick={() =>
                  filterParams.category2 === category
                    ? setCategory2("")
                    : setCategory2(category)
                }
              >
                {category}
              </Tag>
            ))}
          </Space>

          <Space wrap>
            {categories3.map((category) => (
              <Tag
                key={category}
                checked={filterParams.category3 === category}
                onClick={() =>
                  filterParams.category3 === category
                    ? setCategory3("")
                    : setCategory3(category)
                }
              >
                {category}
              </Tag>
            ))}
          </Space>

          <Space wrap>
            {categories4.map((category) => (
              <Tag
                key={category}
                checked={filterParams.category4 === category}
                onClick={() =>
                  filterParams.category4 === category
                    ? setCategory4("")
                    : setCategory4(category)
                }
              >
                {category}
              </Tag>
            ))}
          </Space>
        </Space>
      </Space>
    </Card>
  );
};
