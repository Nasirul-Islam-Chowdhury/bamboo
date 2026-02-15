import Link from "next/link";
import Image from "next/image";

export default function AboutPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Product image */}
        <div className="overflow-hidden rounded-lg bg-bamboo-50">
          <div className="relative aspect-square">
            <Image
              src="/images/products/p2.png"
              alt="MehruKa Bamboo Bottle"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Text */}
        <div>
          <h2 className="font-serif text-3xl font-bold text-bamboo-800">
            The Art of Bamboo Craftsmanship
          </h2>
          <p className="mt-4 leading-relaxed text-bamboo-600">
            For centuries, bamboo has been treasured for its strength, beauty,
            and sustainability. Its natural warmth and lightweight structure
            make it the perfect material for creating everyday products that
            are both functional and eco-friendly.
          </p>
          <p className="mt-3 leading-relaxed text-bamboo-600">
            At MehruKa, we source the finest bamboo varieties from sustainable
            groves and craft each product with traditional techniques. Our
            handmade bottles combine artisan craftsmanship with modern
            functionality.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-block text-sm font-semibold text-forest-500 hover:text-forest-600"
          >
            Read Our Story &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
