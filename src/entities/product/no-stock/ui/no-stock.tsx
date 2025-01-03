import { Frown } from "lucide-react";

export const NoStock = () => {
  return (
    <div className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-zinc-100 rounded-md text-zinc-500">
      <Frown size={16} strokeWidth={2.2} />
      <span className="text-sm font-medium">Нет в наличии</span>
    </div>
  );
};
