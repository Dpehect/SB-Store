"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/useAuth";
import { 
  Plus, Trash2, Edit3, Package, DollarSign, Tag, Image as ImageIcon, 
  ArrowLeft, Save, Loader2, ShieldAlert, Lock, ArrowRight, X, Filter, Bookmark, PlusCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Boxing", "MMA"];

export default function AdminDashboard() {
  const { user, isAccessAuthorized, authorizeAccess } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeBrand, setActiveBrand] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const [accessPass, setAccessPass] = useState("");
  const [accessError, setAccessError] = useState(false);

  // Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNewBrandInput, setShowNewBrandInput] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    brand: "Venum",
    price: 0,
    category: "Boxing",
    image: "",
    description: "",
    isNew: false
  });

  useEffect(() => {
    setMounted(true);
    if (!user || user.role !== 'admin') {
      router.push("/login");
      return;
    }
    
    if (isAccessAuthorized) {
      fetchProducts();
    } else {
      setIsLoading(false);
    }
  }, [user, isAccessAuthorized, router]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Derive dynamic brands from existing products
  const dynamicBrands = ["All", ...Array.from(new Set(products.map(p => p.brand || "Venum")))];

  const filteredProducts = products.filter(p => {
    const categoryMatch = activeCategory === "All" || p.category === activeCategory;
    const brandMatch = activeBrand === "All" || p.brand === activeBrand;
    return categoryMatch && brandMatch;
  });

  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = authorizeAccess(accessPass);
    if (!success) {
      setAccessError(true);
      setTimeout(() => setAccessError(false), 2000);
    }
  };

  const handleEdit = (product: any) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      brand: product.brand || "Venum",
      price: product.price,
      category: product.category,
      image: product.image,
      description: product.description || "",
      isNew: product.isNew || false
    });
    setShowNewBrandInput(false);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This action cannot be undone.")) return;
    try {
      await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      fetchProducts();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const body = editingId ? { ...formData, id: editingId } : formData;
      await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
      });
      setIsModalOpen(false);
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setShowNewBrandInput(false);
    setFormData({ name: "", brand: "Venum", price: 0, category: "Boxing", image: "", description: "", isNew: false });
  };

  if (!mounted) return null;

  if (!isAccessAuthorized) {
    return (
      <div className="min-h-screen bg-[#FBFBFB] flex items-center justify-center px-6 text-primary">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md space-y-12 text-center">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white border border-gray-100 shadow-xl rounded-full mb-4">
              <Lock size={32} strokeWidth={1} />
            </div>
            <h1 className="text-3xl font-black tracking-tighter uppercase italic">Secure Access</h1>
          </div>
          <form onSubmit={handleAccessSubmit} className="space-y-8 bg-white p-12 border border-gray-100 shadow-2xl">
            <input required type="password" value={accessPass} onChange={(e) => setAccessPass(e.target.value)} placeholder="ACCESS PASSWORD" className="w-full border-b-2 border-gray-100 py-4 text-center text-2xl font-black tracking-[0.5em] focus:outline-none focus:border-primary text-primary" />
            <Button type="submit" className="w-full h-16 bg-primary text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-none hover:bg-accent transition-all">UNLOCK PANEL</Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFBFB] pt-32 pb-20 px-6 md:px-12 text-primary">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-gray-100 pb-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-accent">
              <ShieldAlert size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Management Portal</span>
            </div>
            <h1 className="text-6xl font-black tracking-tighter uppercase italic">
              INVENTORY <span className="text-accent not-italic">HUB</span>
            </h1>
          </div>
          <Button onClick={() => { resetForm(); setIsModalOpen(true); }} className="h-16 px-10 bg-primary text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-none hover:bg-accent transition-all shadow-xl">
            <Plus size={18} className="mr-2" /> NEW PRODUCT
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-3"><Tag size={14} className="text-muted" /><span className="text-[10px] font-black uppercase tracking-widest text-muted">Category:</span></div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={cn("px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all", activeCategory === cat ? "bg-primary text-white" : "bg-white border border-gray-100 text-muted hover:border-primary")}>{cat}</button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3"><Bookmark size={14} className="text-muted" /><span className="text-[10px] font-black uppercase tracking-widest text-muted">Brand:</span></div>
            <div className="flex flex-wrap gap-2">
              {dynamicBrands.map((br) => (
                <button key={br} onClick={() => setActiveBrand(br)} className={cn("px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all", activeBrand === br ? "bg-accent text-white" : "bg-white border border-gray-100 text-muted hover:border-accent")}>{br}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-100 shadow-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-black uppercase tracking-widest text-muted">
                <th className="p-6">Visual</th>
                <th className="p-6">Details</th>
                <th className="p-6">Brand</th>
                <th className="p-6">Category</th>
                <th className="p-6">Price</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-6 w-24">
                    <div className="w-20 h-20 bg-gray-100 border border-gray-50"><img src={product.image} alt={product.name} className="w-full h-full object-cover" /></div>
                  </td>
                  <td className="p-6"><span className="font-black text-sm uppercase tracking-tight">{product.name}</span></td>
                  <td className="p-6"><span className="text-[10px] font-black uppercase tracking-widest text-accent">{product.brand || "Venum"}</span></td>
                  <td className="p-6"><span className="text-[9px] font-black uppercase tracking-widest border border-gray-200 px-3 py-1 text-muted">{product.category}</span></td>
                  <td className="p-6 text-sm font-black text-primary">${product.price}</td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button onClick={() => handleEdit(product)} className="p-3 border border-gray-100 hover:bg-primary hover:text-white transition-all"><Edit3 size={14} /></button>
                      <button onClick={() => handleDelete(product.id)} className="p-3 border border-gray-100 hover:bg-accent hover:text-white transition-all"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setIsModalOpen(false); resetForm(); }} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white w-full max-w-2xl p-16 shadow-2xl z-10 relative overflow-y-auto max-h-[90vh] text-primary">
              <button onClick={() => { setIsModalOpen(false); resetForm(); }} className="absolute top-10 right-10 text-muted hover:text-primary transition-colors"><X size={24} /></button>
              <h2 className="text-4xl font-black uppercase tracking-tighter italic mb-12">{editingId ? "Update" : "Add"} <span className="text-accent not-italic">Item</span></h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted">Product Name</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border-b-2 border-gray-100 py-3 text-sm font-bold focus:outline-none focus:border-primary" />
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted flex justify-between">
                    <span>Brand</span>
                    <button type="button" onClick={() => setShowNewBrandInput(!showNewBrandInput)} className="text-accent hover:underline flex items-center">
                      <PlusCircle size={10} className="mr-1" /> {showNewBrandInput ? "Select Existing" : "Add New Brand"}
                    </button>
                  </label>
                  {showNewBrandInput ? (
                    <input 
                      required 
                      type="text" 
                      value={formData.brand} 
                      onChange={(e) => setFormData({...formData, brand: e.target.value})} 
                      placeholder="Type New Brand Name"
                      className="w-full border-b-2 border-gray-100 py-3 text-sm font-bold focus:outline-none focus:border-accent"
                    />
                  ) : (
                    <select value={formData.brand} onChange={(e) => setFormData({...formData, brand: e.target.value})} className="w-full border-b-2 border-gray-100 py-3 text-sm font-bold focus:outline-none focus:border-primary bg-white appearance-none">
                      {dynamicBrands.filter(b => b !== "All").map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted">Price ($)</label>
                  <input required type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} className="w-full border-b-2 border-gray-100 py-3 text-sm font-bold focus:outline-none focus:border-primary" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted">Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full border-b-2 border-gray-100 py-3 text-sm font-bold focus:outline-none focus:border-primary bg-white appearance-none">
                    {CATEGORIES.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2 space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted">Image URL</label>
                  <input required type="text" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full border-b-2 border-gray-100 py-3 text-sm font-bold focus:outline-none focus:border-primary" />
                </div>
                <div className="md:col-span-2 space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted">Description</label>
                  <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full border-2 border-gray-100 p-5 text-sm font-bold focus:outline-none focus:border-primary h-32" />
                </div>
                <Button disabled={isSaving} className="md:col-span-2 h-18 bg-primary text-white text-[11px] font-black uppercase tracking-[0.4em] rounded-none hover:bg-accent transition-all shadow-2xl">
                  {isSaving ? <Loader2 className="animate-spin" /> : (editingId ? "SAVE CHANGES" : "PUBLISH TO HUB")}
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
