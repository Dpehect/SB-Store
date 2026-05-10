"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/useAuth";
import { User as UserIcon, Mail, ArrowRight, ShieldCheck, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const code = signup(email, name, password);
    
    try {
      const res = await fetch("/api/auth/send-verification", {
        method: "POST",
        body: JSON.stringify({ email, name, code }),
        headers: { "Content-Type": "application/json" }
      });
      
      if (res.ok) {
        setShowNotification(true);
        setTimeout(() => router.push("/verify"), 3000);
      } else {
        router.push("/verify");
      }
    } catch (err) {
      console.error("Email Error:", err);
      router.push("/verify");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] flex items-center justify-center px-6 py-20">
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-10 left-1/2 -translate-x-1/2 bg-primary text-white p-6 shadow-2xl z-[100] max-w-sm w-full border-b-4 border-accent"
          >
            <div className="flex items-center space-x-4">
              <Mail className="animate-bounce text-accent" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Email Sent!</p>
                <p className="text-sm font-bold">Check your inbox for the verification code.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-10 text-center"
      >
        <div className="space-y-4">
          <h1 className="text-3xl font-black tracking-tighter uppercase italic">
            SB<span className="text-accent not-italic ml-1">STORE</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted">Join the elite community</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6 bg-white p-10 border border-gray-100 shadow-xl text-left">
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted flex items-center">
              <UserIcon size={12} className="mr-2" /> Full Name
            </label>
            <input 
              required
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full border-b border-gray-100 py-3 text-sm font-bold focus:outline-none focus:border-primary transition-all placeholder:text-gray-200"
            />
          </div>

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
              disabled={isSubmitting}
              type="submit" 
              className="w-full h-14 bg-primary text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-none hover:bg-accent transition-all group"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : "CREATE ACCOUNT"}
              {!isSubmitting && <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />}
            </Button>
          </div>
          
          <div className="flex items-center space-x-3 text-[9px] font-bold text-muted/60 uppercase tracking-widest pt-4">
            <ShieldCheck size={14} />
            <span>Secure, encrypted member registration</span>
          </div>
        </form>

        <p className="text-[10px] text-muted uppercase tracking-widest">
          Member? <a href="/login" className="text-primary font-black hover:underline">Sign In</a>
        </p>
      </motion.div>
    </div>
  );
}
