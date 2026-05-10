"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const InstagramGrid = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tighter uppercase mb-4 text-primary">FORGED IN ACTION</h2>
        <p className="text-sm text-muted tracking-widest">@FORGEGLOVE #THEFORGE</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {[1, 2, 3, 4, 1].map((item, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ scale: 0.98 }}
            className="aspect-square bg-surface relative overflow-hidden group cursor-pointer"
          >
             <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
             <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-10">Instagram Shot</span>
             </div>
             {/* Using existing images for demo */}
             <Image 
              src={`/images/products/boxing-1.jpg`} 
              alt="Social" 
              fill 
              className="object-cover group-hover:scale-110 transition-transform duration-700" 
             />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
