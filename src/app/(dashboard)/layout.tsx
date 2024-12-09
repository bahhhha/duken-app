"use client";

import { ConfigProvider } from "antd";

import { useTheme } from "@/shared/hooks/useTheme";
import Sidebar from "../layout/sidebar/sidebar";
import Header from "../layout/header/header";

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
        <Sidebar />
        <div className="flex-1 flex flex-col lg:ml-64">
          <Header />
          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
    </ConfigProvider>
  );
}
