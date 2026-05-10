"use client";

import { useCart } from "@/store/useCart";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/store/useLanguage";
import { useState, useEffect } from "react";
import { ChevronRight, Lock, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/store/useAuth";

export default function CheckoutPage() {
  const { user, incrementOrderCount } = useAuth();
  const cartItems = useCart((state) => state.items);
  const clearCart = useCart((state) => state.clearCart);
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 0;
  
  // Discount Logic
  let discountRate = 0;
  let discountLabel = "";
  
  if (user) {
    if (user.orderCount === 0) {
      discountRate = 0.30;
      discountLabel = lang === "TR" ? "İLK SİPARİŞ (%30)" : "FIRST ORDER (30%)";
    } else {
      discountRate = 0.10;
      discountLabel = lang === "TR" ? "ÜYE ÖDÜLÜ (%10)" : "MEMBER REWARD (10%)";
    }
  }

  const discountAmount = subtotal * discountRate;
  const total = subtotal - discountAmount + shipping;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    alert(lang === "TR" ? "Siparişiniz Alındı! Teşekkürler." : "Order Received! Thank you.");
    incrementOrderCount();
    clearCart();
    window.location.href = "/";
  };

  const t = {
    title: lang === "TR" ? "GÜVENLİ ÖDEME" : "SECURE CHECKOUT",
    contact: lang === "TR" ? "İletişim Bilgileri" : "Contact Information",
    email: lang === "TR" ? "E-posta adresi" : "Email address",
    shipping: lang === "TR" ? "Teslimat Adresi" : "Shipping Address",
    firstName: lang === "TR" ? "Ad" : "First Name",
    lastName: lang === "TR" ? "Soyad" : "Last Name",
    address: lang === "TR" ? "Adres" : "Address",
    city: lang === "TR" ? "Şehir" : "City",
    payNow: lang === "TR" ? "SİPARİŞİ TAMAMLA" : "COMPLETE ORDER",
    summary: lang === "TR" ? "SİPARİŞ ÖZETİ" : "ORDER SUMMARY",
    subtotal: lang === "TR" ? "Ara Toplam" : "Subtotal",
    shippingCost: lang === "TR" ? "Teslimat" : "Shipping",
    free: lang === "TR" ? "ÜCRETSİZ" : "FREE",
    total: lang === "TR" ? "Toplam" : "Total",
    secure: lang === "TR" ? "SSL Şifreli Güvenli Ödeme" : "SSL Encrypted Secure Payment"
  };

  if (!mounted) return <div className="min-h-screen bg-white" />;

  return (
    <div className="pt-40 pb-32 px-6 md:px-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-4 mb-16 text-[10px] font-black uppercase tracking-[0.3em] text-muted/60">
          <Link href="/shop" className="hover:text-primary transition-colors">{lang === "TR" ? "MAĞAZA" : "SHOP"}</Link>
          <ChevronRight size={10} />
          <span className="text-primary">{t.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          
          {/* Left: Forms */}
          <div className="lg:col-span-7 space-y-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-16"
            >
              <section className="space-y-10">
                <div className="flex items-center space-x-4 border-b border-gray-100 pb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-xs font-black">1</span>
                  <h3 className="text-sm font-black uppercase tracking-[0.2em]">{t.contact}</h3>
                </div>
                <div className="px-12">
                  <input 
                    type="email" 
                    placeholder={t.email} 
                    className="w-full border-b border-gray-100 py-6 text-base font-medium focus:outline-none focus:border-primary transition-all placeholder:text-gray-300" 
                  />
                </div>
              </section>

              <section className="space-y-10">
                <div className="flex items-center space-x-4 border-b border-gray-100 pb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-xs font-black">2</span>
                  <h3 className="text-sm font-black uppercase tracking-[0.2em]">{t.shipping}</h3>
                </div>
                <div className="px-12 space-y-10">
                  <div className="grid grid-cols-2 gap-12">
                    <input type="text" placeholder={t.firstName} className="border-b border-gray-100 py-6 text-base font-medium focus:outline-none focus:border-primary transition-all placeholder:text-gray-300" />
                    <input type="text" placeholder={t.lastName} className="border-b border-gray-100 py-6 text-base font-medium focus:outline-none focus:border-primary transition-all placeholder:text-gray-300" />
                  </div>
                  <input type="text" placeholder={t.address} className="w-full border-b border-gray-100 py-6 text-base font-medium focus:outline-none focus:border-primary transition-all placeholder:text-gray-300" />
                  <input type="text" placeholder={t.city} className="w-full border-b border-gray-100 py-6 text-base font-medium focus:outline-none focus:border-primary transition-all placeholder:text-gray-300" />
                </div>
              </section>

              <div className="pt-10 px-12">
                <Button className="w-full h-20 bg-primary text-white text-[11px] font-black uppercase tracking-[0.4em] rounded-none hover:bg-accent transition-all duration-700 shadow-2xl shadow-primary/20">
                  {t.payNow} — ${total}
                </Button>
                <div className="flex items-center justify-center space-x-3 mt-8 text-muted/60">
                  <Lock size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{t.secure}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Summary */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 bg-surface/40 p-12 space-y-12 h-fit"
          >
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] border-b border-gray-100 pb-8">{t.summary}</h3>
            
            <div className="space-y-10 max-h-[50vh] overflow-y-auto pr-4 custom-scrollbar">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-start group">
                  <div className="flex space-x-6">
                    <div className="relative w-20 aspect-[3/4] bg-white overflow-hidden">
                      <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="space-y-1 py-1">
                      <h4 className="text-[11px] font-black uppercase tracking-tight leading-tight">{item.name}</h4>
                      <p className="text-[9px] text-muted font-bold uppercase tracking-widest">
                        {item.size} <span className="mx-1 text-gray-300">|</span> {item.color} (x{item.quantity})
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-black py-1">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="pt-12 border-t border-gray-100 space-y-6">
                <div className="flex justify-between text-sm font-bold uppercase tracking-widest">
                  <span>{t.subtotal}</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-sm font-black uppercase tracking-widest text-accent">
                    <span>{discountLabel}</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold uppercase tracking-widest">
                  <span>{t.shippingCost}</span>
                  <span className="text-accent">{t.free}</span>
                </div>
              <div className="flex justify-between text-base font-black uppercase tracking-[0.3em] pt-10 border-t-2 border-primary">
                <span>{t.total}</span>
                <span className="text-2xl">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
               <div className="flex flex-col items-center text-center space-y-2">
                 <Truck size={16} strokeWidth={1} className="text-muted" />
                 <span className="text-[8px] font-black uppercase tracking-widest text-muted">{lang === "TR" ? "HIZLI KARGO" : "FAST SHIPPING"}</span>
               </div>
               <div className="flex flex-col items-center text-center space-y-2">
                 <ShieldCheck size={16} strokeWidth={1} className="text-muted" />
                 <span className="text-[8px] font-black uppercase tracking-widest text-muted">{lang === "TR" ? "GÜVENLİ" : "SECURE"}</span>
               </div>
               <div className="flex flex-col items-center text-center space-y-2">
                 <RotateCcw size={16} strokeWidth={1} className="text-muted" />
                 <span className="text-[8px] font-black uppercase tracking-widest text-muted">{lang === "TR" ? "KOLAY İADE" : "EASY RETURN"}</span>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
