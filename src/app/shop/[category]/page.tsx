"use client";

import { useParams } from "next/navigation";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { motion } from "framer-motion";
import Image from "next/image";

const categoryData: Record<string, { title: string; desc: string; image: string }> = {
  "boxing": {
    title: "THE ART OF STRIKING",
    desc: "Precision, speed, and protection. Our boxing collection is engineered for those who refine their craft one punch at a time.",
    image: "/images/hero-boxing.jpg"
  },
  "mma": {
    title: "LIMITLESS TRANSITION",
    desc: "From striking to grappling. Equipment designed to be as versatile as the fighter who wears it.",
    image: "/images/hero-mma.jpg"
  },
  "muay-thai": {
    title: "THE EIGHT LIMBS",
    desc: "Traditional integrity meets modern science. Extra padding for clinching and heavy kicks.",
    image: "/images/hero-thai.jpg"
  }
};

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params?.category as string;
  const data = categoryData[categorySlug] || categoryData["boxing"];
  
  const filteredProducts = products.filter(
    p => p.category.toLowerCase().replace(" ", "-") === categorySlug
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Category Hero */}
      <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/70">Professional Discipline</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase">
              {data.title}
            </h1>
            <p className="text-sm md:text-base text-white/90 max-w-xl mx-auto leading-relaxed font-medium">
              {data.desc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Feed */}
      <section className="py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-24 border-b border-gray-100 pb-12">
            <div>
              <h2 className="text-2xl font-bold tracking-tighter uppercase text-primary">Essentials</h2>
              <p className="text-xs text-muted mt-2 uppercase tracking-widest">{filteredProducts.length} Results</p>
            </div>
            <button className="text-[10px] font-black uppercase tracking-[0.2em] border-b-2 border-primary pb-1">Filter & Sort</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-32">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Secondary Storytelling Block */}
      <section className="py-40 bg-[#F8F8F8] border-t border-gray-100">
        <div className="max-w-5xl mx-auto text-center space-y-12 px-6">
          <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-primary uppercase leading-tight">
            Designed for those who <br /> don't compromise.
          </h3>
          <p className="text-muted leading-relaxed max-w-2xl mx-auto italic font-light text-lg">
            "We removed the noise. No loud logos, no aggressive patterns. Just the world's finest materials forged for the world's toughest arena."
          </p>
          <div className="pt-8">
            <button className="bg-primary text-white px-16 py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-accent transition-all duration-500">
              LEARN ABOUT OUR MATERIALS
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
