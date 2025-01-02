import { useUnit } from "effector-react";

import { useState } from "react";
import { setSearchQuery } from "../model";
import { Input } from "@/shared/ui/input";
import { Search } from "lucide-react";

export const SearchProducts: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const updateSearchQuery = useUnit(setSearchQuery);

  return (
    <div className="w-64">
      <Input
        label=""
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateSearchQuery(query);
          }
        }}
        onClear={() => {
          setQuery("");
          updateSearchQuery("");
        }}
        placeholder="Поиск по названию"
        suffix={<Search size={12} className="text-gray-400" />}
        allowClear
        className="max-w-md"
      />
    </div>
  );
};
