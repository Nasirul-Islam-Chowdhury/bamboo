"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { StoredOrder } from "@/types";
import { formatPrice } from "@/lib/utils";

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Fetch orders
  useEffect(() => {
    if (user) {
      const url = user.email
        ? `/api/orders?email=${encodeURIComponent(user.email)}`
        : "/api/orders";
      fetch(url)
        .then((res) => res.json())
        .then((data) => setOrders(data.orders || []))
        .catch(() => {})
        .finally(() => setOrdersLoading(false));
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-bamboo-300 border-t-forest-500" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-serif text-3xl font-bold text-bamboo-800">Profile</h1>

      {/* User info */}
      <div className="mt-8 rounded-lg border border-bamboo-200 bg-white p-6">
        <div className="flex items-center gap-4">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || "User"}
              className="h-16 w-16 rounded-full"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-bamboo-200 text-xl font-bold text-bamboo-600">
              {(user.displayName || user.email || "U")[0].toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-lg font-semibold text-bamboo-800">
              {user.displayName || "User"}
            </p>
            <p className="text-sm text-bamboo-500">{user.email}</p>
            <p className="mt-1 text-xs text-bamboo-400">
              Signed in with {user.authProvider === "firebase" ? "Google" : "email"}
            </p>
          </div>
        </div>

        <button
          onClick={signOut}
          className="mt-4 rounded-md border border-bamboo-200 px-4 py-2 text-sm font-medium text-bamboo-700 transition-colors hover:bg-bamboo-50"
        >
          Sign Out
        </button>
      </div>

      {/* Order history */}
      <div className="mt-8">
        <h2 className="font-serif text-xl font-bold text-bamboo-800">
          Order History
        </h2>

        {ordersLoading ? (
          <div className="mt-4 space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="h-20 animate-pulse rounded-lg bg-bamboo-100" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="mt-4 rounded-lg border border-bamboo-200 bg-white p-6 text-center">
            <p className="text-bamboo-500">No orders yet.</p>
            <Link
              href="/products"
              className="mt-3 inline-block text-sm font-medium text-forest-500 hover:text-forest-600"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-lg border border-bamboo-200 bg-white"
              >
                {/* Order header */}
                <button
                  onClick={() =>
                    setExpandedOrder(
                      expandedOrder === order.id ? null : order.id
                    )
                  }
                  className="flex w-full items-center justify-between p-4 text-left"
                >
                  <div>
                    <p className="font-mono text-sm font-semibold text-bamboo-800">
                      {order.orderId}
                    </p>
                    <p className="text-xs text-bamboo-500">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-forest-100 px-2.5 py-0.5 text-xs font-medium text-forest-600">
                      {order.status}
                    </span>
                    <span className="font-semibold text-bamboo-800">
                      {formatPrice(order.subtotal)}
                    </span>
                    <svg
                      className={`h-5 w-5 text-bamboo-400 transition-transform ${
                        expandedOrder === order.id ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </button>

                {/* Expanded details */}
                {expandedOrder === order.id && (
                  <div className="border-t border-bamboo-100 px-4 pb-4 pt-3">
                    <div className="divide-y divide-bamboo-50">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between py-1.5 text-sm">
                          <span className="text-bamboo-600">
                            {item.product.name} x{item.quantity}
                          </span>
                          <span className="text-bamboo-800">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 text-sm text-bamboo-500">
                      <p>Ship to: {order.customerName}</p>
                      <p>{order.shippingAddress}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
