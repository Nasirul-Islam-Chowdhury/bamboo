"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductImage from "./ProductImage";
import QuantitySelector from "./QuantitySelector";

export default function ProductDetail({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { addToast } = useToast();
  const { toggleItem, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);
  const router = useRouter();

  const handleAddToCart = () => {
    addItem(product, quantity);
    addToast(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    router.push("/checkout");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-bamboo-500">
        <a href="/" className="hover:text-forest-500">Home</a>
        <span className="mx-2">/</span>
        <a href="/products" className="hover:text-forest-500">Products</a>
        <span className="mx-2">/</span>
        <span className="text-bamboo-700">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Image */}
        <div className="aspect-square overflow-hidden rounded-lg bg-bamboo-100">
          <ProductImage
            src={product.image}
            alt={product.name}
            category={product.categoryId}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <p className="text-sm font-medium uppercase tracking-wider text-bamboo-500">
            {product.categoryId.replace(/-/g, " ")}
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-bamboo-800">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl font-bold text-bamboo-800">
            {formatPrice(product.price)}
          </p>

          {/* Stock */}
          <div className="mt-3 flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                product.inStock ? "bg-forest-400" : "bg-red-400"
              }`}
            />
            <span className="text-sm text-bamboo-600">
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <p className="mt-4 text-bamboo-600">{product.description}</p>

          {/* Specifications */}
          {product.specifications.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-bamboo-800">
                Specifications
              </h3>
              <dl className="mt-2 divide-y divide-bamboo-100">
                {product.specifications.map((spec) => (
                  <div key={spec.label} className="flex py-2 text-sm">
                    <dt className="w-1/3 font-medium text-bamboo-600">{spec.label}</dt>
                    <dd className="w-2/3 text-bamboo-800">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex items-center gap-4">
            <QuantitySelector quantity={quantity} onChange={setQuantity} />
            <button
              onClick={() => {
                toggleItem(product);
                addToast(wishlisted ? "Removed from wishlist" : "Added to wishlist");
              }}
              className="flex items-center gap-1.5 rounded-md border border-bamboo-200 px-3 py-2 text-sm text-bamboo-600 transition-colors hover:bg-bamboo-50"
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
              {wishlisted ? "Saved" : "Save"}
            </button>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 rounded-md border-2 border-forest-500 px-6 py-3 font-medium text-forest-500 transition-colors hover:bg-forest-50 disabled:opacity-50"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              disabled={!product.inStock}
              className="flex-1 rounded-md bg-forest-500 px-6 py-3 font-medium text-white transition-colors hover:bg-forest-600 disabled:opacity-50"
            >
              Buy Now
            </button>
          </div>

          {/* Long description */}
          {product.longDescription && (
            <div className="mt-8 border-t border-bamboo-200 pt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-bamboo-800">
                Details
              </h3>
              <p className="mt-3 leading-relaxed text-bamboo-600">
                {product.longDescription}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
