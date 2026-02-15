import Link from "next/link";

export const metadata = {
  title: "About | BambooParts",
  description: "Learn about our mission to provide premium bamboo flute parts and materials.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      {/* Hero */}
      <div className="text-center">
        <h1 className="font-serif text-4xl font-bold text-bamboo-800">Our Story</h1>
        <p className="mt-4 text-lg text-bamboo-600">
          Connecting makers with the finest bamboo flute materials since 2020
        </p>
      </div>

      {/* Bamboo illustration */}
      <div className="mt-12 flex justify-center">
        <div className="w-full max-w-md rounded-lg bg-bamboo-100 p-8">
          <svg viewBox="0 0 300 120" className="h-auto w-full text-bamboo-400" fill="none" stroke="currentColor" strokeWidth="1.5">
            {/* Flute shape */}
            <rect x="20" y="45" width="260" height="30" rx="15" strokeWidth="2" />
            {/* Finger holes */}
            <circle cx="100" cy="60" r="5" />
            <circle cx="130" cy="60" r="5" />
            <circle cx="160" cy="60" r="5" />
            <circle cx="190" cy="60" r="5" />
            <circle cx="220" cy="60" r="5" />
            <circle cx="250" cy="60" r="5" />
            {/* Mouthpiece */}
            <ellipse cx="45" cy="60" rx="8" ry="4" />
            {/* Node lines */}
            <line x1="80" y1="45" x2="80" y2="75" strokeWidth="1" opacity="0.5" />
            <line x1="170" y1="45" x2="170" y2="75" strokeWidth="1" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Content sections */}
      <div className="mt-16 space-y-12">
        <section>
          <h2 className="font-serif text-2xl font-bold text-bamboo-800">The Beginning</h2>
          <p className="mt-4 leading-relaxed text-bamboo-600">
            BambooParts was born from a simple frustration: finding quality bamboo flute
            parts shouldn&apos;t be this hard. As makers ourselves, we spent years searching
            for reliable sources of properly cured bamboo tubes, precision-fitted mouthpieces,
            and quality hardware. When we couldn&apos;t find a one-stop shop, we decided to
            build one.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-bamboo-800">Our Materials</h2>
          <p className="mt-4 leading-relaxed text-bamboo-600">
            We source our bamboo from sustainable groves in Japan (Madake), China (Tonkin),
            and Southeast Asia. Each piece is carefully selected for its acoustic properties
            &mdash; wall thickness, density, and natural straightness. Our bamboo is heat-treated
            and seasoned for a minimum of six months before we offer it for sale, ensuring
            dimensional stability and rich tonal qualities.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-bamboo-800">The Craft</h2>
          <p className="mt-4 leading-relaxed text-bamboo-600">
            Bamboo flute making is an ancient art that spans cultures across the globe &mdash;
            from the Japanese shakuhachi to the Indian bansuri, the Native American flute to
            the simple folk recorder. Each tradition brings its own techniques, aesthetics,
            and musical expression. We provide parts that honor these traditions while making
            the craft accessible to modern makers.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-bamboo-800">Our Promise</h2>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                title: "Quality First",
                desc: "Every part is inspected and tested before shipping. We stand behind everything we sell.",
              },
              {
                title: "Sustainably Sourced",
                desc: "Our bamboo comes from managed groves that practice responsible harvesting techniques.",
              },
              {
                title: "Maker Support",
                desc: "We provide guides, specifications, and personal support to help you succeed in your builds.",
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
          Ready to start building?
        </p>
        <Link
          href="/products"
          className="mt-4 inline-block rounded-md bg-forest-500 px-8 py-3 font-medium text-white transition-colors hover:bg-forest-600"
        >
          Shop All Parts
        </Link>
      </div>
    </div>
  );
}
