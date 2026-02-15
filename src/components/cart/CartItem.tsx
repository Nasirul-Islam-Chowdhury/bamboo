"use client";

import Link from "next/link";
import { CartItem as CartItemType } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import QuantitySelector from "@/components/products/QuantitySelector";
import ProductImage from "@/components/products/ProductImage";

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 py-4">
      {/* Image */}
      <Link
        href={`/products/${item.product.slug}`}
        className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-bamboo-100"
      >
        <ProductImage
          src={item.product.image}
          alt={item.product.name}
          category={item.product.categoryId}
          className="h-full w-full object-cover"
        />
      </Link>

      {/* Details */}
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <Link
            href={`/products/${item.product.slug}`}
            className="font-medium text-bamboo-800 hover:text-forest-500"
          >
            {item.product.name}
          </Link>
          <p className="font-medium text-bamboo-800">
            {formatPrice(item.product.price * item.quantity)}
          </p>
        </div>
        <p className="mt-1 text-sm text-bamboo-500">
          {formatPrice(item.product.price)} each
        </p>
        <div className="mt-2 flex items-center justify-between">
          <QuantitySelector
            quantity={item.quantity}
            onChange={(qty) => updateQuantity(item.product.id, qty)}
          />
          <button
            onClick={() => removeItem(item.product.id)}
            className="text-sm text-bamboo-500 hover:text-red-500"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
