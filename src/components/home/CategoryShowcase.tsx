import Link from "next/link";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

const categoryColors: Record<string, string> = {
  "bamboo-tubes": "from-forest-100 to-forest-50",
  mouthpieces: "from-bamboo-200 to-bamboo-100",
  "cork-joints": "from-bamboo-300/30 to-bamboo-100",
  "tuning-slides": "from-bamboo-200/60 to-bamboo-50",
  accessories: "from-forest-100/60 to-bamboo-50",
  finishing: "from-bamboo-200/40 to-bamboo-50",
};

export default function CategoryShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <h2 className="text-center font-serif text-3xl font-bold text-bamboo-800">
        Shop by Category
      </h2>
      <p className="mt-2 text-center text-bamboo-600">
        Everything you need to build your perfect bamboo flute
      </p>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((cat) => {
          const count = products.filter((p) => p.categoryId === cat.id).length;
          return (
            <Link
              key={cat.id}
              href={`/products?category=${cat.id}`}
              className={`group flex flex-col items-center rounded-lg bg-gradient-to-b ${
                categoryColors[cat.id] || "from-bamboo-100 to-bamboo-50"
              } p-6 transition-shadow hover:shadow-md`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 shadow-sm">
                <svg
                  className="h-6 w-6 text-bamboo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
              </div>
              <h3 className="mt-3 text-center text-sm font-semibold text-bamboo-800">
                {cat.name}
              </h3>
              <p className="mt-1 text-xs text-bamboo-500">{count} items</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
