import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const productLinks = [
  { href: "/products/bamboo-thermos", label: "Bamboo Thermos" },
  { href: "/products/bamboo-decorative-bottle", label: "Carved Bamboo Bottle" },
];

export default function Footer() {
  return (
    <footer className="border-t border-bamboo-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-lg font-bold text-bamboo-800">MehruKa✨</h3>
            <p className="mt-2 text-sm text-bamboo-600">
              Premium handcrafted bamboo products. Sustainably sourced, crafted with care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-bamboo-800">
              Quick Links
            </h4>
            <ul className="mt-3 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-bamboo-600 hover:text-forest-500">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-bamboo-800">
              Products
            </h4>
            <ul className="mt-3 space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-bamboo-600 hover:text-forest-500">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-bamboo-800">
              Get in Touch
            </h4>
            <div className="mt-3 space-y-2 text-sm text-bamboo-600">
              <p>hello@mehruka.com</p>
              <p>Mon-Fri, 9am-5pm EST</p>
              <p>Sylhet, Bangladesh</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-bamboo-200 pt-6 text-center text-sm text-bamboo-500">
          &copy; {new Date().getFullYear()} MehruKa✨ All rights reserved.
        </div>
      </div>
    </footer>
  );
}
