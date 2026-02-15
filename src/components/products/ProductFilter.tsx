"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { categories } from "@/data/categories";

export default function ProductFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";
  const activeSort = searchParams.get("sort") || "default";
  const searchQuery = searchParams.get("q") || "";
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || value === "default" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/products?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams("q", localSearch.trim());
  };

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-bamboo-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-md border border-bamboo-200 bg-white py-2 pl-10 pr-4 text-sm text-bamboo-800 placeholder:text-bamboo-400 focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-forest-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-forest-600"
        >
          Search
        </button>
        {searchQuery && (
          <button
            type="button"
            onClick={() => {
              setLocalSearch("");
              updateParams("q", "");
            }}
            className="rounded-md border border-bamboo-200 px-3 py-2 text-sm text-bamboo-600 hover:bg-bamboo-50"
          >
            Clear
          </button>
        )}
      </form>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateParams("category", "all")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === "all"
                ? "bg-forest-500 text-white"
                : "bg-bamboo-100 text-bamboo-700 hover:bg-bamboo-200"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateParams("category", cat.id)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-forest-500 text-white"
                  : "bg-bamboo-100 text-bamboo-700 hover:bg-bamboo-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={activeSort}
          onChange={(e) => updateParams("sort", e.target.value)}
          className="rounded-md border border-bamboo-200 bg-white px-3 py-1.5 text-sm text-bamboo-700 focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
        >
          <option value="default">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A-Z</option>
        </select>
      </div>
    </div>
  );
}
