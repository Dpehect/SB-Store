"use client";

import { useLanguage } from "@/store/useLanguage";
import { Truck, Clock, ShieldCheck, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function ShippingPage() {
  const { lang } = useLanguage();

  const t = {
    title: lang === "TR" ? "KARGO VE TESLİMAT" : "SHIPPING & DELIVERY",
    desc: lang === "TR" 
      ? "Siparişleriniz en güvenli ve en hızlı şekilde kapınıza ulaşır." 
      : "Your orders reach your door in the safest and fastest way possible.",
    shippingInfo: [
      {
        icon: Clock,
        title: lang === "TR" ? "HIZLI GÖNDERİM" : "FAST SHIPPING",
        desc: lang === "TR" 
          ? "Siparişleriniz 24 saat içinde kargoya verilir." 
          : "Your orders are shipped within 24 hours."
      },
      {
        icon: Truck,
        title: lang === "TR" ? "ÜCRETSİZ TESLİMAT" : "FREE DELIVERY",
        desc: lang === "TR" 
          ? "1.500 TL ve üzeri siparişlerde kargo bizden." 
          : "Free shipping on orders over 1.500 TL."
      },
      {
        icon: ShieldCheck,
        title: lang === "TR" ? "GÜVENLİ PAKETLEME" : "SAFE PACKAGING",
        desc: lang === "TR" 
          ? "Ekipmanlarınız özel korumalı kutularda paketlenir." 
          : "Your gear is packed in special protective boxes."
      },
      {
        icon: Globe,
        title: lang === "TR" ? "TAKİP EDİLEBİLİR" : "TRACKABLE",
        desc: lang === "TR" 
          ? "Sms ve e-posta ile anlık kargo takibi." 
          : "Instant tracking via SMS and email."
      }
    ]
  };

  return (
    <main className="pt-40 pb-20 px-6 md:px-12 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto space-y-20">
        <div className="space-y-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic"
          >
            {t.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted font-medium tracking-wide"
          >
            {t.desc}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.shippingInfo.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-10 border border-gray-50 bg-[#FBFBFB] space-y-4 group hover:border-primary transition-colors"
            >
              <item.icon className="text-accent" size={24} />
              <h3 className="font-black uppercase tracking-widest text-xs">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="space-y-8 pt-10 border-t border-gray-100">
          <h2 className="text-2xl font-black uppercase tracking-tighter italic">Sıkça Sorulan Sorular</h2>
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-sm mb-2">Hangi kargo firmalarıyla çalışıyorsunuz?</h4>
              <p className="text-sm text-muted font-medium">Yurtiçi Kargo ve Aras Kargo ile tüm Türkiye'ye gönderim yapıyoruz.</p>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-2">Siparişim ne zaman ulaşır?</h4>
              <p className="text-sm text-muted font-medium">İstanbul içi 1-2 iş günü, diğer iller için 2-4 iş günü içinde teslimat sağlanır.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
