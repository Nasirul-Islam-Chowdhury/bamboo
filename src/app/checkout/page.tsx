"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice, generateOrderId } from "@/lib/utils";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    address: "",
    note: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const orderId = generateOrderId();
    const orderData = {
      orderId,
      items,
      subtotal,
      customerName: form.name,
      customerEmail: form.email,
      shippingAddress: form.address,
      createdAt: new Date().toISOString(),
      note: form.note,
    };

    // Save to MongoDB via API
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
    } catch {
      // Fallback: still let order go through even if API fails
    }

    // Also save to sessionStorage for the confirmation page
    sessionStorage.setItem("bamboo-last-order", JSON.stringify(orderData));
    clearCart();
    router.push(`/order-confirmation?orderId=${orderId}`);
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
        <h1 className="font-serif text-2xl font-bold text-bamboo-800">
          No items to checkout
        </h1>
        <p className="mt-2 text-bamboo-600">Add some items to your cart first.</p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-md bg-forest-500 px-6 py-3 font-medium text-white transition-colors hover:bg-forest-600"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
        <svg className="mx-auto h-16 w-16 text-bamboo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
        <h1 className="mt-4 font-serif text-2xl font-bold text-bamboo-800">
          Sign in to checkout
        </h1>
        <p className="mt-2 text-bamboo-600">
          You need to be signed in to place an order.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/login?redirect=/checkout"
            className="rounded-md bg-forest-500 px-6 py-3 font-medium text-white transition-colors hover:bg-forest-600"
          >
            Sign in
          </Link>
          <Link
            href="/register?redirect=/checkout"
            className="rounded-md border-2 border-forest-500 px-6 py-3 font-medium text-forest-500 transition-colors hover:bg-forest-50"
          >
            Create account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav className="mb-6 text-sm text-bamboo-500">
        <a href="/" className="hover:text-forest-500">Home</a>
        <span className="mx-2">/</span>
        <a href="/cart" className="hover:text-forest-500">Cart</a>
        <span className="mx-2">/</span>
        <span className="text-bamboo-700">Checkout</span>
      </nav>

      <h1 className="font-serif text-3xl font-bold text-bamboo-800">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-lg border border-bamboo-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-bamboo-800">
                Shipping Information
              </h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-bamboo-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-1 w-full rounded-md border border-bamboo-200 px-4 py-2.5 text-sm text-bamboo-800 placeholder:text-bamboo-400 focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-bamboo-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="mt-1 w-full rounded-md border border-bamboo-200 px-4 py-2.5 text-sm text-bamboo-800 placeholder:text-bamboo-400 focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-bamboo-700">
                    Shipping Address *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="mt-1 w-full rounded-md border border-bamboo-200 px-4 py-2.5 text-sm text-bamboo-800 placeholder:text-bamboo-400 focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
                    placeholder="123 Main St, City, State, ZIP"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-bamboo-700">
                    Order Notes (optional)
                  </label>
                  <textarea
                    rows={2}
                    value={form.note}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                    className="mt-1 w-full rounded-md border border-bamboo-200 px-4 py-2.5 text-sm text-bamboo-800 placeholder:text-bamboo-400 focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
                    placeholder="Any special instructions..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="rounded-lg border border-bamboo-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-bamboo-800">
                Order Summary
              </h2>
              <div className="mt-4 divide-y divide-bamboo-100">
                {items.map((item) => (
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
              <div className="mt-4 border-t border-bamboo-200 pt-4">
                <div className="flex justify-between text-lg font-bold text-bamboo-800">
                  <span>Total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="mt-6 w-full rounded-md bg-forest-500 px-6 py-3 font-medium text-white transition-colors hover:bg-forest-600 disabled:opacity-50"
              >
                {submitting ? "Placing order..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
