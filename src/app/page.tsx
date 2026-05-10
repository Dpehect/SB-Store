"use client";

import { Hero } from "@/components/layout/Hero";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/data/products";
import { useLanguage } from "@/store/useLanguage";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);

  // Fix for SSR hydration issues with Zustand persist
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-white" />; // Blank state until hydrated
  }

  return (
    <div className="flex flex-col w-full">
      <Hero />
      
      {/* Featured Collections */}
      <section className="py-32 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-4 md:space-y-0">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-accent">
                {lang === "TR" ? "Özenle Seçilmiş" : "Curated Selection"}
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">
                {lang === "TR" ? "EN ÇOK SATANLAR" : "BEST SELLERS"}
              </h2>
            </div>
            <Link href="/shop" className="text-sm font-bold uppercase tracking-widest border-b-2 border-primary pb-1 hover:text-accent hover:border-accent transition-all">
              {lang === "TR" ? "Tümünü Keşfet" : "View All Products"}
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Philosophy Section */}
      <section className="py-32 px-6 md:px-12 bg-surface">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight uppercase">
              {lang === "TR" ? <>ORİJİNAL <br /> PERFORMANS</> : <>ORIGINAL <br /> PERFORMANCE</>}
            </h2>
            <div className="space-y-6 text-muted leading-relaxed font-medium">
              <p>
                {lang === "TR" 
                  ? "SB Store olarak tek bir amacımız var: Dünyanın en kaliteli dövüş ekipmanlarını, %100 orjinal ve en uygun fiyat garantisiyle sporculara ulaştırmak."
                  : 'At SB Store, we have one mission: To provide the world\'s highest quality combat gear to athletes with a 100% original and best-price guarantee.'}
              </p>
              <p>
                {lang === "TR"
                  ? "Aracıları ortadan kaldırarak ve doğrudan en iyi markalarla çalışarak, elit performansı herkes için ulaşılabilir kılıyoruz. Softbridge Solutions tarafından titizlikle tasarlanan altyapımızla güvenli alışverişin keyfini çıkarın."
                  : "By eliminating middlemen and working directly with top brands, we make elite performance accessible to everyone. Enjoy secure shopping with our infrastructure meticulously designed by Softbridge Solutions."}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <h4 className="font-bold text-primary mb-2 uppercase tracking-widest text-xs">{lang === "TR" ? "%100 Orjinal" : "100% Original"}</h4>
                <p className="text-xs text-muted leading-relaxed">{lang === "TR" ? "Tüm ürünlerimiz distribütör onaylı ve orjinaldir." : "All our products are distributor-approved and authentic."}</p>
              </div>
              <div>
                <h4 className="font-bold text-primary mb-2 uppercase tracking-widest text-xs">{lang === "TR" ? "En İyi Fiyat" : "Best Price"}</h4>
                <p className="text-xs text-muted leading-relaxed">{lang === "TR" ? "Kaliteyi en uygun maliyetle sunma sözü veriyoruz." : "We promise to deliver top quality at the most affordable cost."}</p>
              </div>
            </div>
          </div>
          <div className="relative aspect-square bg-white shadow-2xl overflow-hidden group">
             <Image 
                src="https://cdn.shopify.com/s/files/1/0578/3398/0097/files/a9468881aa3fe5e142b37440daf4cb7535f29404_BG_MONOGRAM_PROBOXING_BURGUNDY_11__1_602x.jpg?v=1776330490" 
                alt="Our Philosophy" 
                fill 
                className="object-cover p-8 group-hover:scale-105 transition-transform duration-700" 
             />
          </div>
        </div>
      </section>
    </div>
  );
}

import Image from "next/image";
