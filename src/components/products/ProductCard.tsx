"use client";

import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductImage from "./ProductImage";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { addToast } = useToast();
  const { toggleItem, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    addToast(`${product.name} added to cart`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
    addToast(wishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-bamboo-200 bg-white transition-shadow hover:shadow-md"
    >
      {/* Wishlist heart */}
      <button
        onClick={handleToggleWishlist}
        className="absolute right-2 top-2 z-10 rounded-full bg-white/80 p-1.5 shadow-sm transition-colors hover:bg-white"
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <svg
          className={`h-5 w-5 ${wishlisted ? "fill-red-500 text-red-500" : "text-bamboo-400"}`}
          viewBox="0 0 24 24"
          fill={wishlisted ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </button>

      <div className="aspect-square overflow-hidden bg-bamboo-50">
        <ProductImage
          src={product.image}
          alt={product.name}
          category={product.categoryId}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-bamboo-500">
          {product.categoryId.replace(/-/g, " ")}
        </p>
        <h3 className="mt-1 font-medium text-bamboo-800 line-clamp-2">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-bamboo-600 line-clamp-2">{product.description}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-lg font-bold text-bamboo-800">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={handleAddToCart}
            className="rounded-md bg-forest-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-forest-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
