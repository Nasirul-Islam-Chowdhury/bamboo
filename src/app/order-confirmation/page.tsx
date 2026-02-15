"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { OrderDetails } from "@/types";
import { formatPrice } from "@/lib/utils";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("bamboo-last-order");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.orderId === orderId) {
          setOrder(parsed);
        }
      }
    } catch {
      // Ignore
    }
  }, [orderId]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
      {/* Success icon */}
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest-100">
        <svg
          className="h-8 w-8 text-forest-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>

      <h1 className="mt-6 font-serif text-3xl font-bold text-bamboo-800">
        Order Confirmed!
      </h1>

      {orderId && (
        <p className="mt-2 text-lg text-bamboo-600">
          Order ID: <span className="font-mono font-semibold text-bamboo-800">{orderId}</span>
        </p>
      )}

      {order && (
        <>
          <p className="mt-4 text-bamboo-600">
            A confirmation has been sent to{" "}
            <span className="font-medium">{order.customerEmail}</span>
          </p>

          {/* Order details */}
          <div className="mt-8 rounded-lg border border-bamboo-200 bg-white p-6 text-left">
            <h2 className="text-lg font-semibold text-bamboo-800">Order Details</h2>
            <div className="mt-4 divide-y divide-bamboo-100">
              {order.items.map((item) => (
                <div key={item.product.id} className="flex justify-between py-2 text-sm">
                  <span className="text-bamboo-600">
                    {item.product.name} x{item.quantity}
                  </span>
                  <span className="font-medium text-bamboo-800">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-bamboo-200 pt-3">
              <div className="flex justify-between font-bold text-bamboo-800">
                <span>Total</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
            </div>

            <div className="mt-4 border-t border-bamboo-200 pt-3 text-sm text-bamboo-600">
              <p><span className="font-medium">Ship to:</span> {order.customerName}</p>
              <p className="mt-1">{order.shippingAddress}</p>
            </div>
          </div>
        </>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/products"
          className="rounded-md bg-forest-500 px-6 py-3 font-medium text-white transition-colors hover:bg-forest-600"
        >
          Continue Shopping
        </Link>
        <button
          onClick={() => window.print()}
          className="rounded-md border border-bamboo-200 px-6 py-3 font-medium text-bamboo-700 transition-colors hover:bg-bamboo-50"
        >
          Print Receipt
        </button>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
          <div className="animate-pulse">
            <div className="mx-auto h-16 w-16 rounded-full bg-bamboo-200" />
            <div className="mx-auto mt-6 h-8 w-64 rounded bg-bamboo-200" />
          </div>
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
