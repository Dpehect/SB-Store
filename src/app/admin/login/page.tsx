"use client";
// Forced update for Vercel deployment verification

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/useAuth";
import { Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { login, user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isAdmin) {
      router.push("/admin");
    }
  }, [isAdmin, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login("gurlekyunusemre2@gmail.com", password);
    if (success) {
      router.push("/admin");
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  if (!mounted) return <div className="min-h-screen bg-white" />;

  return (
    <div className="min-h-screen bg-[#FBFBFB] flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-12 text-center"
      >
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white border border-gray-100 shadow-sm rounded-full mb-4">
            <Lock size={24} strokeWidth={1.5} className="text-primary" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic">
            SB<span className="text-accent not-italic ml-1">STORE</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted">Admin Authentication</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-10 border border-gray-100 shadow-xl">
          <div className="space-y-4 text-left">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted">Access Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border-b-2 border-gray-100 py-4 text-center text-lg font-bold focus:outline-none focus:border-primary transition-all placeholder:text-gray-200"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-16 bg-primary text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-none hover:bg-accent transition-all group"
          >
            Enter Dashboard <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] font-black uppercase tracking-widest text-accent"
            >
              Access Denied. Incorrect Password.
            </motion.p>
          )}
        </form>

        <div className="flex items-center justify-center space-x-2 text-muted/40">
          <ShieldCheck size={12} />
          <span className="text-[9px] font-bold uppercase tracking-widest">Protected Environment</span>
        </div>
      </motion.div>
    </div>
  );
}
