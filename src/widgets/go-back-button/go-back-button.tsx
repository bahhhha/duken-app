"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/shared/ui/button";

const GoBackButton: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isRootPage = pathname === "/" || pathname.split("/").length <= 2;

  const handleGoBack = () => {
    const pathSegments = pathname.split("/").filter(Boolean);
    if (pathSegments.length > 1) {
      const parentPath = "/" + pathSegments.slice(0, -1).join("/");
      router.push(parentPath);
    } else {
      router.back();
    }
  };

  return (
    <div className="w-24">
      <Button
        type="text"
        disabled={isRootPage}
        onClick={handleGoBack}
        icon={<ChevronLeft size={16} />}
        aria-label="Go back"
      >
        <span>Назад</span>
      </Button>
    </div>
  );
};

export default GoBackButton;
