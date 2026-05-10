"use client";

import { useLanguage } from "@/store/useLanguage";
import { RotateCcw, ShieldCheck, CheckCircle, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ReturnsPage() {
  const { lang } = useLanguage();

  const t = {
    title: lang === "TR" ? "İADE VE DEĞİŞİM" : "RETURNS & EXCHANGES",
    desc: lang === "TR" 
      ? "Memnun kalmadığınız her ürünü 30 gün içinde kolayca iade edebilirsiniz." 
      : "You can easily return any product you are not satisfied with within 30 days.",
    steps: [
      {
        title: lang === "TR" ? "30 GÜN SÜRE" : "30-DAY WINDOW",
        desc: lang === "TR" ? "Ürünü teslim aldıktan sonra 30 gün içinde iade talebi oluşturabilirsiniz." : "Create a return request within 30 days of delivery."
      },
      {
        title: lang === "TR" ? "ORJİNAL KUTU" : "ORIGINAL BOX",
        desc: lang === "TR" ? "Ürün kullanılmamış ve orjinal kutusunda olmalıdır." : "Product must be unused and in its original box."
      },
      {
        title: lang === "TR" ? "ÜCRETSİZ İADE" : "FREE RETURNS",
        desc: lang === "TR" ? "Anlaşmalı kargolarımızla iade gönderimleri tamamen ücretsizdir." : "Return shipping is completely free with our contracted carriers."
      }
    ]
  };

  return (
    <main className="pt-40 pb-20 px-6 md:px-12 bg-white min-h-screen text-primary">
      <div className="max-w-4xl mx-auto space-y-20">
        <div className="space-y-6 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <RotateCcw className="text-accent" size={28} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic"
          >
            {t.title}
          </motion.h1>
          <motion.p className="text-muted font-medium tracking-wide">{t.desc}</motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.steps.map((step, i) => (
            <div key={i} className="space-y-4 text-center p-8 bg-[#FBFBFB] border border-gray-50">
              <span className="text-[10px] font-black text-accent border border-accent rounded-full w-6 h-6 flex items-center justify-center mx-auto mb-4">{i + 1}</span>
              <h3 className="font-black uppercase tracking-widest text-xs">{step.title}</h3>
              <p className="text-xs text-muted leading-relaxed font-medium">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-primary text-white p-12 md:p-16 space-y-8">
          <h2 className="text-3xl font-black uppercase tracking-tighter italic">İade Süreci Nasıl İşler?</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <CheckCircle className="text-accent mt-1" size={18} />
              <div>
                <p className="font-bold mb-1">Talep Oluşturma</p>
                <p className="text-sm text-gray-300">Hesabım {">"} Siparişlerim üzerinden iade talebinizi oluşturun.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="text-accent mt-1" size={18} />
              <div>
                <p className="font-bold mb-1">Kargo Teslimi</p>
                <p className="text-sm text-gray-300">Size verilen kargo kodu ile ürünü en yakın şubeye teslim edin.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="text-accent mt-1" size={18} />
              <div>
                <p className="font-bold mb-1">Geri Ödeme</p>
                <p className="text-sm text-gray-300">Ürün incelendikten sonra 3-5 iş günü içinde ücret iadesi bankanıza yansır.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-4 text-muted pt-10">
          <HelpCircle size={16} />
          <p className="text-[10px] font-black uppercase tracking-widest">Daha fazla yardıma mı ihtiyacınız var? destek@sbstore.com</p>
        </div>
      </div>
    </main>
  );
}
