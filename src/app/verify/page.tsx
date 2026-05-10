"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/useAuth";
import { ShieldCheck, ArrowRight, RefreshCw, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function VerifyPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [showResendSuccess, setShowResendSuccess] = useState(false);
  const { verify, resendCode, tempUser, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.isVerified) {
      router.push("/shop");
    } else if (!tempUser) {
      router.push("/signup");
    }
  }, [tempUser, user, router]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const success = verify(code);
    if (success) {
      alert("Account Verified! Welcome to SB Store.");
      router.push("/shop");
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleResend = async () => {
    if (!tempUser) return;
    setIsResending(true);
    
    const newCode = resendCode();
    if (newCode) {
      try {
        const res = await fetch("/api/auth/send-verification", {
          method: "POST",
          body: JSON.stringify({ email: tempUser.email, name: tempUser.name, code: newCode }),
          headers: { "Content-Type": "application/json" }
        });
        
        if (res.ok) {
          setShowResendSuccess(true);
          setTimeout(() => setShowResendSuccess(false), 5000);
        } else {
          alert("Could not resend verification email.");
        }
      } catch (err) {
        console.error("Resend Error:", err);
      }
    }
    setIsResending(false);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] flex items-center justify-center px-6">
      <AnimatePresence>
        {showResendSuccess && (
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
                <p className="text-sm font-bold">A new verification code has been sent.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md space-y-12 text-center"
      >
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white border border-gray-100 shadow-sm rounded-full mb-4">
            <ShieldCheck size={28} strokeWidth={1.5} className="text-accent" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">Verify Email</h1>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted leading-relaxed">
            We've sent a 6-digit code to <br />
            <span className="text-primary font-black">{tempUser?.email}</span>
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-8 bg-white p-10 border border-gray-100 shadow-xl">
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted">Enter 6-Digit Code</label>
            <input 
              required
              type="text" 
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="000000"
              className="w-full border-b-2 border-gray-100 py-4 text-center text-3xl font-black tracking-[0.5em] focus:outline-none focus:border-accent transition-all placeholder:text-gray-100"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-16 bg-primary text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-none hover:bg-accent transition-all"
          >
            VERIFY & COMPLETE <ArrowRight size={14} className="ml-2" />
          </Button>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] font-black uppercase tracking-widest text-accent"
            >
              Invalid Code. Please try again.
            </motion.p>
          )}

          <div className="flex flex-col space-y-4 pt-4 border-t border-gray-50">
            <button 
              type="button" 
              disabled={isResending}
              onClick={handleResend}
              className="text-[9px] font-black uppercase tracking-widest text-muted hover:text-primary transition-colors flex items-center justify-center disabled:opacity-50"
            >
              {isResending ? <Loader2 size={10} className="animate-spin mr-2" /> : <RefreshCw size={10} className="mr-2" />}
              {isResending ? "Sending..." : "Resend Code"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
