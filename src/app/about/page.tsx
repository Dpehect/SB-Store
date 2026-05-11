"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/store/useLanguage";
import { ChevronRight, ShieldCheck, Zap, Globe, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
  {
    title: "100% ORIGINAL",
    desc: "Her dikiş, her katman orjinaldir. Distribütör garantili ürünlerle sahaya çıkın.",
    descEn: "Every stitch, every layer is authentic. Step into the arena with distributor-guaranteed gear.",
    image: "https://www.everlast.com/cdn/shop/files/MX_OG_Fight_Gloves.jpg?v=1756235655&width=990",
    color: "#E63939"
  },
  {
    title: "ELITE QUALITY",
    desc: "Dünyanın en iyi markalarını, profesyonel sporcuların standartlarında sunuyoruz.",
    descEn: "We bring the world's best brands to you, meeting the standards of professional athletes.",
    image: "https://cdn.shopify.com/s/files/1/0578/3398/0097/files/a9468881aa3fe5e142b37440daf4cb7535f29404_BG_MONOGRAM_PROBOXING_BURGUNDY_11__1_602x.jpg?v=1776330490",
    color: "#111111"
  },
  {
    title: "BEST VALUE",
    desc: "En kaliteli ekipmanı, aracıları ortadan kaldırarak en uygun fiyatla sağlıyoruz.",
    descEn: "We provide top-tier equipment at the most affordable prices by eliminating middlemen.",
    image: "https://www.fairtex.com/cdn/shop/files/BGV-PremiumFairtexxAAPE02.png?v=1743503887&width=770",
    color: "#444444"
  }
];

export default function AboutPage() {
  const { lang } = useLanguage();
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6%"]);

  return (
    <main className="bg-white text-primary overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center space-y-8 pt-20">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] font-black uppercase tracking-[0.4em] text-accent"
        >
          {lang === "TR" ? "BİZİM HİKAYEMİZ" : "OUR STORY"}
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.9]"
        >
          SB STORE <br /> <span className="not-italic text-accent">ARENA</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl text-sm md:text-base text-muted font-medium leading-relaxed"
        >
          {lang === "TR" 
            ? "SB Store, dövüş sporları tutkunları için en kaliteli, %100 orjinal ve en uygun fiyatlı ekipmanları tek bir çatı altında toplamak amacıyla kuruldu."
            : "SB Store was founded to bring together the highest quality, 100% original, and most affordable equipment for combat sports enthusiasts under one roof."}
        </motion.p>
      </section>

      {/* Horizontal Scroll Section (Apple Style) */}
      <section ref={targetRef} className="relative h-[300vh] bg-[#FBFBFB]">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div style={{ x }} className="flex">
            {slides.map((slide, i) => (
              <div key={i} className="h-screen w-screen flex-shrink-0 flex items-center justify-center p-6 md:p-24">
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center max-w-7xl">
                  <div className="space-y-4 md:space-y-6 text-center lg:text-left">
                    <h2 className="text-3xl md:text-7xl font-black tracking-tighter uppercase italic" style={{ color: slide.color }}>
                      {slide.title}
                    </h2>
                    <p className="text-sm md:text-xl font-medium text-muted leading-relaxed max-w-sm mx-auto lg:mx-0">
                      {lang === "TR" ? slide.desc : slide.descEn}
                    </p>
                    <div className="flex items-center justify-center lg:justify-start space-x-3 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-primary">
                      <span>Explore More</span>
                      <ChevronRight size={14} className="text-accent" />
                    </div>
                  </div>
                  <div className="relative w-full aspect-square shadow-2xl overflow-hidden rounded-sm group max-w-xs lg:max-w-none mx-auto">
                    <Image src={slide.image} alt={slide.title} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-black/5" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technology Section (Softbridge Solutions) */}
      <section className="py-40 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-16">
          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted">Powered By Innovation</h3>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
              ENGINEERED BY <br /> <span className="not-italic text-primary">SOFTBRIDGE SOLUTIONS</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full pt-10">
            {[
              { icon: Zap, title: "High Performance", desc: "Saniyeler içinde yüklenen, akışkan bir alışveriş deneyimi." },
              { icon: ShieldCheck, title: "Secure Infrastructure", desc: "Softbridge Solutions tarafından optimize edilmiş güvenli ödeme sistemleri." },
              { icon: Globe, title: "Global Standards", desc: "Dünya standartlarında teknoloji ve tasarım anlayışı." }
            ].map((feature, i) => (
              <div key={i} className="space-y-4 p-8 border border-gray-50 hover:border-primary transition-colors text-left group">
                <feature.icon className="text-accent group-hover:scale-110 transition-transform" size={24} />
                <h4 className="font-black uppercase tracking-widest text-xs">{feature.title}</h4>
                <p className="text-xs text-muted leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-20 border-t border-gray-100 w-full">
            <p className="text-[10px] text-muted font-black uppercase tracking-[0.2em]">
              SB Store © 2024. All Rights Reserved. Crafted with precision by <span className="text-primary underline cursor-pointer">Softbridge Solutions</span>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
