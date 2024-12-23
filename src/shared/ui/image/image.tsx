"use client";
import { useState } from "react";
import { default as NextImage } from "next/image";
import { Modal } from "../modal";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageProps {
  imageSrcs: string[];
  alt: string;
  sizes?: string;
  containerClassName?: string;
  imageClassName?: string;
}

const Image: React.FC<ImageProps> = ({
  imageSrcs,
  alt,
  imageClassName,
  containerClassName,
  sizes,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageSrcs.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? imageSrcs.length - 1 : prev - 1
    );
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div
          onClick={openModal}
          className={`relative w-full h-full m-auto cursor-pointer ${containerClassName}`}
        >
          <NextImage
            src={imageSrcs[currentImageIndex]}
            alt={alt}
            sizes={sizes}
            fill
            className={`rounded-lg object-contain ${imageClassName}`}
          />
        </div>

        {imageSrcs.length >= 1 && (
          <div className="flex justify-center gap-2 items-center">
            {imageSrcs.length > 3 && (
              <button
                onClick={previousImage}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            <div className="flex gap-2 overflow-x-auto max-w-[200px] p-1">
              {imageSrcs.map((src, index) => (
                <button
                  key={src}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0 transition-all ${
                    currentImageIndex === index
                      ? "border-2 border-blue-500"
                      : "border border-gray-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <NextImage
                    src={src}
                    alt={`${alt} thumbnail ${index + 1}`}
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </button>
              ))}
            </div>
            {imageSrcs.length > 3 && (
              <button
                onClick={nextImage}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={alt}>
        <div className="relative flex items-center justify-center">
          <div className="w-full h-[70vh] relative">
            <NextImage
              src={imageSrcs[currentImageIndex]}
              alt={alt}
              fill
              sizes="100vw"
              className="object-contain w-full h-full"
            />
          </div>
          {imageSrcs.length > 1 && (
            <>
              <button
                onClick={previousImage}
                className="absolute left-4 p-2 rounded-full bg-white/80 hover:bg-white shadow-md"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 p-2 rounded-full bg-white/80 hover:bg-white shadow-md"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
        {imageSrcs.length > 1 && (
          <div className="flex justify-center gap-2 mt-4 px-4">
            {imageSrcs.map((src, index) => (
              <button
                key={src}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 transition-all ${
                  currentImageIndex === index
                    ? "border-2 border-blue-500"
                    : "border border-gray-200 opacity-70 hover:opacity-100"
                }`}
              >
                <NextImage
                  src={src}
                  alt={`${alt} thumbnail ${index + 1}`}
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </button>
            ))}
          </div>
        )}
      </Modal>
    </>
  );
};

export { Image };
