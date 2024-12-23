"use client";

import { ConfigProvider } from "antd";
import { useTheme } from "@/shared/hooks/useTheme";
import Header from "../layout/header/header";
import MobileTabs from "../layout/mobile-tabs/mobile-tabs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeConfig = useTheme();

  if (!themeConfig) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: themeConfig.primaryColor,
          colorTextSecondary: themeConfig.secondaryColor,
          colorLink: themeConfig.primaryColor,
          fontFamily: "Montserrat, sans-serif",
        },
      }}
    >
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <div className="sticky top-0 z-50 bg-white border-b w-full">
          <Header />
        </div>

        <main className="flex-grow w-full overflow-hidden mb-16">
          {children}
        </main>

        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white w-full border-t">
          <MobileTabs />
        </div>
      </div>
    </ConfigProvider>
  );
}
