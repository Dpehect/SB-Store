"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/useAuth";
import { Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { login, user } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (user) {
      if (user.role === 'admin') router.push("/admin");
      else router.push("/shop");
    }
  }, [user, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (!success) {
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
          <h1 className="text-3xl font-black tracking-tighter uppercase italic">
            SB<span className="text-accent not-italic ml-1">STORE</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted">Customer & Admin Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-10 border border-gray-100 shadow-xl text-left">
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted flex items-center">
              <Mail size={12} className="mr-2" /> Email Address
            </label>
            <input 
              required
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full border-b border-gray-100 py-3 text-sm font-bold focus:outline-none focus:border-primary transition-all placeholder:text-gray-200"
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted flex items-center">
              <Lock size={12} className="mr-2" /> Password
            </label>
            <input 
              required
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border-b border-gray-100 py-3 text-sm font-bold focus:outline-none focus:border-primary transition-all placeholder:text-gray-200"
            />
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full h-14 bg-primary text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-none hover:bg-accent transition-all group"
            >
              SIGN IN <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] font-black uppercase tracking-widest text-accent text-center"
            >
              Invalid credentials.
            </motion.p>
          )}
          
          <p className="text-[10px] text-muted text-center pt-4 uppercase tracking-widest">
            Don't have an account? <Link href="/signup" className="text-primary font-black cursor-pointer hover:underline">Join Now</Link>
          </p>
        </form>

        <div className="grid grid-cols-2 gap-4 text-[9px] font-black text-muted/60 uppercase tracking-widest">
          <div className="p-4 bg-white border border-gray-50">First order: 30% Off</div>
          <div className="p-4 bg-white border border-gray-50">Member Rewards</div>
        </div>
      </motion.div>
    </div>
  );
}
