"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Target, Award } from "lucide-react";

const features = [
  { icon: Shield, title: "MAX PROTECTION", desc: "Quad-layered foam system for ultimate hand safety." },
  { icon: Zap, title: "ULTRA LIGHT", desc: "Aerodynamic design that won't slow down your strikes." },
  { icon: Target, title: "PERFECT FIT", desc: "Anatomically shaped to follow the natural hand curve." },
  { icon: Award, title: "ELITE LEATHER", desc: "Hand-selected full-grain leather for lifelong durability." },
];

export const Features = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center space-y-4"
            >
              <feature.icon size={32} strokeWidth={1} className="text-accent" />
              <h3 className="text-sm font-bold uppercase tracking-widest">{feature.title}</h3>
              <p className="text-xs text-muted leading-relaxed max-w-[200px]">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
