import "./globals.css";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata = {
  title: "DukenApp",
  description:
    "DukenApp — это платформа, где владельцы бизнеса могут загружать свои товары через Excel или Google Sheets. Здесь клиенты могут просматривать каталог товаров и покупать всё, что нужно. Простота и удобство для всех!",
  keywords:
    "купить, дешево, каталог, оптом, джусболлы, juiceballs, джус-боллс, джус-боллы, онлайн покупки, товары, DukenApp, каталог товаров, интернет-магазин, выгрузка товаров",
  openGraph: {
    title: "DukenApp - Удобный каталог джусболлов",
    description:
      "DukenApp — это платформа, где бизнесы загружают свои товары, а клиенты могут их покупать. Открывайте каталог и заказывайте прямо сейчас!",
    url: "https://dukenapp-eight.vercel.app/catalogue",
    siteName: "DukenApp",
    // images: [
    //   {
    //     url: "/images/default-og-image.jpg",
    //     width: 800,
    //     height: 600,
    //     alt: "DukenApp - Удобный каталог товаров",
    //   },
    // ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DukenApp - Удобный каталог джусболлов",
    description:
      "Платформа для клиентов бизнеса: покупайте товары онлайн в удобном каталоге DukenApp.",
    images: ["/images/default-og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
