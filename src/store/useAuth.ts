import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  email: string;
  role: 'admin' | 'customer';
  orderCount: number;
  name: string;
  isVerified: boolean;
  password?: string;
}

interface AuthState {
  user: User | null;
  tempUser: User | null; 
  verificationCode: string | null;
  isAccessAuthorized: boolean; // Second layer security
  login: (email: string, password: string) => boolean;
  signup: (email: string, name: string, password: string) => string; 
  verify: (code: string) => boolean;
  resendCode: () => string | null;
  authorizeAccess: (password: string) => boolean;
  logout: () => void;
  incrementOrderCount: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      tempUser: null,
      verificationCode: null,
      isAccessAuthorized: false,
      
      login: (email: string, password: string) => {
        if (email.trim().toLowerCase() === "gurlekyunusemre2@gmail.com" && password === "admin123") {
          set({ 
            user: { email: email.trim().toLowerCase(), role: 'admin', orderCount: 10, name: 'SB Admin', isVerified: true },
            tempUser: null,
            verificationCode: null,
            isAccessAuthorized: false // Reset authorization on fresh login
          });
          return true;
        }
        
        const { user } = get();
        if (user && user.email === email.trim().toLowerCase() && user.password === password) {
          return true;
        }

        if (password === "customer123") {
          set({ user: { email, role: 'customer', orderCount: 0, name: 'Customer', isVerified: true } });
          return true;
        }
        
        return false;
      },

      authorizeAccess: (password: string) => {
        if (password.trim().toLowerCase() === "yunusemre366") {
          set({ isAccessAuthorized: true });
          return true;
        }
        return false;
      },

      signup: (email: string, name: string, password: string) => {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        set({ 
          tempUser: { email, name, role: 'customer', orderCount: 0, isVerified: false, password },
          verificationCode: code
        });
        return code;
      },

      verify: (code: string) => {
        const { tempUser, verificationCode } = get();
        if (code === verificationCode && tempUser) {
          set({ 
            user: { ...tempUser, isVerified: true },
            tempUser: null,
            verificationCode: null
          });
          return true;
        }
        return false;
      },

      resendCode: () => {
        const { tempUser } = get();
        if (tempUser) {
          const newCode = Math.floor(100000 + Math.random() * 900000).toString();
          set({ verificationCode: newCode });
          return newCode;
        }
        return null;
      },

      logout: () => set({ user: null, tempUser: null, verificationCode: null, isAccessAuthorized: false }),
      
      incrementOrderCount: () => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, orderCount: user.orderCount + 1 } });
        }
      }
    }),
    {
      name: "sb-store-auth-v7-secure",
    }
  )
);
