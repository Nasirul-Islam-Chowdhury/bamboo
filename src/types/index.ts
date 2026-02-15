export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  price: number; // in cents
  categoryId: string;
  image: string;
  inStock: boolean;
  featured: boolean;
  specifications: Specification[];
  tags: string[];
}

export interface Specification {
  label: string;
  value: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  sortOrder: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  createdAt: string;
  note: string;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  authProvider: "firebase" | "manual";
}

export interface StoredOrder {
  id: string;
  orderId: string;
  items: CartItem[];
  subtotal: number;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  note: string;
  status: string;
  createdAt: string;
}
