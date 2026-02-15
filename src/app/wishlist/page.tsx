"use client";

import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import ProductGrid from "@/components/products/ProductGrid";

export default function WishlistPage() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
        <svg
          className="mx-auto h-16 w-16 text-bamboo-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
        <h1 className="mt-4 font-serif text-2xl font-bold text-bamboo-800">
          Your wishlist is empty
        </h1>
        <p className="mt-2 text-bamboo-600">
          Save products you love to your wishlist.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-md bg-forest-500 px-6 py-3 font-medium text-white transition-colors hover:bg-forest-600"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav className="mb-6 text-sm text-bamboo-500">
        <a href="/" className="hover:text-forest-500">Home</a>
        <span className="mx-2">/</span>
        <span className="text-bamboo-700">Wishlist</span>
      </nav>

      <h1 className="font-serif text-3xl font-bold text-bamboo-800">
        My Wishlist
      </h1>
      <p className="mt-2 text-bamboo-600">
        {items.length} {items.length === 1 ? "item" : "items"} saved
      </p>

      <div className="mt-8">
        <ProductGrid products={items} />
      </div>
    </div>
  );
}
