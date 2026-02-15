import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "About | MehruKa✨",
  description: "Learn about our mission to provide premium handcrafted bamboo products.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      {/* Hero */}
      <div className="text-center">
        <h1 className="font-serif text-4xl font-bold text-bamboo-800">Our Story</h1>
        <p className="mt-4 text-lg text-bamboo-600">
          Bringing sustainable bamboo products to everyday life since 2020
        </p>
      </div>

      {/* Product showcase */}
      <div className="mt-12 flex justify-center">
        <div className="w-full max-w-md rounded-lg bg-bamboo-100 p-8">
          <div className="relative mx-auto h-48 w-full">
            <Image
              src="/images/products/p1.png"
              alt="MehruKa Bamboo Thermos"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Content sections */}
      <div className="mt-16 space-y-12">
        <section>
          <h2 className="font-serif text-2xl font-bold text-bamboo-800">The Beginning</h2>
          <p className="mt-4 leading-relaxed text-bamboo-600">
            MehruKa was born from a passion for sustainability and beautiful design.
            We believed that everyday products shouldn&apos;t come at the cost of the
            environment. When we discovered the incredible versatility of bamboo &mdash;
            strong, lightweight, naturally beautiful, and endlessly renewable &mdash; we
            knew we had found our calling.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-bamboo-800">Our Materials</h2>
          <p className="mt-4 leading-relaxed text-bamboo-600">
            We source our bamboo from sustainable groves in Asia, where bamboo grows
            rapidly without the need for pesticides or excessive water. Each piece is
            carefully selected for its quality, grain pattern, and structural integrity.
            Our bamboo is properly cured and treated to ensure durability and a beautiful
            natural finish that lasts for years.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-bamboo-800">The Craft</h2>
          <p className="mt-4 leading-relaxed text-bamboo-600">
            Every MehruKa product is handcrafted by skilled artisans who bring generations
            of bamboo-working knowledge to their craft. From the precision carving of our
            decorative bottles to the careful assembly of our insulated thermos flasks, each
            piece receives individual attention. The result is a product that&apos;s not just
            functional, but a work of art.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-bamboo-800">Our Promise</h2>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                title: "Quality First",
                desc: "Every product is inspected and tested before shipping. We stand behind everything we sell.",
              },
              {
                title: "Sustainably Sourced",
                desc: "Our bamboo comes from managed groves that practice responsible harvesting techniques.",
              },
              {
                title: "Customer Support",
                desc: "We provide prompt, personal support to ensure your complete satisfaction with every purchase.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-bamboo-200 bg-white p-5">
                <h3 className="font-semibold text-bamboo-800">{item.title}</h3>
                <p className="mt-2 text-sm text-bamboo-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <p className="text-lg text-bamboo-600">
          Ready to go sustainable?
        </p>
        <Link
          href="/products"
          className="mt-4 inline-block rounded-md bg-forest-500 px-8 py-3 font-medium text-white transition-colors hover:bg-forest-600"
        >
          Shop Products
        </Link>
      </div>
    </div>
  );
}
