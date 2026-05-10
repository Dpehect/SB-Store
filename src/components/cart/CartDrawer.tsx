"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/store/useCart";
import Image from "next/image";
import { useLanguage } from "@/store/useLanguage";
import Link from "next/link";
import { useState, useEffect } from "react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, removeItem, updateQuantity, getTotal } = useCart();
  const total = getTotal();
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const t = {
    cart: lang === "TR" ? "SEPETİNİZ" : "YOUR CART",
    empty: lang === "TR" ? "Sepetiniz henüz boş." : "Your cart is empty.",
    startShopping: lang === "TR" ? "ALIŞVERİŞE BAŞLA" : "START SHOPPING",
    remove: lang === "TR" ? "KALDIR" : "REMOVE",
    subtotal: lang === "TR" ? "ARA TOPLAM" : "SUBTOTAL",
    shippingNotice: lang === "TR" 
      ? "Kargo ve vergiler ödeme adımında hesaplanır." 
      : "Shipping and taxes calculated at checkout.",
    checkout: lang === "TR" ? "GÜVENLİ ÖDEMEYE GEÇ" : "PROCEED TO CHECKOUT"
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
          />
          
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-lg bg-white z-[101] flex flex-col shadow-[-20px_0_60px_-15px_rgba(0,0,0,0.1)]"
          >
            {/* Header */}
            <div className="px-10 py-12 flex justify-between items-center border-b border-gray-50">
              <div className="flex items-center space-x-4">
                <span className="text-[11px] font-black uppercase tracking-[0.3em]">{t.cart}</span>
                <span className="bg-primary text-white text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {items.length}
                </span>
              </div>
              <button 
                onClick={onClose} 
                className="group p-2 transition-transform hover:scale-110"
              >
                <X size={24} strokeWidth={1} className="text-muted group-hover:text-primary" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-grow overflow-y-auto px-10 py-8 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                  <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center">
                    <ShoppingBag size={32} strokeWidth={1} className="text-muted" />
                  </div>
                  <div className="space-y-4">
                    <p className="text-muted text-sm font-medium tracking-wide">{t.empty}</p>
                    <button 
                      onClick={onClose} 
                      className="text-[11px] font-black border-b-2 border-primary pb-1 uppercase tracking-widest hover:text-accent hover:border-accent transition-all"
                    >
                      {t.startShopping}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-12">
                  {items.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={item.id} 
                      className="flex space-x-8"
                    >
                      <div className="relative w-32 aspect-[3/4] bg-surface flex-shrink-0 group overflow-hidden">
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                      </div>
                      <div className="flex-grow flex flex-col justify-between py-2">
                        <div className="space-y-1">
                          <div className="flex justify-between items-start">
                            <h3 className="text-[13px] font-black uppercase tracking-tight leading-tight max-w-[200px]">{item.name}</h3>
                            <p className="text-sm font-bold text-primary">{(item.price * item.quantity * 45).toLocaleString('tr-TR')} TL</p>
                          </div>
                          <p className="text-[10px] text-muted font-bold uppercase tracking-widest">
                            {item.size} <span className="mx-2 text-gray-200">|</span> {item.color}
                          </p>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center border border-gray-100 bg-white">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                              className="p-2 hover:bg-surface transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-10 text-center text-xs font-black">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                              className="p-2 hover:bg-surface transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)} 
                            className="text-[9px] font-black text-muted hover:text-accent uppercase tracking-widest border-b border-transparent hover:border-accent transition-all"
                          >
                            {t.remove}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-10 bg-[#FBFBFB] space-y-8 border-t border-gray-50">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">{t.subtotal}</span>
                    <span className="text-xl font-black">{(total * 45).toLocaleString('tr-TR')} TL</span>
                  </div>
                  <p className="text-[10px] text-muted font-medium uppercase tracking-widest text-center italic">
                    {t.shippingNotice}
                  </p>
                </div>
                <Link 
                  href="/checkout" 
                  onClick={onClose} 
                  className="block w-full bg-primary text-white text-center py-6 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-accent transition-all duration-500 shadow-xl shadow-primary/5"
                >
                  {t.checkout}
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
