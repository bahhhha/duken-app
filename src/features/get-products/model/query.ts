import { BusinessDetails } from "@/shared/interfaces/businessDetails";
import { Product } from "@/shared/interfaces/product";
import { Theme } from "@/shared/interfaces/theme";
import { createQuery } from "@farfetched/core";

interface ResponseData {
  details: BusinessDetails;
  products: Product[];
  theme: Theme;
}

const fetchGetProducts = createQuery({
  name: "getProducts",
  async handler() {
    const response = await fetch("/api/get-sheets");
    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }
    const { details, products, theme }: ResponseData = await response.json();

    if (typeof window !== "undefined") {
      localStorage.setItem("themeConfig", JSON.stringify(theme));
    }

    return { details, products, theme };
  },
});

export { fetchGetProducts };
