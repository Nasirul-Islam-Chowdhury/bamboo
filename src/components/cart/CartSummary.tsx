"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export default function CartSummary() {
  const { subtotal, itemCount } = useCart();

  return (
    <div className="rounded-lg border border-bamboo-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-bamboo-800">Order Summary</h2>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm text-bamboo-600">
          <span>Subtotal ({itemCount} items)</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-bamboo-600">
          <span>Shipping</span>
          <span>{subtotal >= 10000 ? "Free" : "Calculated at checkout"}</span>
        </div>
        <div className="border-t border-bamboo-200 pt-2">
          <div className="flex justify-between text-lg font-bold text-bamboo-800">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
        </div>
      </div>
      {subtotal < 10000 && (
        <p className="mt-2 text-xs text-bamboo-500">
          Free shipping on orders over {formatPrice(10000)}
        </p>
      )}
      <Link
        href="/checkout"
        className="mt-4 block w-full rounded-md bg-forest-500 px-6 py-3 text-center font-medium text-white transition-colors hover:bg-forest-600"
      >
        Proceed to Checkout
      </Link>
      <Link
        href="/products"
        className="mt-2 block text-center text-sm text-bamboo-600 hover:text-forest-500"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
