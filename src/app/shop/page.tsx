"use client";

import { useState, useMemo, useEffect } from "react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { ChevronDown, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/store/useLanguage";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("featured");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Translation Map
  const t = {
    title: lang === "TR" ? "TÜM KOLEKSİYON" : "THE COLLECTION",
    desc: lang === "TR" 
      ? "En zorlu antrenmanlar için geliştirilmiş, yüksek performanslı dövüş ekipmanlarını keşfedin." 
      : "Explore high-performance combat gear engineered for the toughest training sessions.",
    sortBy: lang === "TR" ? "Sıralama" : "Sort By",
    featured: lang === "TR" ? "Önerilen" : "Featured",
    priceLow: lang === "TR" ? "Fiyat: Düşükten Yükseğe" : "Price: Low to High",
    priceHigh: lang === "TR" ? "Fiyat: Yüksekten Düşüğe" : "Price: High to Low",
    newest: lang === "TR" ? "En Yeniler" : "New Arrivals",
    discipline: lang === "TR" ? "Dallara Göre" : "Discipline",
    size: lang === "TR" ? "Beden / Boyut" : "Size",
    allDisciplines: lang === "TR" ? "Tüm Kategoriler" : "All Categories",
    clearFilters: lang === "TR" ? "Filtreleri Temizle" : "Clear Filters",
    noProducts: lang === "TR" ? "Aradığınız kriterlere uygun ürün bulunamadı." : "No products found matching your filters.",
    clearAll: lang === "TR" ? "Tümünü Sıfırla" : "Clear All Filters",
    boxing: lang === "TR" ? "Boks" : "Boxing"
  };

  const sortOptions = [
    { id: "featured", label: t.featured },
    { id: "newest", label: t.newest },
    { id: "price-low", label: t.priceLow },
    { id: "price-high", label: t.priceHigh },
  ];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const categoryMatch = !selectedCategory || product.category === selectedCategory;
      const sizeMatch = !selectedSize || product.sizes.includes(selectedSize);
      return categoryMatch && sizeMatch;
    });

    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "newest") result.sort((a, b) => (b.isNew ? 1 : -1));

    return result;
  }, [selectedCategory, selectedSize, sortBy]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedSize(null);
  };

  const isFilterActive = selectedCategory || selectedSize;

  if (!mounted) return <div className="min-h-screen bg-white" />;

  return (
    <div className="pt-40 pb-20 px-6 md:px-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 space-y-8 md:space-y-0 border-b border-gray-50 pb-16">
          <div className="space-y-4">
            <h1 className="text-5xl font-black tracking-tighter uppercase leading-none">{t.title}</h1>
            <p className="text-sm text-muted max-w-md font-medium leading-relaxed">{t.desc}</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="md:hidden flex items-center space-x-2 text-[11px] font-black uppercase tracking-widest border border-primary px-6 py-2"
            >
              <span>{lang === "TR" ? "FİLTRELE" : "FILTER"}</span>
              {isFilterActive && <span className="w-2 h-2 bg-accent rounded-full" />}
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center space-x-3 text-[11px] font-black uppercase tracking-[0.2em] border-b-2 border-primary pb-2 group"
              >
                <span>{t.sortBy}: {sortOptions.find(o => o.id === sortBy)?.label}</span>
                <ChevronDown size={14} className={cn("transition-transform duration-300", isSortOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {isSortOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-4 w-64 bg-white shadow-2xl z-30 py-4 border border-gray-50"
                  >
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setSortBy(opt.id);
                          setIsSortOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-6 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-surface transition-colors"
                      >
                        <span className={cn(sortBy === opt.id ? "text-primary" : "text-muted")}>{opt.label}</span>
                        {sortBy === opt.id && <Check size={12} className="text-primary" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Filter Overlay */}
        <AnimatePresence>
          {isFilterOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFilterOpen(false)}
                className="fixed inset-0 bg-black/40 z-[100] md:hidden"
              />
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                className="fixed inset-y-0 left-0 w-[80%] bg-white z-[101] md:hidden p-12 overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-12">
                  <h3 className="text-lg font-black uppercase tracking-widest">{lang === "TR" ? "FİLTRELER" : "FILTERS"}</h3>
                  <button onClick={() => setIsFilterOpen(false)}><X size={24} /></button>
                </div>

                <div className="space-y-16">
                  {/* Discipline */}
                  <div>
                    <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-8">{t.discipline}</h4>
                    <ul className="space-y-5 text-xs font-bold uppercase tracking-wider">
                      <li 
                        onClick={() => { setSelectedCategory(null); setIsFilterOpen(false); }}
                        className={cn("cursor-pointer transition-colors flex items-center space-x-3", !selectedCategory ? "text-primary" : "text-muted hover:text-primary")}
                      >
                        <div className={cn("w-2 h-2 rounded-full", !selectedCategory ? "bg-primary" : "bg-transparent")} />
                        <span>{t.allDisciplines}</span>
                      </li>
                      {['Boxing', 'MMA'].map(cat => (
                        <li 
                          key={cat} 
                          onClick={() => { setSelectedCategory(cat); setIsFilterOpen(false); }}
                          className={cn(
                            "flex items-center space-x-3 cursor-pointer transition-colors",
                            selectedCategory === cat ? "text-primary" : "text-muted hover:text-primary"
                          )}
                        >
                          <div className={cn("w-2 h-2 rounded-full", selectedCategory === cat ? "bg-primary" : "bg-transparent")} />
                          <span>{cat === 'Boxing' ? t.boxing : cat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Size */}
                  <div>
                    <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-8">{t.size}</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {['10oz', '12oz', '14oz', '16oz', 'S', 'M', 'L', 'XL'].map(size => (
                        <button 
                          key={size} 
                          onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                          className={cn(
                            "border-2 py-3 text-[10px] font-black transition-all",
                            selectedSize === size 
                              ? "bg-primary text-white border-primary" 
                              : "bg-transparent border-gray-100 text-muted hover:border-primary hover:text-primary"
                          )}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {isFilterActive && (
                  <Button 
                    onClick={() => { clearFilters(); setIsFilterOpen(false); }}
                    className="w-full mt-12 bg-accent text-white uppercase font-black text-[10px] tracking-widest rounded-none h-14"
                  >
                    {t.clearAll}
                  </Button>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="flex flex-col md:flex-row gap-20">
          
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 space-y-16 hidden md:block">
            
            {/* Clear Filters Button */}
            {isFilterActive && (
              <motion.button 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={clearFilters}
                className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-accent border-b border-accent pb-1 mb-8"
              >
                <span>{t.clearFilters}</span>
                <X size={12} />
              </motion.button>
            )}

            {/* Discipline */}
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-8">{t.discipline}</h4>
              <ul className="space-y-5 text-xs font-bold uppercase tracking-wider">
                <li 
                  onClick={() => setSelectedCategory(null)}
                  className={cn("cursor-pointer transition-colors flex items-center space-x-3", !selectedCategory ? "text-primary" : "text-muted hover:text-primary")}
                >
                  <div className={cn("w-2 h-2 rounded-full", !selectedCategory ? "bg-primary" : "bg-transparent")} />
                  <span>{t.allDisciplines}</span>
                </li>
                {['Boxing', 'MMA'].map(cat => (
                  <li 
                    key={cat} 
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "flex items-center space-x-3 cursor-pointer transition-colors",
                      selectedCategory === cat ? "text-primary" : "text-muted hover:text-primary"
                    )}
                  >
                    <div className={cn("w-2 h-2 rounded-full", selectedCategory === cat ? "bg-primary" : "bg-transparent")} />
                    <span>{cat === 'Boxing' ? t.boxing : cat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Size */}
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-8">{t.size}</h4>
              <div className="grid grid-cols-3 gap-3">
                {['10oz', '12oz', '14oz', '16oz', 'S', 'M', 'L', 'XL'].map(size => (
                  <button 
                    key={size} 
                    onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                    className={cn(
                      "border-2 py-3 text-[10px] font-black transition-all",
                      selectedSize === size 
                        ? "bg-primary text-white border-primary" 
                        : "bg-transparent border-gray-100 text-muted hover:border-primary hover:text-primary"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-full py-40 text-center space-y-6">
                  <p className="text-muted uppercase tracking-[0.2em] text-sm font-bold">{t.noProducts}</p>
                  <button onClick={clearFilters} className="text-[11px] font-black underline uppercase tracking-widest text-accent">{t.clearAll}</button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
