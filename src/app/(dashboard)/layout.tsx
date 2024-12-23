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
      <div className="flex min-h-screen flex-col gap-16">
        <Header />

        <main>{children}</main>
        <div className="mt-16">
          <MobileTabs />
        </div>
      </div>
    </ConfigProvider>
  );
}
