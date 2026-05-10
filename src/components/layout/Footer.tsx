"use client";

import { useLanguage } from "@/store/useLanguage";
import Link from "next/link";

export const Footer = () => {
  const { lang } = useLanguage();

  return (
    <footer className="bg-primary text-white py-20 px-6 md:px-12 border-t">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <h2 className="text-xl font-bold tracking-tighter uppercase italic">
            SB<span className="text-accent not-italic ml-1">STORE</span>
          </h2>
          <p className="text-muted text-sm leading-relaxed max-w-xs">
            {lang === "TR" 
              ? "En kaliteli dövüş malzemelerini, en uygun fiyata ve %100 orjinal garantisiyle sunuyoruz. Elitler için üretildi." 
              : "Offering the highest quality combat gear with a 100% original guarantee and best price. Crafted for the elite."}
          </p>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-6">
            {lang === "TR" ? "MAĞAZA" : "SHOP"}
          </h4>
          <ul className="space-y-4 text-sm text-muted">
            <li><Link href="/shop" className="hover:text-white transition-colors">{lang === "TR" ? "Boks" : "Boxing"}</Link></li>
            <li><Link href="/shop" className="hover:text-white transition-colors">MMA</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-6">
            {lang === "TR" ? "DESTEK" : "SUPPORT"}
          </h4>
          <ul className="space-y-4 text-sm text-muted">
            <li><a href="#" className="hover:text-white transition-colors">{lang === "TR" ? "Kargo" : "Shipping"}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{lang === "TR" ? "İadeler" : "Returns"}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{lang === "TR" ? "Beden Rehberi" : "Size Guide"}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-6">
            {lang === "TR" ? "SB STORE'A KATIL" : "JOIN SB STORE"}
          </h4>
          <p className="text-sm text-muted mb-4">
            {lang === "TR" ? "Erken erişim ve elit içerik için abone olun." : "Subscribe for early access and elite content."}
          </p>
          <div className="flex">
            <input 
              type="email" 
              placeholder={lang === "TR" ? "E-posta adresi" : "Email address"} 
              className="bg-transparent border-b border-muted py-2 text-sm focus:outline-none focus:border-white transition-colors flex-grow"
            />
            <button className="border-b border-muted py-2 px-4 text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors">
              {lang === "TR" ? "KATIL" : "JOIN"}
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-muted space-y-4 md:space-y-0">
        <p>
          {lang === "TR" 
            ? "Bu website SOFTBRIDGE SOLUTIONS tarafından hazırlanmıştır. 2026" 
            : "This website was prepared by SOFTBRIDGE SOLUTIONS. 2026"}
        </p>
        <div className="flex space-x-8">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
};
