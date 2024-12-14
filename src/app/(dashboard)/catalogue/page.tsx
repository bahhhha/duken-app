"use client";
import { ProductCard } from "@/entities/product/product-card";
import { $products, CatalogueGate } from "@/features/get-products/model";
import { useGate, useUnit } from "effector-react";
import Head from "next/head";

export default function Catalogue() {
  const products = useUnit($products);
  useGate(CatalogueGate);

  return (
    <div>
      <Head>
        <title>Каталог продуктов | DukenApp</title>
        <meta
          name="description"
          content="Изучите наш каталог джусболлов. Высокое качество, широкий выбор и доступные цены."
        />
        <meta
          name="keywords"
          content="каталог, продукты, покупки, ecommerce, джусболлы, джус-боллы, juiceballs, DukenApp, купить, товары, оптом"
        />
        <meta property="og:title" content="Каталог продуктов | DukenApp" />
        <meta
          property="og:description"
          content="Изучите наш каталог джусболлов, чтобы найти то, что вам нужно. Высокое качество и лучшие цены."
        />
        <meta property="og:image" content="/images/catalogue-preview.jpg" />
        <meta
          property="og:url"
          content="https://dukenapp-eight.vercel.app/catalogue"
        />
        <link
          rel="canonical"
          href="https://dukenapp-eight.vercel.app/catalogue"
        />
      </Head>
      <div
        className="
          flex flex-wrap gap-4
        "
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
