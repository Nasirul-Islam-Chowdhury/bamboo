"use client";

import { useState } from "react";

const categoryColors: Record<string, string> = {
  "bamboo-tubes": "#7dba63",
  mouthpieces: "#c9a96e",
  "cork-joints": "#b5903a",
  "tuning-slides": "#96751f",
  accessories: "#4d9a33",
  finishing: "#e0cba7",
};

const categoryIcons: Record<string, string> = {
  "bamboo-tubes": "M12 2 C12 2, 10 8, 10 14 C10 18, 11 22, 12 22 C13 22, 14 18, 14 14 C14 8, 12 2, 12 2 Z",
  mouthpieces: "M6 12 Q6 6, 12 6 Q18 6, 18 12 L18 16 Q18 18, 12 18 Q6 18, 6 16 Z",
  "cork-joints": "M8 6 L16 6 L16 18 L8 18 Z M6 8 L8 8 M6 16 L8 16 M16 8 L18 8 M16 16 L18 16",
  "tuning-slides": "M4 10 L20 10 L20 14 L4 14 Z M8 8 L8 16 M16 8 L16 16",
  accessories: "M12 2 L22 12 L12 22 L2 12 Z M12 8 L12 16 M8 12 L16 12",
  finishing: "M12 3 C12 3, 6 8, 6 14 C6 18, 9 21, 12 21 C15 21, 18 18, 18 14 C18 8, 12 3, 12 3 Z",
};

interface ProductImageProps {
  src: string;
  alt: string;
  category: string;
  className?: string;
}

export default function ProductImage({ alt, category, className }: ProductImageProps) {
  const [error] = useState(true); // Always use placeholder for now
  const color = categoryColors[category] || "#96751f";
  const icon = categoryIcons[category] || categoryIcons["bamboo-tubes"];

  if (error) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ backgroundColor: `${color}15` }}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-16 w-16"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={icon} />
        </svg>
      </div>
    );
  }

  return null;
}
