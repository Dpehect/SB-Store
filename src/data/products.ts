import productsData from "./products.json";

export interface Product {
  id: string;
  name: string;
  category: 'Boxing' | 'MMA' | 'Muay Thai';
  price: number;
  description: string;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  features: string[];
  isNew?: boolean;
}

export const products = productsData as Product[];
