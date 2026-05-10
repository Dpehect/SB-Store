"use client";

import Link from "next/link";
import { ShoppingBag, Search, Menu, X, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/store/useCart";
import { useLanguage } from "@/store/useLanguage";
import { useAuth } from "@/store/useAuth";
import { cn } from "@/lib/utils";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const { user, logout } = useAuth();
  const cartItems = useCart((state) => state.items);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  // Smart visibility logic
  const isDarkBgPage = pathname === "/";
  const useDarkText = isScrolled || !isDarkBgPage;

  const navLinks = [
    { name: lang === "TR" ? "KOLEKSİYON" : "SHOP", href: "/shop" },
    { name: lang === "TR" ? "KATEGORİLER" : "CATEGORIES", href: "/shop" },
    { name: lang === "TR" ? "HAKKIMIZDA" : "ABOUT", href: "/about" },
  ];

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-12",
          useDarkText ? "py-4 glass shadow-sm" : "py-8 bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <button 
            className={cn("md:hidden transition-colors", useDarkText ? "text-primary" : "text-gray-100")}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-[11px] font-black uppercase tracking-[0.25em] transition-all",
                  useDarkText ? "text-primary hover:text-accent" : "text-gray-100 hover:text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
            {/* Dil Seçici */}
            <button 
              onClick={() => setLang(lang === "TR" ? "EN" : "TR")}
              className={cn(
                "text-[10px] font-black border px-2 py-0.5 transition-all ml-4",
                useDarkText ? "border-primary text-primary hover:bg-primary hover:text-white" : "border-gray-400 text-gray-100 hover:bg-white hover:text-primary"
              )}
            >
              {lang === "TR" ? "TR" : "ENG"}
            </button>
          </div>

          {/* Brand Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <h1 className={cn(
              "text-2xl font-black tracking-tighter uppercase italic transition-colors",
              useDarkText ? "text-primary" : "text-gray-100"
            )}>
              SB<span className="text-accent not-italic ml-1">STORE</span>
            </h1>
          </Link>

          {/* Icons */}
          <div className="flex items-center space-x-6 md:space-x-8">
            {/* Auth Button */}
            {user ? (
              <div className="flex items-center space-x-6">
                {user.role === 'admin' && (
                  <Link 
                    href="/admin" 
                    className={cn(
                      "text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 border transition-all",
                      useDarkText ? "border-primary text-primary hover:bg-primary hover:text-white" : "border-white text-white hover:bg-white hover:text-primary"
                    )}
                  >
                    ADMİN PANELİ
                  </Link>
                )}
                <button onClick={() => logout()} className={cn("transition-colors", useDarkText ? "text-primary" : "text-gray-100")}>
                  <LogOut size={18} strokeWidth={1.5} />
                </button>
              </div>
            ) : (
              <Link href="/login" className={cn("transition-colors", useDarkText ? "text-primary" : "text-gray-100")}>
                <User size={20} strokeWidth={1.5} />
              </Link>
            )}

            <button className={cn("hidden md:block hover:text-accent transition-colors p-2", useDarkText ? "text-primary" : "text-gray-100")}>
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className={cn("relative hover:text-accent transition-colors p-2", useDarkText ? "text-primary" : "text-gray-100")}
            >
              <ShoppingBag size={22} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-black">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 top-[72px] bg-white z-40 md:hidden p-12"
            >
              <div className="flex flex-col items-start space-y-10 text-2xl font-black uppercase tracking-tighter">
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
