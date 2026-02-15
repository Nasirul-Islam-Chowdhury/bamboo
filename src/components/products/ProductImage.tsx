"use client";

import Image from "next/image";

interface ProductImageProps {
  src: string;
  alt: string;
  category: string;
  className?: string;
}

export default function ProductImage({ src, alt, className }: ProductImageProps) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </div>
  );
}
