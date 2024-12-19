"use client";

import { ConfigProvider } from "antd";
import { useTheme } from "@/shared/hooks/useTheme";
import Sidebar from "../layout/sidebar/sidebar";
import Header from "../layout/header/header";
import MobileTabs from "../layout/mobile-tabs/mobile-tabs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeConfig = useTheme();

  if (!themeConfig) {
    return <div>Loading...</div>;
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
      <div className="flex min-h-screen">
        <aside className="hidden lg:block lg:w-64 bg-gray-200 h-screen fixed left-0 top-0">
          <Sidebar />
        </aside>
        <div className="flex-1 lg:ml-64 flex flex-col w-full">
          <Header />

          <main className="flex-1 pt-20 p-4 pb-20 lg:pb-4">{children}</main>

          <MobileTabs />
        </div>
      </div>
    </ConfigProvider>
  );
}
