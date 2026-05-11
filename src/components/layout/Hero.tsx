"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/store/useLanguage";

export const Hero = () => {
  const { lang } = useLanguage();

  return (
    <section className="relative h-[100vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Premium Combat Gear"
          fill
          priority
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl space-y-8"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/80">
            {lang === "TR" ? "PROFESYONEL DÖVÜŞ EKİPMANLARI" : "PROFESSIONAL GRADE GEAR"}
          </span>
          <h1 className="text-4xl md:text-8xl font-bold tracking-tighter text-white">
            {lang === "TR" ? <>ZİRVEDEKİLER İÇİN <br /> TASARLANDI</> : <>FORGED FOR <br /> THE ELITE</>}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-xl mx-auto font-medium leading-relaxed">
            {lang === "TR" 
              ? "Minimalist tasarım, üstün koruma. Saf performans odaklı el yapımı ekipmanlarla tekniğinizi zirveye taşıyın."
              : "Minimalist design. Maximum protection. Elevate your striking game with hand-crafted excellence."}
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/shop">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 min-w-[200px] rounded-none">
                {lang === "TR" ? "KOLEKSİYONU KEŞFET" : "SHOP COLLECTION"}
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary min-w-[200px] rounded-none">
                {lang === "TR" ? "DAHA FAZLA BİLGİ" : "LEARN MORE"}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/60">Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent" />
      </motion.div>
    </section>
  );
};
