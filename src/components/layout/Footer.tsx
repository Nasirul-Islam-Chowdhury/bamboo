import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const categories = [
  { href: "/products?category=bamboo-tubes", label: "Bamboo Tubes" },
  { href: "/products?category=mouthpieces", label: "Mouthpieces" },
  { href: "/products?category=cork-joints", label: "Cork Joints" },
  { href: "/products?category=tuning-slides", label: "Tuning Slides" },
  { href: "/products?category=accessories", label: "Accessories" },
  { href: "/products?category=finishing", label: "Finishing" },
];

export default function Footer() {
  return (
    <footer className="border-t border-bamboo-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-lg font-bold text-bamboo-800">BambooParts</h3>
            <p className="mt-2 text-sm text-bamboo-600">
              Premium bamboo parts and materials for handcrafted flutes. Sourced sustainably, crafted with care.
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

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-bamboo-800">
              Categories
            </h4>
            <ul className="mt-3 space-y-2">
              {categories.map((link) => (
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
              <p>hello@bambooparts.com</p>
              <p>Mon-Fri, 9am-5pm EST</p>
              <p>Portland, Oregon</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-bamboo-200 pt-6 text-center text-sm text-bamboo-500">
          &copy; {new Date().getFullYear()} BambooParts. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
