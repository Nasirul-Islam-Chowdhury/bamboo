import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "bamboo-thermos",
    slug: "bamboo-thermos",
    name: "MehruKa Bamboo Thermos",
    description:
      "Premium bamboo thermos flask with stainless steel interior and carabiner clip. Perfect for keeping your drinks hot or cold on the go.",
    longDescription:
      "The MehruKa Bamboo Thermos combines natural bamboo aesthetics with modern insulation technology. The outer shell is crafted from sustainably sourced bamboo, giving it a warm, organic feel. Inside, a double-walled stainless steel vacuum chamber keeps your beverages hot for up to 12 hours or cold for up to 24 hours. The leak-proof bamboo lid features a convenient metal carabiner clip so you can attach it to your bag, bike, or belt loop. Lightweight, eco-friendly, and built to last — this thermos is the perfect companion for your daily routine or outdoor adventures.",
    price: 149900,
    categoryId: "bamboo-bottles",
    image: "/images/products/p1.png",
    inStock: true,
    featured: true,
    specifications: [
      { label: "Material", value: "Natural bamboo exterior, stainless steel interior" },
      { label: "Capacity", value: "350 ml" },
      { label: "Insulation", value: "Double-wall vacuum" },
      { label: "Hot Retention", value: "Up to 12 hours" },
      { label: "Cold Retention", value: "Up to 24 hours" },
      { label: "Features", value: "Carabiner clip, leak-proof lid" },
    ],
    tags: ["thermos", "flask", "bamboo", "eco-friendly", "insulated"],
  },
  {
    id: "bamboo-decorative-bottle",
    slug: "bamboo-decorative-bottle",
    name: "MehruKa Carved Bamboo Bottle",
    description:
      "Hand-carved decorative bamboo bottle with intricate diamond patterns. A stunning eco-friendly water bottle and display piece.",
    longDescription:
      "The MehruKa Carved Bamboo Bottle is a masterpiece of artisan craftsmanship. Each bottle is hand-carved from a single piece of premium bamboo, featuring intricate diamond cross-hatch patterns on the lower body and elegant spiral grooves near the neck. The rounded stopper top provides a secure seal while adding to the bottle's distinctive silhouette. Whether used as a daily water bottle or displayed as a decorative piece, this bottle showcases the beauty of natural bamboo. Every piece is unique due to the handmade nature of the carving and natural variations in the bamboo grain.",
    price: 199900,
    categoryId: "bamboo-bottles",
    image: "/images/products/p2.png",
    inStock: true,
    featured: true,
    specifications: [
      { label: "Material", value: "Solid natural bamboo" },
      { label: "Capacity", value: "500 ml" },
      { label: "Carving", value: "Hand-carved diamond pattern" },
      { label: "Finish", value: "Natural oil polish" },
      { label: "Stopper", value: "Bamboo round stopper" },
      { label: "Craftsmanship", value: "Handmade, each piece is unique" },
    ],
    tags: ["bottle", "carved", "decorative", "bamboo", "handmade", "artisan"],
  },
];
