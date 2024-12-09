"use client";
import { $details } from "@/features/get-products/model";
import { useUnit } from "effector-react";
import Image from "next/image";

const BusinessInfo: React.FC = () => {
  const businessDetails = useUnit($details);
  return (
    <div
      className="relative w-full h-48 overflow-hidden"
      role="button"
      tabIndex={0}
    >
      <div className="absolute inset-0 z-0">
        {businessDetails?.backgroundSrc && (
          <Image
            src={businessDetails.backgroundSrc}
            alt="Business Background"
            fill
            className="object-cover opacity-90"
          />
        )}
      </div>
      <div className="absolute inset-0 bg-black/30 z-[5]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10 "></div>
      <div className="relative z-20 p-4 h-full flex flex-col justify-end text-white">
        <div className="flex items-center mb-2">
          <div className="w-12 h-12 bg-white rounded-full mr-3 overflow-hidden">
            {businessDetails?.logoSrc && (
              <Image
                src={businessDetails.logoSrc}
                alt={`${businessDetails.name} Logo`}
                width={48}
                height={48}
                className="object-cover"
              />
            )}
          </div>
          <h2 className="text-xl font-bold">{businessDetails?.name}</h2>
        </div>
        <p className="text-xs">{businessDetails?.description}</p>
      </div>
    </div>
  );
};

export default BusinessInfo;
