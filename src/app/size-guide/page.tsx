"use client";

import { useLanguage } from "@/store/useLanguage";
import { Ruler, Info, Target, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function SizeGuidePage() {
  const { lang } = useLanguage();

  const boxingSizes = [
    { weight: "45 - 55 kg", oz: "10 oz", use: "Antrenman / Torba" },
    { weight: "55 - 70 kg", oz: "12 oz", use: "Genel Antrenman" },
    { weight: "70 - 85 kg", oz: "14 oz", use: "Sparring / Güvenli Teknik" },
    { weight: "85+ kg", oz: "16 oz", use: "Ağır Sıklet Sparring" },
  ];

  const mmaSizes = [
    { hand: "17 - 19 cm", size: "S", weight: "4 oz" },
    { hand: "19 - 21 cm", size: "M", weight: "4 oz" },
    { hand: "21 - 23 cm", size: "L", weight: "4 oz" },
    { hand: "23+ cm", size: "XL", weight: "4 oz" },
  ];

  return (
    <main className="pt-40 pb-20 px-6 md:px-12 bg-white min-h-screen text-primary">
      <div className="max-w-4xl mx-auto space-y-24">
        <div className="space-y-6 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center mb-8">
            <div className="bg-accent/10 p-4 rounded-full">
              <Ruler className="text-accent" size={32} />
            </div>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">
            {lang === "TR" ? "BEDEN REHBERİ" : "SIZE GUIDE"}
          </h1>
          <p className="text-muted font-medium tracking-wide">Doğru ekipman, doğru performansın anahtarıdır.</p>
        </div>

        {/* Boxing Section */}
        <section className="space-y-10">
          <div className="flex items-center space-x-4 border-b border-gray-100 pb-4">
            <Target className="text-accent" size={20} />
            <h2 className="text-2xl font-black uppercase tracking-tighter">Boks Eldivenleri (Oz Seçimi)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-primary">
                  <th className="py-4 text-[10px] font-black uppercase tracking-widest">Kilo Aralığı</th>
                  <th className="py-4 text-[10px] font-black uppercase tracking-widest">Eldiven Boyutu</th>
                  <th className="py-4 text-[10px] font-black uppercase tracking-widest">Kullanım Amacı</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {boxingSizes.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="py-6 text-sm font-bold">{row.weight}</td>
                    <td className="py-6 text-sm font-black text-accent">{row.oz}</td>
                    <td className="py-6 text-sm text-muted font-medium">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* MMA Section */}
        <section className="space-y-10">
          <div className="flex items-center space-x-4 border-b border-gray-100 pb-4">
            <Zap className="text-accent" size={20} />
            <h2 className="text-2xl font-black uppercase tracking-tighter">MMA Eldivenleri</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-primary">
                  <th className="py-4 text-[10px] font-black uppercase tracking-widest">El Çevresi</th>
                  <th className="py-4 text-[10px] font-black uppercase tracking-widest">Beden</th>
                  <th className="py-4 text-[10px] font-black uppercase tracking-widest">Ağırlık</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {mmaSizes.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="py-6 text-sm font-bold">{row.hand}</td>
                    <td className="py-6 text-sm font-black text-accent">{row.size}</td>
                    <td className="py-6 text-sm text-muted font-medium">{row.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="bg-[#FBFBFB] p-10 flex items-start space-x-6">
          <Info className="text-primary mt-1 flex-shrink-0" size={20} />
          <div className="space-y-2">
            <p className="text-[11px] font-black uppercase tracking-widest">Ölçüm İpucu</p>
            <p className="text-xs text-muted leading-relaxed font-medium">
              Eldiven ölçüsü için dominant elinizin avuç içi genişliğini ve el çevresini ölçmenizi öneririz. Bandaj payını unutmayın; her zaman yaklaşık 2-3 cm bandaj payı bırakılmalıdır.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
