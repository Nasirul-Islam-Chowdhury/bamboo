import Link from "next/link";

export default function AboutPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Illustration */}
        <div className="flex items-center justify-center rounded-lg bg-bamboo-100 p-12">
          <svg
            viewBox="0 0 200 200"
            className="h-48 w-48 text-bamboo-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            {/* Bamboo stalks */}
            <line x1="60" y1="20" x2="60" y2="180" strokeWidth="3" />
            <line x1="60" y1="50" x2="60" y2="52" strokeWidth="6" />
            <line x1="60" y1="90" x2="60" y2="92" strokeWidth="6" />
            <line x1="60" y1="130" x2="60" y2="132" strokeWidth="6" />
            <line x1="100" y1="40" x2="100" y2="180" strokeWidth="3" />
            <line x1="100" y1="70" x2="100" y2="72" strokeWidth="6" />
            <line x1="100" y1="110" x2="100" y2="112" strokeWidth="6" />
            <line x1="100" y1="150" x2="100" y2="152" strokeWidth="6" />
            <line x1="140" y1="30" x2="140" y2="180" strokeWidth="3" />
            <line x1="140" y1="60" x2="140" y2="62" strokeWidth="6" />
            <line x1="140" y1="100" x2="140" y2="102" strokeWidth="6" />
            <line x1="140" y1="140" x2="140" y2="142" strokeWidth="6" />
            {/* Leaves */}
            <path d="M60 50 Q40 35, 45 20 Q55 30, 60 50" fill="currentColor" opacity="0.3" />
            <path d="M100 70 Q120 55, 125 40 Q110 55, 100 70" fill="currentColor" opacity="0.3" />
            <path d="M140 60 Q160 45, 155 30 Q150 45, 140 60" fill="currentColor" opacity="0.3" />
          </svg>
        </div>

        {/* Text */}
        <div>
          <h2 className="font-serif text-3xl font-bold text-bamboo-800">
            The Art of Bamboo Flute Making
          </h2>
          <p className="mt-4 leading-relaxed text-bamboo-600">
            For centuries, bamboo has been the material of choice for flute makers
            across Asia and beyond. Its natural resonance, lightweight structure, and
            beautiful aesthetics make it the perfect medium for creating instruments
            that produce warm, soulful tones.
          </p>
          <p className="mt-3 leading-relaxed text-bamboo-600">
            At BambooParts, we source the finest bamboo varieties from sustainable
            groves and prepare each piece with traditional techniques. Whether
            you&apos;re a first-time builder or an experienced craftsperson, our
            carefully curated parts help you create flutes that are both beautiful
            and musical.
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
