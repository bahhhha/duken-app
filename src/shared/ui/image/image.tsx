"use client";
import { useState } from "react";
import { default as NextImage } from "next/image";
import { Modal } from "../modal";

interface ImageProps {
  src: string;
  alt: string;
  sizes?: string;
  containerClassName?: string;
  imageClassName?: string;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  imageClassName,
  containerClassName,
  sizes,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        onClick={openModal}
        className={`relative w-36 h-36 m-auto cursor-pointer ${containerClassName}`}
      >
        <NextImage
          src={src}
          alt={alt}
          sizes={sizes}
          fill
          className={`rounded-lg object-contain ${imageClassName}`}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={alt}>
        <div className="w-full h-[70vh] relative">
          <NextImage
            src={src}
            alt={alt}
            fill
            sizes="100vw"
            className="object-contain w-full h-full"
          />
        </div>
      </Modal>
    </>
  );
};

export { Image };
