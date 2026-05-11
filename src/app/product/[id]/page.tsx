"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { products } from "@/data/products";
import { useCart } from "@/store/useCart";
import { Button } from "@/components/ui/button";
import { Plus, Minus, ChevronRight, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/store/useLanguage";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id;
  const product = products.find((p) => p.id === id);
  const { lang } = useLanguage();
  
  const isLimitedEdition = product?.name.toLowerCase().includes("limited edition");
  
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(isLimitedEdition ? "Special Edition" : "Onyx");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("features");

  const addItem = useCart((state) => state.addItem);

  const t = {
    notFound: lang === "TR" ? "Ürün bulunamadı." : "Product not found.",
    sizeAlert: lang === "TR" ? "Lütfen bir beden seçin." : "Please select a size.",
    shop: lang === "TR" ? "Mağaza" : "Shop",
    color: lang === "TR" ? "Renk" : "Color",
    selectSize: lang === "TR" ? "Beden Seçimi" : "Select Size",
    sizeGuide: lang === "TR" ? "Beden Rehberi" : "Size Guide",
    addToCart: lang === "TR" ? "SEPETE EKLE" : "ADD TO CART",
    specifications: lang === "TR" ? "Teknik Detaylar" : "Specifications",
    shipping: lang === "TR" ? "Teslimat ve İade" : "Shipping & Returns",
    shippingDetails: lang === "TR" 
      ? ["1.500 TL ve üzeri siparişlerde ücretsiz standart kargo", "30 günlük deneme süresi", "Kolay iade ve değişim imkanı"]
      : ["Free standard shipping on orders over $150", "30-day trial period", "Easy returns and exchanges"]
  };

  if (!product) return <div className="pt-40 text-center">{t.notFound}</div>;

  const handleAddToCart = () => {
    if (!selectedSize && (product.sizes?.length > 0)) {
      alert(t.sizeAlert);
      return;
    }
    addItem({
      id: `${product.id}-${selectedSize}-${selectedColor}`,
      name: product.name,
      price: product.price,
      image: product.image || (product.images ? product.images[0] : ""),
      quantity: quantity,
      size: selectedSize || "Standard",
      color: selectedColor,
    });
  };

  // Mock sizes if they don't exist in the data
  const availableSizes = product.sizes || ["S", "M", "L", "XL"];
  const productFeatures = product.features || ["Premium Quality Leather", "Reinforced Stitching", "Multi-layer Padding"];

  return (
    <div className="pt-24 md:pt-32 pb-20 px-4 md:px-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
          
          {/* Left: Images */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/5] bg-surface overflow-hidden">
              <Image
                src={product.image || (product.images ? product.images[0] : "")}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right: Info */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <nav className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-muted">
                <a href="/shop">{t.shop}</a>
                <ChevronRight size={10} />
                <span>{product.category}</span>
              </nav>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">
                {product.name}
              </h1>
              <p className="text-2xl font-medium text-primary">{(product.price * 45).toLocaleString('tr-TR')} TL</p>
            </div>

            <p className="text-sm text-muted leading-relaxed font-medium">
              {product.description || "The ultimate choice for combat sports enthusiasts. Engineered for durability, comfort, and maximum protection during high-intensity training sessions."}
            </p>

            {/* Conditional Color Selection */}
            {!isLimitedEdition && (
              <div className="space-y-4">
                <h4 className="text-[11px] font-black uppercase tracking-widest">{t.color}: <span className="text-accent">{selectedColor}</span></h4>
                <div className="flex space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-primary scale-110 bg-[#111111]" title="Onyx" />
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-[11px] font-black uppercase tracking-widest">{t.selectSize}</h4>
                <button className="text-[10px] font-bold underline uppercase tracking-widest">{t.sizeGuide}</button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "py-3 text-xs font-bold transition-all border",
                      selectedSize === size 
                        ? "bg-primary text-white border-primary" 
                        : "bg-transparent border-gray-200 hover:border-primary"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-4 pt-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-200">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:text-accent"><Minus size={16} /></button>
                  <span className="w-12 text-center font-bold text-sm">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:text-accent"><Plus size={16} /></button>
                </div>
                <Button 
                  onClick={handleAddToCart}
                  className="flex-grow h-14 bg-primary text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-none hover:bg-accent"
                >
                  {t.addToCart} — {(product.price * quantity * 45).toLocaleString('tr-TR')} TL
                </Button>
              </div>
            </div>

            <div className="pt-10 border-t border-gray-100 space-y-6">
              {[
                { id: "features", title: t.specifications, content: productFeatures },
                { id: "shipping", title: t.shipping, content: t.shippingDetails }
              ].map((item) => (
                <div key={item.id} className="group cursor-pointer">
                  <div 
                    onClick={() => setActiveTab(activeTab === item.id ? "" : item.id)}
                    className="flex justify-between items-center py-2"
                  >
                    <h4 className="text-[11px] font-black uppercase tracking-widest">{item.title}</h4>
                    <Plus size={14} className={cn("transition-transform", activeTab === item.id && "rotate-45")} />
                  </div>
                  <AnimatePresence>
                    {activeTab === item.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <ul className="py-4 space-y-2">
                          {item.content.map((text, idx) => (
                            <li key={idx} className="text-xs text-muted flex items-start space-x-2">
                              <span className="w-1 h-1 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                              <span>{text}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
