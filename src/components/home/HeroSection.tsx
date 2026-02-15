import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-bamboo-800">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" viewBox="0 0 400 400" fill="none">
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={i}
              x1={i * 20}
              y1="0"
              x2={i * 20}
              y2="400"
              stroke="currentColor"
              strokeWidth="1"
              className="text-bamboo-300"
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <circle
              key={`n-${i}`}
              cx={60 + i * 40}
              cy={50 + i * 45}
              r="3"
              fill="currentColor"
              className="text-bamboo-400"
            />
          ))}
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
        <div className="max-w-2xl">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Sustainable
            <br />
            <span className="text-bamboo-300">Bamboo Products</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-bamboo-200">
            Premium handcrafted bamboo bottles and eco-friendly products.
            Beautiful, sustainable, and built to last — from nature to you.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="rounded-md bg-forest-500 px-8 py-3 font-medium text-white transition-colors hover:bg-forest-600"
            >
              Shop Now
            </Link>
            <Link
              href="/about"
              className="rounded-md border-2 border-bamboo-300 px-8 py-3 font-medium text-bamboo-200 transition-colors hover:bg-bamboo-700"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
