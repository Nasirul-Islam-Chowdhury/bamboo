"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import ProductFilter from "@/components/products/ProductFilter";
import ProductGrid from "@/components/products/ProductGrid";

function ProductCatalog() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const query = searchParams.get("q")?.toLowerCase() || "";

  let filtered = category
    ? products.filter((p) => p.categoryId === category)
    : [...products];

  // Text search
  if (query) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some((t) => t.includes(query))
    );
  }

  if (sort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === "name-asc") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-bamboo-500">
        <a href="/" className="hover:text-forest-500">Home</a>
        <span className="mx-2">/</span>
        <span className="text-bamboo-700">Products</span>
      </nav>

      <h1 className="font-serif text-3xl font-bold text-bamboo-800">
        All Products
      </h1>
      <p className="mt-2 text-bamboo-600">
        Browse our collection of premium bamboo products
      </p>

      <div className="mt-8">
        <ProductFilter />
      </div>

      <div className="mt-8">
        <ProductGrid products={filtered} />
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 rounded bg-bamboo-200" />
            <div className="h-4 w-64 rounded bg-bamboo-100" />
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2].map((i) => (
                <div key={i} className="h-80 rounded-lg bg-bamboo-100" />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <ProductCatalog />
    </Suspense>
  );
}
