"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { motion } from "framer-motion";
import { useLanguage } from "@/store/useLanguage";
import { useCart } from "@/store/useCart";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard = ({ product, className }: ProductCardProps) => {
  const addItem = useCart((state) => state.addItem);
  const { lang } = useLanguage();

  // Handle both single image and images array
  const displayImage = product.image || (product.images && product.images[0]) || "";
  const isLimitedEdition = product.name.toLowerCase().includes("limited edition");

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn("group cursor-pointer", className)}
    >
      <Link href={`/product/${product.id}`} className="block overflow-hidden bg-surface">
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <Image
            src={displayImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.isNew && (
            <span className="absolute top-4 left-4 bg-accent text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">
              New Arrival
            </span>
          )}
          
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <Button 
              onClick={(e) => {
                e.preventDefault();
                addItem({ 
                  ...product, 
                  image: displayImage, 
                  quantity: 1, 
                  size: (product.sizes && product.sizes[0]) || "Standard", 
                  color: isLimitedEdition ? "Special Edition" : "Onyx" 
                });
              }}
              className="w-full bg-white text-primary hover:bg-primary hover:text-white rounded-none text-[10px] font-bold tracking-widest uppercase py-6 shadow-xl"
            >
              {lang === "TR" ? "HIZLI EKLE" : "QUICK ADD"}
            </Button>
          </div>
        </div>
      </Link>
      
      <div className="mt-6 space-y-2 px-1">
        <div className="flex justify-between items-start">
          <div className="max-w-[70%]">
            <h3 className="text-sm font-medium uppercase tracking-tight group-hover:text-accent transition-colors truncate">
              <Link href={`/product/${product.id}`}>{product.name}</Link>
            </h3>
            <p className="text-[10px] text-muted mt-1 uppercase font-bold tracking-widest opacity-60">
              {product.brand || "Elite Gear"} • {product.category}
            </p>
          </div>
          <p className="text-sm font-semibold">{(product.price * 45).toLocaleString('tr-TR')} TL</p>
        </div>
        
        {!isLimitedEdition && (
          <div className="flex space-x-2 pt-2">
            <div
              className="w-3 h-3 rounded-full border border-gray-100 shadow-sm bg-[#111111]"
              title="Onyx (Black)"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};
