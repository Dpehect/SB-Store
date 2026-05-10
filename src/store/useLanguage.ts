import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LanguageState {
  lang: "TR" | "EN";
  setLang: (lang: "TR" | "EN") => void;
}

export const useLanguage = create<LanguageState>()(
  persist(
    (set) => ({
      lang: "TR",
      setLang: (lang) => set({ lang }),
    }),
    { name: "forge-language" }
  )
);
