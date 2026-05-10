import productsData from "./products.json";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'Boxing' | 'MMA';
  price: number;
  description: string;
  image?: string;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  features: string[];
  isNew?: boolean;
}

export const products = productsData as unknown as Product[];
